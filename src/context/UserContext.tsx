import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Doctor, ChatMessage, Medication, Appointment, WellnessCheck, UserPreferences } from '../types';
import { getDoctor } from '../data/doctors';
import { SpeechManager } from '../utils/speechUtils';
import axios from 'axios';

const defaultPreferences: UserPreferences = {
  nickname: '',
  pronouns: 'they/them',
  voiceEnabled: false,
  theme: 'light',
  notifications: true
};

interface UserContextType {
  user: User | null;
  selectedDoctor: Doctor | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  selectDoctor: (doctorId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addWellnessCheck: (check: Omit<WellnessCheck, 'id' | 'date'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const speechManager = SpeechManager.getInstance();

  // Load saved user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('popdoc-user');
    
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      if (parsedUser.selectedDoctor) {
        const doctor = getDoctor(parsedUser.selectedDoctor);
        if (doctor) {
          setSelectedDoctor(doctor);
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        selectedDoctor: '',
        medications: [],
        appointments: [],
        wellnessChecks: [],
        chatHistory: [],
        preferences: defaultPreferences
      };
      
      setUser(newUser);
      localStorage.setItem('popdoc-user', JSON.stringify(newUser));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('popdoc-user');
    setUser(null);
    setSelectedDoctor(null);
  };

  const selectDoctor = (doctorId: string) => {
    const doctor = getDoctor(doctorId);
    if (doctor && user) {
      setSelectedDoctor(doctor);
      const updatedUser = { ...user, selectedDoctor: doctorId };
      setUser(updatedUser);
      localStorage.setItem('popdoc-user', JSON.stringify(updatedUser));
    }
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    if (user) {
      const updatedPreferences = { ...user.preferences, ...preferences };
      const updatedUser = { ...user, preferences: updatedPreferences };
      setUser(updatedUser);
      localStorage.setItem('popdoc-user', JSON.stringify(updatedUser));
    }
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    if (user && selectedDoctor) {
      const newMessage: ChatMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      
      const updatedUser = {
        ...user,
        chatHistory: [...user.chatHistory, newMessage],
      };
      
      setUser(updatedUser);
      localStorage.setItem('popdoc-user', JSON.stringify(updatedUser));

      if (message.sender === 'doctor' && user.preferences.voiceEnabled && selectedDoctor.voiceSettings) {
        speechManager.speak(message.text, selectedDoctor.voiceSettings);
      }
    }
  };

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    if (user) {
      const newMedication: Medication = {
        ...medication,
        id: Date.now().toString(),
      };
      
      const updatedUser = {
        ...user,
        medications: [...user.medications, newMedication],
      };
      
      setUser(updatedUser);
      localStorage.setItem('popdoc-user', JSON.stringify(updatedUser));
    }
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    if (user) {
      const newAppointment: Appointment = {
        ...appointment,
        id: Date.now().toString(),
      };
      
      const updatedUser = {
        ...user,
        appointments: [...user.appointments, newAppointment],
      };
      
      setUser(updatedUser);
      localStorage.setItem('popdoc-user', JSON.stringify(updatedUser));
    }
  };

  const addWellnessCheck = (check: Omit<WellnessCheck, 'id' | 'date'>) => {
    if (user) {
      const newCheck: WellnessCheck = {
        ...check,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      
      const updatedUser = {
        ...user,
        wellnessChecks: [...user.wellnessChecks, newCheck],
      };
      
      setUser(updatedUser);
      localStorage.setItem('popdoc-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        selectedDoctor,
        login,
        logout,
        selectDoctor,
        updatePreferences,
        addChatMessage,
        addMedication,
        addAppointment,
        addWellnessCheck,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};