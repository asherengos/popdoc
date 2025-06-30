import * as React from 'react';
import { Doctor } from '../types/index'; // Assuming types are in ../types/index.ts

interface DoctorContextType {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void; // Allow null for deselection
}

export const SelectedDoctorContext = React.createContext<DoctorContextType>({
  selectedDoctor: null,
  setSelectedDoctor: () => {},
});

// Optional: Provider component to wrap around parts of the app that need this context
interface SelectedDoctorProviderProps {
  children: React.ReactNode;
}

export const SelectedDoctorProvider: React.FC<SelectedDoctorProviderProps> = ({ children }) => {
  const [selectedDoctor, setSelectedDoctorState] = React.useState<Doctor | null>(null);

  const setSelectedDoctor = (doctor: Doctor | null) => {
    setSelectedDoctorState(doctor);
  };

  return (
    <SelectedDoctorContext.Provider value={{ selectedDoctor, setSelectedDoctor }}>
      {children}
    </SelectedDoctorContext.Provider>
  );
};

export function useDoctor() {
  return React.useContext(SelectedDoctorContext);
} 