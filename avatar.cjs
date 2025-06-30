const fs = require('fs');
const path = require('path');
const { PredictionServiceClient } = require('@google-cloud/aiplatform').v1;

// Your Google Cloud info:
const project = 'popdoc'; // <-- This is your Project ID
const location = 'us-central1';

// This is the special address for the AI model:
const endpoint = `projects/${project}/locations/${location}/publishers/google/models/imagegeneration`;

// This connects to Google AI using your key:
const client = new PredictionServiceClient({
  keyFilename: './keys/popdoc-vertex-ai-key.json',
});

// This function asks Google to make an image and saves it:
async function generateAndSaveAvatar(doctorName, style, filename) {
  const prompt = `portrait of ${doctorName}`;
  const instance = { prompt };
  const instances = [instance];
  // Try with no extra parameters for now:
  const request = {
    name: endpoint,
    instances,
  };

  try {
    const [response] = await client.predict(request);
    const imageBase64 = response.predictions[0].bytesBase64Encoded;

    // Make sure the avatars folder exists
    const avatarDir = path.join(__dirname, 'public/avatars');
    if (!fs.existsSync(avatarDir)) {
      fs.mkdirSync(avatarDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(avatarDir, filename),
      Buffer.from(imageBase64, 'base64')
    );
    console.log(`Saved ${filename}`);
  } catch (err) {
    console.error('Vertex AI error:', err);
  }
}

// This part runs the function for each doctor:
(async () => {
  await generateAndSaveAvatar('Gregory House', 'marvel style', 'house.png');
  await generateAndSaveAvatar('Leonard McCoy', 'marvel style', 'mccoy.png');
  await generateAndSaveAvatar('Beverly Crusher', 'marvel style', 'crusher.png');
})();