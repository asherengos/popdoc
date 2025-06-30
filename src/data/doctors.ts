import { Doctor } from '../types/index';

// To add a new doctor:
// 1. Add a new object to the doctors array below with unique id, name, avatar path (in /public/avatars/), bio, specialty, primaryColor, and voiceSettings.
// 2. For voiceSettings, use an existing ElevenLabs voice or add a new one as needed.
// 3. Save the avatar as /public/avatars/[id].png (matching the id field).
// 4. The UI and chat will automatically update to include new doctors.
// Example:
// { id: 'newdoc', name: 'New Doctor', avatar: '/avatars/newdoc.png', bio: 'Bio here.', specialty: 'Specialty', primaryColor: '#HEX', voiceSettings: { voice: 'VoiceName', pitch: 1.0, rate: 1.0 } },

export const doctors: Doctor[] = [
  // Classic & Sci-Fi Doctors
  { id: 'mccoy', name: 'Leonard "Bones" McCoy', avatar: '/avatars/mccoy.png', bio: 'Grumpy Starfleet surgeon with a heart of gold, wielding a tricorder.', specialty: 'General Medicine', primaryColor: '#EF4444', voiceSettings: { voice: 'en-US-Wavenet-D', elevenLabsVoice: 'Josh', pitch: 0.9, rate: 1.1 } },
  { id: 'crusher', name: 'Beverly Crusher', avatar: '/avatars/crusher.png', bio: 'Compassionate Starfleet CMO, innovating with advanced medical tech.', specialty: 'Chief Medical Officer', primaryColor: '#10B981', voiceSettings: { voice: 'Sarah', pitch: 1.1, rate: 1.0 } },
  { id: 'the-doctor', name: 'The Doctor', avatar: '/avatars/the-doctor.png', bio: 'Quirky holographic healer with a sonic screwdriver and time-travel expertise.', specialty: 'Regeneration & Alien Medicine', primaryColor: '#6366F1', voiceSettings: { voice: 'Matthew', pitch: 1.0, rate: 1.0 } },
  { id: 'bashir', name: 'Julian Bashir', avatar: '/avatars/bashir.png', bio: 'Charming Starfleet doctor with a knack for frontier medicine and secrets.', specialty: 'Frontier Medicine', primaryColor: '#8B5CF6', voiceSettings: { voice: 'Charlie', pitch: 1.0, rate: 1.0 } },
  { id: 'phlox', name: 'Phlox', avatar: '/avatars/phlox.png', bio: 'Curious Denobulan doctor with a love for alien biology and exotic pets.', specialty: 'Xenobiology', primaryColor: '#FBBF24', voiceSettings: { voice: 'Sam', pitch: 1.0, rate: 1.0 } },
  { id: 'strange', name: 'Stephen Strange', avatar: '/avatars/strange.png', bio: 'Mystic neurosurgeon turned Sorcerer Supreme, blending magic and medicine.', specialty: 'Neurosurgery', primaryColor: '#D97706', voiceSettings: { voice: 'Adam', pitch: 0.8, rate: 1.0 } },
  { id: 'brown', name: 'Emmett Brown', avatar: '/avatars/brown.png', bio: 'Eccentric inventor and time-traveling doctor with wild hair and a DeLorean.', specialty: 'Temporal Medicine', primaryColor: '#6B7280', voiceSettings: { voice: 'Victor', pitch: 1.2, rate: 1.0 } },
  { id: 'jekyll', name: 'Henry Jekyll', avatar: '/avatars/jekyll.png', bio: 'Tormented doctor battling his inner Hyde with gothic experiments.', specialty: 'Psychopharmacology', primaryColor: '#4B5563', voiceSettings: { voice: 'George', pitch: 0.9, rate: 1.0 } },
  { id: 'frankenstein', name: 'Victor Frankenstein', avatar: '/avatars/frankenstein.png', bio: 'Mad scientist obsessed with reanimation and gothic medical horrors.', specialty: 'Reanimation', primaryColor: '#1F2937', voiceSettings: { voice: 'Victor', pitch: 0.8, rate: 1.0 } },
  { id: 'octavius', name: 'Otto Octavius', avatar: '/avatars/octavius.png', bio: 'Brilliant scientist with mechanical arms, dabbling in dangerous medicine.', specialty: 'Cybernetics', primaryColor: '#DC2626', voiceSettings: { voice: 'Henry', pitch: 0.9, rate: 1.0 } },
  // Medical TV Legends
  { id: 'house', name: 'Gregory House', avatar: '/avatars/house.png', bio: 'Sarcastic diagnostic genius solving mysteries with a cane and wit.', specialty: 'Diagnostics', primaryColor: '#3B82F6', voiceSettings: { voice: 'Rachel', pitch: 1.0, rate: 1.0 } },
  { id: 'grey', name: 'Meredith Grey', avatar: '/avatars/grey.png', bio: 'Resilient surgeon navigating life and love in the OR.', specialty: 'General Surgery', primaryColor: '#6D28D9', voiceSettings: { voice: 'Emma', pitch: 1.0, rate: 1.0 } },
  { id: 'shepherd', name: 'Derek Shepherd', avatar: '/avatars/shepherd.png', bio: 'Charming neurosurgeon with a knack for saving lives and hearts.', specialty: 'Neurosurgery', primaryColor: '#059669', voiceSettings: { voice: 'James', pitch: 0.9, rate: 1.0 } },
  { id: 'dorian', name: 'John "J.D." Dorian', avatar: '/avatars/dorian.png', bio: 'Daydreaming doctor with a quirky approach to patient care.', specialty: 'Internal Medicine', primaryColor: '#F59E0B', voiceSettings: { voice: 'Chris', pitch: 1.1, rate: 1.0 } },
  { id: 'cox', name: 'Perry Cox', avatar: '/avatars/cox.png', bio: 'Tough-talking mentor with a sharp tongue and fierce loyalty.', specialty: 'Internal Medicine', primaryColor: '#B91C1C', voiceSettings: { voice: 'Mark', pitch: 0.9, rate: 1.1 } },
  { id: 'yang', name: 'Cristina Yang', avatar: '/avatars/yang.png', bio: 'Driven cardiothoracic surgeon with unmatched ambition.', specialty: 'Cardiothoracic Surgery', primaryColor: '#7C3AED', voiceSettings: { voice: 'Lily', pitch: 1.0, rate: 1.0 } },
  { id: 'ross', name: 'Doug Ross', avatar: '/avatars/ross.png', bio: 'Charismatic ER doctor with a knack for high-stakes cases.', specialty: 'Emergency Medicine', primaryColor: '#1D4ED8', voiceSettings: { voice: 'Tom', pitch: 1.0, rate: 1.0 } },
  { id: 'greene', name: 'Mark Greene', avatar: '/avatars/greene.png', bio: 'Dedicated ER doctor balancing chaos with compassion.', specialty: 'Emergency Medicine', primaryColor: '#15803D', voiceSettings: { voice: 'Paul', pitch: 1.0, rate: 1.0 } },
  { id: 'murphy', name: 'Shaun Murphy', avatar: '/avatars/murphy.png', bio: 'Autistic surgical prodigy with unparalleled insight.', specialty: 'Surgical Resident', primaryColor: '#A5B4FC', voiceSettings: { voice: 'Ethan', pitch: 1.0, rate: 1.0 } },
  { id: 'howser', name: 'Doogie Howser', avatar: '/avatars/howser.png', bio: 'Teen genius doctor tackling medicine with youthful brilliance.', specialty: 'General Practice', primaryColor: '#FACC15', voiceSettings: { voice: 'Alex', pitch: 1.1, rate: 1.0 } },
  // Cartoon, Comic & Animated Doctors
  { id: 'hibbert', name: 'Julius Hibbert', avatar: '/avatars/hibbert.png', bio: 'Chuckling family doctor with a questionable bedside manner.', specialty: 'Family Medicine', primaryColor: '#EA580C', voiceSettings: { voice: 'Frank', pitch: 1.0, rate: 1.0 } },
  { id: 'riviera', name: 'Nick Riviera', avatar: '/avatars/riviera.png', bio: 'Shady surgeon with a dubious degree and cheap rates.', specialty: 'Discount Surgery', primaryColor: '#F3F4F6', voiceSettings: { voice: 'Joe', pitch: 1.2, rate: 1.0 } },
  { id: 'zoidberg', name: 'John Zoidberg', avatar: '/avatars/zoidberg.png', bio: 'Clumsy crustacean doctor with a questionable medical license.', specialty: 'Alien Physiology', primaryColor: '#F87171', voiceSettings: { voice: 'en-US-Wavenet-B', elevenLabsVoice: 'Adam', pitch: 1.2, rate: 1.0 } },
  { id: 'quest', name: 'Benton Quest', avatar: '/avatars/quest.png', bio: 'Adventurous scientist doctor exploring mysteries with his son.', specialty: 'Expedition Medicine', primaryColor: '#475569', voiceSettings: { voice: 'David', pitch: 1.0, rate: 1.0 } },
  { id: 'tenma', name: 'Tenma', avatar: '/avatars/tenma.png', bio: 'Robotics genius creating life-saving AI with a tragic past.', specialty: 'Robotics Medicine', primaryColor: '#1E3A8A', voiceSettings: { voice: 'Ken', pitch: 0.9, rate: 1.0 } },
  { id: 'quinzel', name: 'Harleen Quinzel', avatar: '/avatars/quinzel.png', bio: 'Chaotic psychiatrist turned Harley Quinn, mixing madness and medicine.', specialty: 'Psychiatry', primaryColor: '#EC4899', voiceSettings: { voice: 'Mia', pitch: 1.2, rate: 1.0 } },
  { id: 'robotnik', name: 'Robotnik', avatar: '/avatars/robotnik.png', bio: 'Mad scientist doctor building robotic minions to conquer.', specialty: 'Cybernetic Enhancements', primaryColor: '#B45309', voiceSettings: { voice: 'Carl', pitch: 0.8, rate: 1.0 } },
  { id: 'mario', name: 'Mario', avatar: '/avatars/mario.png', bio: 'Heroic plumber doctor prescribing mushrooms and star power.', specialty: 'Power-Up Medicine', primaryColor: '#EF4444', voiceSettings: { voice: 'Mario', pitch: 1.3, rate: 1.0 } },
  { id: 'light', name: 'Light', avatar: '/avatars/light.png', bio: 'Genius roboticist doctor creating heroes to save the future.', specialty: 'Robotics', primaryColor: '#3B82F6', voiceSettings: { voice: 'Alan', pitch: 1.0, rate: 1.0 } },
  { id: 'nefarious', name: 'Nefarious', avatar: '/avatars/nefarious.png', bio: 'Villainous robot doctor plotting galactic medical domination.', specialty: 'Galactic Medicine', primaryColor: '#7F1D1D', voiceSettings: { voice: 'Zane', pitch: 0.7, rate: 1.0 } }
];

export const getDoctor = (id: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};