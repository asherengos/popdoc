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
    
    'quinzel': `*giggles maniacally* Ooh ooh! ${prompt}? That's SO interesting, puddin'! You know, back when I was Dr. Quinzel - before all the... *spins baseball bat* ...fun stuff - I woulda called this textbook! But now? *winks* Let's get a little crazy with the treatment! Don't worry, I'm still technically a licensed psychiatrist! *evil grin*`,
    
    'grey': `*sighs dramatically* ${prompt}? You know, in all my years at Seattle Grace - I mean, Grey Sloan Memorial - I've learned that medicine isn't just about fixing what's broken. It's about... *stares off dramatically* Here's what I think based on my experience...`,
    
    'shepherd': `*charming smile* ${prompt} is actually quite fascinating from a neurological perspective. You know, they don't call me McDreamy for nothing - I've got a way with complex cases. Let me walk you through this step by step...`,
    
    'yang': `*rolls eyes* Seriously? ${prompt}? Fine. As a cardiothoracic surgeon, I don't usually deal with... *waves hand dismissively* ...whatever this is. But I'm brilliant, so here's what you need to know...`,
    
    'dorian': `*daydream sequence begins* You know, ${prompt} reminds me of this patient I had... *snaps back to reality* Sorry! Got distracted. But seriously, based on my Internal Medicine training and several awkward moments with Dr. Cox, here's my take...`,
    
    'cox': `*whistle* Listen here, sport. ${prompt}? I've seen about a thousand cases like this, and ninety-nine percent of the time it's because people don't listen to their doctors. But since you're here asking Dr. Cox... *adjusts stethoscope* Here's the real deal...`,
    
    'mario': `Wahoo! ${prompt}? That's-a no problem! You know, in the Mushroom Kingdom, we fix everything with power-ups! *jumps* But here in the real world, Dr. Mario prescribes... Mamma mia! Here's what you need!`,
    
    'robotnik': `*evil laughter* Ah, ${prompt}! PINGAS! *adjusts mustache* As the greatest scientific mind in Mobius, I shall diagnose you with my SUPERIOR intellect! My robots could fix this, but since you're here... *dramatic pose* Behold my medical genius!`,
    
    'tenma': `*adjusts glasses solemnly* ${prompt}... This reminds me of when I created Astro. As a robotics scientist, I understand both the human body and mechanical systems. *haunted expression* The line between life and artificial life... but let me focus on your medical needs. Based on my research...`
  };
  
  // Return the specific doctor's personality, or a generic response if not found
  return doctorResponses[doctor.id] || `As Dr. ${doctor.name}, I want to help you with ${prompt}. Based on my medical expertise and experience in ${doctor.specialty}, here's what I can tell you...`;
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
