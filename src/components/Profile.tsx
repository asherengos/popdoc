import React from 'react';
import { useUser } from '../context/UserContext';
import { User, Settings, Mail, LogOut } from 'lucide-react';
import { doctors } from '../data/doctors';

const Profile: React.FC = () => {
  const { user, selectedDoctor, logout, selectDoctor } = useUser();

  if (!user || !selectedDoctor) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: selectedDoctor.primaryColor }}>
          User Profile
        </h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center text-center">
              <div 
                className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-3xl font-bold mb-4"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              <div className="w-full mt-4 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-2 rounded-md text-gray-700 border hover:bg-gray-50">
                  <User size={18} />
                  Edit Profile
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-2 rounded-md text-gray-700 border hover:bg-gray-50">
                  <Settings size={18} />
                  Account Settings
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-2 rounded-md text-gray-700 border hover:bg-gray-50">
                  <Mail size={18} />
                  Notification Preferences
                </button>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-md text-white"
                  style={{ backgroundColor: selectedDoctor.primaryColor }}
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Selection */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Change Medical Companion</h2>
            <p className="text-gray-600 mb-6">
              You are currently being assisted by Dr. {selectedDoctor.name}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className={`border rounded-md p-4 cursor-pointer transition-all duration-300 ${
                    selectedDoctor.id === doctor.id 
                      ? 'ring-2 shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectDoctor(doctor.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${doctor.avatar})` }}
                    />
                    <div>
                      <div className="font-bold">Dr. {doctor.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Data */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Health Data Summary</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div 
                className="border rounded-md p-4 text-center"
                style={{ borderColor: `${selectedDoctor.primaryColor}30` }}
              >
                <div className="text-3xl font-bold" style={{ color: selectedDoctor.primaryColor }}>
                  {user.medications.length}
                </div>
                <div className="text-gray-600">Active Medications</div>
              </div>
              <div 
                className="border rounded-md p-4 text-center"
                style={{ borderColor: `${selectedDoctor.primaryColor}30` }}
              >
                <div className="text-3xl font-bold" style={{ color: selectedDoctor.primaryColor }}>
                  {user.appointments.filter(apt => new Date(apt.date) >= new Date()).length}
                </div>
                <div className="text-gray-600">Upcoming Appointments</div>
              </div>
              <div 
                className="border rounded-md p-4 text-center"
                style={{ borderColor: `${selectedDoctor.primaryColor}30` }}
              >
                <div className="text-3xl font-bold" style={{ color: selectedDoctor.primaryColor }}>
                  {user.wellnessChecks.length}
                </div>
                <div className="text-gray-600">Wellness Check-ins</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Data Export Options</h3>
              <div className="flex flex-wrap gap-2">
                <button className="py-1 px-3 border rounded-md text-sm hover:bg-gray-50">
                  Export Medications
                </button>
                <button className="py-1 px-3 border rounded-md text-sm hover:bg-gray-50">
                  Export Appointments
                </button>
                <button className="py-1 px-3 border rounded-md text-sm hover:bg-gray-50">
                  Export Wellness Data
                </button>
                <button className="py-1 px-3 border rounded-md text-sm hover:bg-gray-50">
                  Export All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;