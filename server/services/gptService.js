import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import pkg from 'elevenlabs-api';
const { ElevenLabs } = pkg;
const ttsClient = new TextToSpeechClient();
const elevenLabs = process.env.ELEVEN_LABS_API_KEY ? new ElevenLabs(process.env.ELEVEN_LABS_API_KEY) : null;

// Doctor personality responses based on character traits
const getDoctorPersonalityResponse = (prompt, doctor) => {
  const doctorResponses = {
    'house': `*adjusts cane* ${prompt}? Let me guess - you've already self-diagnosed using WebMD and now you want me to confirm your worst fears. Here's the thing: it's probably not lupus. It's never lupus. But let's see... *pops Vicodin* Based on what you're telling me, here's what I think...`,
    
    'mccoy': `Dammit, I'm a doctor, not a miracle worker! But I'll tell you what - ${prompt} sounds like something I've seen before in my years on the Enterprise. *grumbles* In my medical opinion, here's what you need to know...`,
    
    'crusher': `*gentle but professional tone* I understand your concern about ${prompt}. Let me approach this systematically. Based on my experience both in Starfleet Medical and treating various species, here's my assessment...`,
    
    'zoidberg': `*excited crab noises* Hooray! A patient! You know, on Decapod 10, we'd treat ${prompt} with a nice muddy swamp bath! But here on Earth... *nervous clicking* Maybe I should consult my medical textbook... Yes, yes! Here's what I think might help...`,
    
    'strange': `*mystical gesture* By the Vishanti, your inquiry about ${prompt} requires both medical knowledge and perhaps... otherworldly insight. As both a neurosurgeon and Master of the Mystic Arts, I can tell you...`,
    
    'hibbert': `*chuckles* Ah-heh-heh-heh! Well, ${prompt} is certainly an interesting case! In my years at Springfield General, I've seen it all. *adjusts glasses* Here's my professional medical opinion...`,
    
    'default': `As Dr. ${doctor.name}, I want to help you with ${prompt}. Based on my medical expertise and character background, here's what I can tell you...`
  };
  
  return doctorResponses[doctor.id] || doctorResponses['default'];
};

export async function getChatResponse(prompt, doctor, useTTS = true, useElevenLabs = false) {
    try {
        // Generate personality-driven response
        const textResponse = getDoctorPersonalityResponse(prompt, doctor);
        
        if (!useTTS) {
            return { text: textResponse };
        }

        // If explicitly requested and ElevenLabs is available, use it as fallback
        if (useElevenLabs && elevenLabs) {
            try {
                const audioDataUri = await elevenLabs.textToSpeech(textResponse, doctor.voiceSettings?.elevenLabsVoice || 'Josh');
                return { text: textResponse, audioDataUri };
            } catch (err) {
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
                ssmlGender: 'NEUTRAL'
            },
            audioConfig: {
                audioEncoding: 'MP3',
                pitch: doctor.voiceSettings?.pitch || 0.0,
                speakingRate: doctor.voiceSettings?.rate || 1.0
            }
        };

        const [response] = await ttsClient.synthesizeSpeech(request);
        
        if (!response.audioContent) {
            return { text: textResponse, error: 'No audio content returned from Google TTS.' };
        }

        const audioBuffer = Buffer.from(response.audioContent);
        const audioDataUri = `data:audio/mp3;base64,${audioBuffer.toString('base64')}`;
        
        return { text: textResponse, audioDataUri };
    } catch (error) {
        console.error('Error in getChatResponse (Google TTS):', error.message, error.stack);
        return { text: `Error: Could not process your request. ${error.message}`, error: error.message };
    }
}
