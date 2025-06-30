import * as ElevenLabs from 'elevenlabs';

// Define a basic structure for our chat response
interface ChatResponse {
  text: string;
  audioStream?: NodeJS.ReadableStream;
  error?: string;
}

export async function getChatResponse(
  prompt: string,
  voiceId: string | undefined // Made voiceId potentially undefined to handle cases where it might not be available
): Promise<ChatResponse> {
  try {
    // 1. Placeholder for AI text response (e.g., Claude via Bolt.new)
    // This should be replaced with an actual call to Bolt.new's AI or your chosen LLM service
    const textResponse = `Mock response from POPDOC's AI for: "${prompt}"`;

    // 2. ElevenLabs Integration
    if (!voiceId) {
      console.warn("No voiceId provided for ElevenLabs, returning text only.");
      return { text: textResponse };
    }

    const apiKey = process.env.sk_a42a8dc7ff83e42089faa31dee4bae64b19b990965e61b54;
    if (!apiKey) {
      console.error("ElevenLabs API Key not found in environment variables.");
      return { text: textResponse, audioStream: undefined }; // Or throw an error / handle differently
    }

    const elevenlabs = new ElevenLabs.ElevenLabsClient({
      apiKey: apiKey,
    });

    const audioStream = await elevenlabs.generate({
      voice: voiceId, // This now correctly refers to the voiceId parameter
      text: textResponse,
      model_id: 'eleven_multilingual_v2', // Grok suggested multilingual_v2, was monolingual_v1 in his example
      output_format: 'mp3_44100_128', // Specify output format for client consistency
      stream: true,
    });

    // The SDK's generate with stream=true returns an AsyncIterable<Buffer>.
    // For a Node.js ReadableStream, we might need to adapt it if the client/server framework requires it.
    // However, many modern Node.js stream consumers can handle AsyncIterables.
    // Casting for now, but this is a point of attention for server/client communication.
    return { text: textResponse, audioStream: audioStream as unknown as NodeJS.ReadableStream };

  } catch (error: any) {
    console.error('Error generating chat response or speech:', error.message);
    // Return a text-only error response, or a more structured error object
    return { text: `Error: Could not process your request. Details: ${error.message}`, audioStream: undefined };
  }
}

// Example Usage (Commented out for module use)
/*
async function main() {
  // Ensure ELEVEN_LABS_API_KEY is set in your environment for this test
  if (!process.env.ELEVEN_LABS_API_KEY) {
    console.log("ELEVEN_LABS_API_KEY not set. Please set it to test.");
    return;
  }
  const testVoiceId = "21m00Tcm4TlvDq8ikWAM"; // Adam - Example Voice ID
  const response = await getChatResponse("Hello, what is the weather like?", testVoiceId);
  console.log("Text Response:", response.text);
  if (response.audioStream) {
    console.log("Audio stream present. In a real app, pipe this to an audio element or save to file.");
    // Example: response.audioStream.pipe(require('fs').createWriteStream('./test_audio.mp3'));
  }
}
// main();
*/ 