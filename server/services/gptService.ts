import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import pkg from 'elevenlabs-api';
const { ElevenLabs } = pkg;

export interface ChatServiceResponse {
  text: string;
  audioDataUri?: string;
  error?: string;
}

const ttsClient = new TextToSpeechClient();
const elevenLabs = process.env.ELEVEN_LABS_API_KEY ? new ElevenLabs(process.env.ELEVEN_LABS_API_KEY) : null;

export async function getChatResponse(
  prompt: string,
  doctor: { name: string; voiceSettings?: { voice?: string; elevenLabsVoice?: string; pitch?: number; rate?: number } },
  useTTS: boolean = true,
  useElevenLabs: boolean = false
): Promise<ChatServiceResponse> {
  try {
    // TODO: Replace with real AI integration (Grok, Gemini, etc.)
    const textResponse = `As Dr. ${doctor.name}, I'd say: This is a placeholder. Actual AI integration pending!`;

    if (!useTTS) {
      return { text: textResponse };
    }

    // If explicitly requested and ElevenLabs is available, use it as fallback
    if (useElevenLabs && elevenLabs) {
      try {
        const audioDataUri = await elevenLabs.textToSpeech(textResponse, doctor.voiceSettings?.elevenLabsVoice || 'Josh');
        return { text: textResponse, audioDataUri };
      } catch (err: any) {
        console.error('Error in ElevenLabs TTS:', err.message, err.stack);
        // Fallback to Google TTS if ElevenLabs fails
      }
    }

    // Default: Google Cloud TTS
    const request = {
      input: { text: textResponse },
      voice: {
        languageCode: 'en-US',
        name: doctor.voiceSettings?.voice || 'en-US-Wavenet-D',
        ssmlGender: 'NEUTRAL' as const
      },
      audioConfig: {
        audioEncoding: 'MP3' as const,
        pitch: doctor.voiceSettings?.pitch || 0.0,
        speakingRate: doctor.voiceSettings?.rate || 1.0
      }
    };

    const [response] = await ttsClient.synthesizeSpeech(request);
    if (!response.audioContent) {
      return { text: textResponse, error: 'No audio content returned from Google TTS.' };
    }
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array);
    const audioDataUri = `data:audio/mp3;base64,${audioBuffer.toString('base64')}`;
    return { text: textResponse, audioDataUri };
  } catch (error: any) {
    console.error('Error in getChatResponse (Google TTS):', error.message, error.stack);
    return { text: `Error: Could not process your request. ${error.message}`, error: error.message };
  }
} 