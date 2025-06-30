import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { LoadingScreen } from './components/LoadingScreen';
import { CharacterGrid } from './components/CharacterSelection/CharacterGrid';
import { Chat } from './components/Chat/Chat';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AppointmentScheduler from './components/AppointmentScheduler';
import MedicationManager from './components/MedicationManager';
import Login from './components/Auth/Login';
import UserPreferences from './components/Settings/UserPreferences';
import { SelectedDoctorProvider } from './context/SelectedDoctorContext';
import { UserProvider } from './context/UserContext';
import { doctors } from './data/doctors';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doctorOfTheDay, setDoctorOfTheDay] = useState(doctors[0]);

  useEffect(() => {
    // Set doctor of the day based on current date
    const today = new Date();
    const dayIndex = today.getDate() % doctors.length;
    setDoctorOfTheDay(doctors[dayIndex]);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <UserProvider>
      <SelectedDoctorProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
            {/* LCARS Header Bar */}
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2"></div>
            
            {/* Doctor of the Day Banner */}
            <div 
              className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-cyan-500/30"
              role="banner"
              aria-label="Doctor of the Day"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400">
                    <img 
                      src={doctorOfTheDay.avatar} 
                      alt={`Dr. ${doctorOfTheDay.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 
                      className="text-cyan-400 text-lg font-bold tracking-wide"
                      tabIndex={0}
                      onMouseEnter={() => {
                        const hoverSound = new Audio('/assets/sounds/hover.mp3');
                        hoverSound.play().catch(() => {});
                      }}
                    >
                      Doctor of the Day: Dr. {doctorOfTheDay.name}
                    </h2>
                    <p className="text-gray-300 text-sm font-mono">
                      {doctorOfTheDay.specialty}
                    </p>
                  </div>
                </div>
                <div className="text-cyan-400 text-right">
                  <div className="text-sm font-mono">STARDATE</div>
                  <div className="text-lg font-bold tabular-nums">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }).replace(/\//g, '.')}
                  </div>
                </div>
              </div>
            </div>

            <Routes>
              <Route path="/" element={
                <div className="container mx-auto p-4 pt-12 text-center">
                  <h1 className="text-4xl font-bold mb-2 text-cyan-400">Meet Your POPDOC</h1>
                  <p className="text-lg text-gray-300 mb-8">Select a legendary doctor to begin your consultation.</p>
                  <CharacterGrid />
                </div>
              } />
              <Route path="/chat" element={<Chat />} />
              <Route path="/app" element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="appointments" element={<AppointmentScheduler />} />
                <Route path="medications" element={<MedicationManager />} />
                <Route path="preferences" element={<UserPreferences />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
            
            <Footer />
          </div>
        </Router>
      </SelectedDoctorProvider>
    </UserProvider>
  );
};