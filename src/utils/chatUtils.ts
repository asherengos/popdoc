import { Doctor } from '../types';

// Get time-based greeting
function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

// Generate mood-aware responses based on doctor's personality
export function generateDoctorResponse(message: string, doctor: Doctor): string {
  const lowerMessage = message.toLowerCase();
  const timeOfDay = getTimeBasedGreeting();
  
  // Keywords to look for in user messages
  const greetings = ['hello', 'hi', 'hey', 'greetings'];
  const medications = ['medicine', 'medication', 'pill', 'drug', 'prescription'];
  const appointments = ['appointment', 'schedule', 'visit', 'meeting'];
  const pain = ['pain', 'hurt', 'ache', 'sore'];
  const wellbeing = ['feel', 'feeling', 'tired', 'exhausted', 'sleep', 'energy'];
  const rest = ['rest', 'break', 'relax', 'pause'];
  
  // Doctor-specific phrases with mood variations
  const doctorPhrases = {
    mccoy: {
      timeGreeting: {
        morning: "Good morning, ensign! Ready for another day in sickbay?",
        afternoon: "Afternoon, crewman. Hope you're staying out of trouble.",
        evening: "Evening, cadet. Space never sleeps, and neither do medical emergencies."
      },
      greeting: "I'm a doctor, not a receptionist! But hello there.",
      generic: "Dammit Jim! I'm a doctor, not a miracle worker!",
      medication: "These pills aren't sugar candy, you need to take them as prescribed!",
      appointment: "I've got sickbay ready for you. Don't be late this time!",
      pain: "Pain? On a scale of 1 to getting shot by a Klingon, how bad is it?",
      wellbeing: "You humans are so fragile. Get some rest and stop overworking yourself!",
      rest: {
        positive: "Finally, someone talking sense! Yes, you absolutely should rest.",
        concerned: "Your readings are off the charts. Get some rest, doctor's orders!"
      }
    },
    crusher: {
      timeGreeting: {
        morning: "Good morning! The Enterprise's sickbay is always ready to help.",
        afternoon: "Good afternoon. I hope you're having a productive day.",
        evening: "Good evening. Remember, a good night's rest is essential for health."
      },
      greeting: "Hello there. How can I assist you today?",
      generic: "I'll need to run a few more scans before I can make a determination.",
      medication: "Your medication regimen is important. Let's make sure you're following it precisely.",
      appointment: "I can fit you in for an appointment. The Enterprise sickbay is never too busy for patients who need care.",
      pain: "Let's localize that pain and find its source. The body often tells us what's wrong if we listen carefully.",
      wellbeing: "Your overall wellbeing is my primary concern. Physical health is just one component of wellness.",
      rest: {
        positive: "Rest is essential for recovery. I recommend at least 8 hours of sleep.",
        concerned: "Your cortical readings suggest you need immediate rest."
      }
    },
    who: {
      timeGreeting: {
        morning: "Ah, morning! Time for a new adventure in health.",
        afternoon: "Afternoon! Perfect time for a check-up, wouldn't you say?",
        evening: "Evening! The night is young, just like I pretend to be."
      },
      greeting: "Hello! Brilliant to see you. How are you feeling today?",
      generic: "Well, that's interesting. Reminds me of something I saw on Gallifrey... or was it Barcelona? The planet, not the city.",
      medication: "These medications work like a tiny TARDIS in your body, traveling where they need to go to make you better!",
      appointment: "Time is a big ball of wibbly-wobbly, timey-wimey stuff, but your appointment is quite fixed, I'm afraid.",
      pain: "Pain is the body's alarm system. Let's figure out what's setting it off. Allons-y!",
      wellbeing: "900 years of time and space, and I've never met someone who wasn't important. Your health matters!",
      rest: {
        positive: "Yes! Rest! Even Time Lords need a break sometimes.",
        concerned: "Your timeline suggests you need rest. Doctor's orders!"
      }
    },
    strange: {
      timeGreeting: {
        morning: "By the Vishanti, good morning! The mystical energies are strong today.",
        afternoon: "Good afternoon. The dimensional barriers are thin, perfect for healing.",
        evening: "Evening greetings. The night holds many secrets of healing."
      },
      greeting: "Greetings. What mystical ailments trouble you today?",
      generic: "I've studied the mystic arts, but medicine still has its place in healing.",
      medication: "This medication works in this dimension, but do remember to take it at the prescribed times.",
      appointment: "I'll open a portal for your next appointment. Or you could just use the door like everyone else.",
      pain: "Pain is merely the physical dimension trying to tell you something. Let's decipher its message.",
      wellbeing: "The mind, body, and spirit are interconnected. Healing one often requires addressing all three.",
      rest: {
        positive: "The astral plane awaits your rest. It will do you good.",
        concerned: "Your aura suggests extreme fatigue. Meditation and rest are required."
      }
    }
  };
  
  // Determine which type of response to give
  if (greetings.some(word => lowerMessage.includes(word))) {
    return doctorPhrases[doctor.id as keyof typeof doctorPhrases].timeGreeting[timeOfDay as keyof typeof doctorPhrases.mccoy.timeGreeting];
  } else if (medications.some(word => lowerMessage.includes(word))) {
    return doctorPhrases[doctor.id as keyof typeof doctorPhrases].medication;
  } else if (appointments.some(word => lowerMessage.includes(word))) {
    return doctorPhrases[doctor.id as keyof typeof doctorPhrases].appointment;
  } else if (pain.some(word => lowerMessage.includes(word))) {
    return doctorPhrases[doctor.id as keyof typeof doctorPhrases].pain;
  } else if (wellbeing.some(word => lowerMessage.includes(word))) {
    return doctorPhrases[doctor.id as keyof typeof doctorPhrases].wellbeing;
  } else if (rest.some(word => lowerMessage.includes(word))) {
    return Math.random() > 0.5 
      ? doctorPhrases[doctor.id as keyof typeof doctorPhrases].rest.positive
      : doctorPhrases[doctor.id as keyof typeof doctorPhrases].rest.concerned;
  } else {
    return doctorPhrases[doctor.id as keyof typeof doctorPhrases].generic;
  }
}