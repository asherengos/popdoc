import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { SelectedDoctorContext, SelectedDoctorProvider } from './context/SelectedDoctorContext';
import { UserProvider, useUser } from './context/UserContext';
import { LoadingScreen } from './components/LoadingScreen';

// Components
import Login from './components/Auth/Login';
import { CharacterGrid } from './components/CharacterSelection/CharacterGrid';
import { Chat } from './components/Chat/Chat';
import AppLayout from './components/AppLayout';
import Dashboard from './components/Dashboard';
import MedicationManager from './components/MedicationManager';
import AppointmentScheduler from './components/AppointmentScheduler';
import Profile from './components/Profile';
import UserPreferences from './components/Settings/UserPreferences';
// import { Doctor } from './types/index'; // Commented out unused Doctor import
import { doctors } from './data/doctors';
import { Footer } from './components/Footer';

// Simplified ProtectedRoute, primarily checking for user auth
// Doctor selection is now handled by routing to /chat only after selection
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const CharacterSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedDoctor } = React.useContext(SelectedDoctorContext);

  return (
    <div className="container mx-auto p-4 pt-12 text-center">
      <h1 className="text-4xl font-bold mb-2 text-blue-600">Meet Your POPDOC</h1>
      <p className="text-lg text-gray-700 mb-8">Select a legendary doctor to begin your consultation.</p>
      <CharacterGrid
        onDoctorSelected={(doctorId: string) => {
          const doctor = doctors.find(d => d.id === doctorId);
          if (doctor) {
            setSelectedDoctor(doctor);
            navigate('/chat');
          } else {
            // Handle case where doctorId might not be found (should not happen with current setup)
            console.error(`Doctor with id ${doctorId} not found in doctors.ts`);
            // Optionally, navigate to an error page or show a notification
          }
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [doctorOfTheDay, setDoctorOfTheDay] = React.useState(doctors[Math.floor(Math.random() * doctors.length)]);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <LoadingScreen />;

  // The state for selectedDoctor is now managed by SelectedDoctorProvider
  // No need for [selectedDoctor, setSelectedDoctor] = React.useState here

  return (
    <UserProvider>
      <SelectedDoctorProvider>
        <Router>
          <div className="bg-gradient-to-b from-gray-900 to-blue-900 min-h-screen flex flex-col">
            <header className="p-4 text-center">
              <h1 className="text-4xl font-bold text-white animate-[glow_2s_infinite]">
                POPDOC: Heroic Health
              </h1>
              <p className="text-blue-200">Chat with iconic doctors in Marvel Rivals style!</p>
              <div
                className="mt-4 p-4 bg-gray-800 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.3)] cursor-pointer inline-block"
                onMouseEnter={() => new Audio('/assets/sounds/hover.mp3').play()}
                tabIndex={0}
                aria-label={`Doctor of the Day: Dr. ${doctorOfTheDay.name}`}
              >
                <h2 className="text-xl font-bold text-white">Doctor of the Day</h2>
                <p className="text-blue-200">Meet Dr. {doctorOfTheDay.name}, {doctorOfTheDay.specialty}</p>
              </div>
            </header>
            <main className="flex-1">
              <Routes>
                {/* Public route for login */}
                <Route path="/login" element={<Login />} />
                {/* Protected route for character selection - user must be logged in */}
                <Route 
                  path="/select-doctor" 
                  element={ <ProtectedRoute><CharacterSelectionPage /></ProtectedRoute> }
                />
                {/* Protected route for chat - user must be logged in, doctor is from context */}
                <Route 
                  path="/chat" 
                  element={ <ProtectedRoute><Chat /></ProtectedRoute> }
                />
                {/* Other protected app layout routes */}
                <Route 
                  path="/app" 
                  element={ <ProtectedRoute><AppLayout /></ProtectedRoute> }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="medications" element={<MedicationManager />} />
                  <Route path="appointments" element={<AppointmentScheduler />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="preferences" element={<UserPreferences />} />
                </Route>
                {/* Default redirect: if logged in, go to select-doctor, else to login */}
                <Route 
                  path="*" 
                  element={ <Navigate to="/select-doctor" replace /> } // Or to /login if no user state yet from UserProvider
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SelectedDoctorProvider>
    </UserProvider>
  );
};