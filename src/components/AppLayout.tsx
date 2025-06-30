import React from 'react';
import { useUser } from '../context/UserContext';
import { Activity, Calendar, MessageSquare, PillIcon, LogOut, User, Settings } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { user, selectedDoctor, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || !selectedDoctor) {
    return null;
  }

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Activity /> },
    { path: '/chat', label: 'Chat', icon: <MessageSquare /> },
    { path: '/medications', label: 'Medications', icon: <PillIcon /> },
    { path: '/appointments', label: 'Appointments', icon: <Calendar /> },
    { path: '/profile', label: 'Profile', icon: <User /> },
    { path: '/preferences', label: 'Settings', icon: <Settings /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className="min-h-screen flex flex-col md:flex-row"
      style={{ 
        backgroundColor: selectedDoctor.primaryColor ? `${selectedDoctor.primaryColor}10` : undefined
      }}
    >
      {/* Sidebar */}
      <div 
        className="w-full md:w-64 md:min-h-screen bg-gray-900 text-white flex flex-col"
        style={{ 
          borderRight: `1px solid ${selectedDoctor.primaryColor}30` 
        }}
      >
        {/* Doctor Info */}
        <div 
          className="p-4 border-b border-gray-700 flex items-center space-x-4"
          style={{ 
            borderColor: `${selectedDoctor.primaryColor}40` 
          }}
        >
          <div 
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedDoctor.avatar})` }}
          />
          <div>
            <div className="font-bold">
              {user.preferences.doctorNickname || `Dr. ${selectedDoctor.name}`}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive(item.path) 
                      ? `bg-opacity-90 text-white font-medium` 
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                  style={
                    isActive(item.path)
                      ? { backgroundColor: selectedDoctor.primaryColor }
                      : {}
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 text-gray-300"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;