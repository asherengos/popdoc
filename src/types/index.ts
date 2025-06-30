export interface Doctor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  specialty: string;
  primaryColor?: string;
  voiceSettings: {
    voice: string;
    elevenLabsVoice?: string;
    pitch: number;
    rate: number;
  };
}

export interface UserPreferences {
  nickname: string;
  pronouns: string;
  voiceEnabled: boolean;
  doctorNickname?: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  notes?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  location?: string;
}

export interface WellnessCheck {
  id: string;
  date: string;
  mood: number;
  sleep: number;
  energy: number;
  pain: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  selectedDoctor: string;
  medications: Medication[];
  appointments: Appointment[];
  wellnessChecks: WellnessCheck[];
  chatHistory: ChatMessage[];
  preferences: UserPreferences;
}