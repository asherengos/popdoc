import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Settings, Volume2, Volume2 as Volume2Off, Sun, Moon, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserPreferences: React.FC = () => {
  const { user, selectedDoctor, updatePreferences } = useUser();
  const [showSaved, setShowSaved] = useState(false);

  if (!user || !selectedDoctor) return null;

  const handlePreferenceChange = (key: keyof typeof user.preferences, value: any) => {
    updatePreferences({ [key]: value });
    
    // Show saved indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: selectedDoctor.primaryColor }}>
          User Preferences
        </h1>
        <p className="text-gray-600">
          Customize your experience with Dr. {selectedDoctor.name}
        </p>
      </header>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
            Profile Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nickname
              </label>
              <input
                type="text"
                value={user.preferences.nickname}
                onChange={(e) => handlePreferenceChange('nickname', e.target.value)}
                placeholder="What should we call you?"
                className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pronouns
              </label>
              <select
                value={user.preferences.pronouns}
                onChange={(e) => handlePreferenceChange('pronouns', e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
              >
                <option value="they/them">They/Them</option>
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        </section>

        {/* Doctor Customization */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
            Doctor Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Nickname
              </label>
              <input
                type="text"
                value={user.preferences.doctorNickname || ''}
                onChange={(e) => handlePreferenceChange('doctorNickname', e.target.value)}
                placeholder={`Dr. ${selectedDoctor.name}`}
                className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave blank to use the default name
              </p>
            </div>
          </div>
        </section>

        {/* Voice Settings */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            {user.preferences.voiceEnabled ? (
              <Volume2 className="mr-2\" size={20} style={{ color: selectedDoctor.primaryColor }} />
            ) : (
              <Volume2Off className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
            )}
            Voice Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Enable Voice Responses</span>
              <button
                onClick={() => handlePreferenceChange('voiceEnabled', !user.preferences.voiceEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  user.preferences.voiceEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    user.preferences.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Settings className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
            Theme Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Theme Mode</span>
              <button
                onClick={() => handlePreferenceChange('theme', user.preferences.theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {user.preferences.theme === 'light' ? (
                  <Sun size={20} className="text-gray-600" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Saved Indicator */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Preferences saved!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPreferences;