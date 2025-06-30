import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { getChatResponse } from './services/gptService.js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { v1 as aiplatform } from '@google-cloud/aiplatform';
import { doctors } from '../src/data/doctors.js';
const { PredictionServiceClient } = aiplatform;

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const vertexClient = new PredictionServiceClient({
  keyFilename: 'credentials/popdoc-vertex-ai-key.json',
  projectId: 'popdoc',
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static('public/avatars'));

interface User {
  id: string;
  email: string;
  password: string;
}

// Load initial users from JSON file
let users: User[] = [];

try {
  console.log('Attempting to load users.json...');
  const data = await fs.readFile(join(__dirname, 'users.json'), 'utf8');
  console.log('Raw users.json content:', data);
  users = JSON.parse(data);
  console.log('Successfully loaded users:', users.map((u: User) => ({ id: u.id, email: u.email })));
} catch (error) {
  // Type guard for error
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  console.log('Creating default test user due to error:', errorMessage);
  const hashedPassword = await bcrypt.hash('password123', 10);
  users = [{
    id: '1',
    email: 'test@example.com',
    password: hashedPassword
  }];
  await fs.writeFile(join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
  console.log('Created default test user');
}

// Save users to file
const saveUsers = async () => {
  await fs.writeFile(join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received for:', email);

    if (!email || !password) {
      console.log('Missing email or password in request');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find((u: User) => u.email === email);
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Found user:', { id: user.id, email: user.email });

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', validPassword);
    
    if (!validPassword) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    console.log('Login successful for:', email);
    
    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    // Type guard for error
    let errorMessage = "Unknown server error during login";
    let errorStack = undefined;
    if (error instanceof Error) {
      errorMessage = error.message;
      errorStack = error.stack;
    }
    console.error('Login error:', errorMessage, '\nStack:', errorStack);
    res.status(500).json({ error: 'Server error: ' + errorMessage });
  }
});

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, doctorId, useTTS = true, useElevenLabs = false } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
      return res.status(400).json({ error: 'Doctor not found' });
    }
    const { text, audioDataUri, error: chatServiceError } = await getChatResponse(prompt, doctor, useTTS, useElevenLabs);
    if (chatServiceError) {
      return res.status(500).json({ text, error: chatServiceError });
    }
    res.json({ text, audioDataUri });
  } catch (error) {
    let errorMessage = "Unknown server error during chat";
    let errorStack = undefined;
    if (error instanceof Error) {
      errorMessage = error.message;
      errorStack = error.stack;
    }
    console.error('Chat error:', errorMessage, '\nStack:', errorStack);
    res.status(500).json({ error: 'Server error: ' + errorMessage });
  }
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { doctorName, style } = req.body;
    if (!doctorName || !style) {
      return res.status(400).json({ error: 'Doctor name and style are required' });
    }

    // Vertex AI endpoint and parameters
    const endpoint = 'projects/popdoc/locations/us-central1/publishers/google/models/imagegeneration';
    const prompt = `A portrait of a doctor, digital art`;

    const [response] = await (vertexClient.predict({
      endpoint,
      instances: [{ prompt }] as any,
      parameters: {
        sampleCount: 1,
        imageSize: "1024x1024"
      } as any
    }) as any);

    // Debug: log the full response if needed
    // console.log('Vertex AI response:', JSON.stringify(response, null, 2));

    if (
      response &&
      response.predictions &&
      response.predictions[0] &&
      response.predictions[0].bytesBase64Encoded
    ) {
      const imageData = response.predictions[0].bytesBase64Encoded;
      res.json({ imageData: `data:image/png;base64,${imageData}` });
    } else {
      console.error('Unexpected Vertex AI response:', response);
      res.status(500).json({ error: 'Image generation failed: Unexpected Vertex AI response.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Image generation error:', error.message, error.stack);
      res.status(500).json({ error: `Image generation failed: ${error.message}` });
    } else {
      console.error('Image generation error:', error);
      res.status(500).json({ error: 'Image generation failed: Unknown error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('API endpoints:');
  console.log(`- POST http://localhost:${PORT}/api/login`);
  console.log(`- POST http://localhost:${PORT}/api/chat`);
  console.log(`- POST http://localhost:${PORT}/api/generate-image`);
});