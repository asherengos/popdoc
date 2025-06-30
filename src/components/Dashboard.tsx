import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Bell, Calendar, PillIcon, Heart, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDoctorResponse } from '../utils/chatUtils';

const Dashboard: React.FC = () => {
  const { user, selectedDoctor, addChatMessage } = useUser();
  const [showWellnessCheck, setShowWellnessCheck] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastCheckRef = useRef<number>(0);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [user?.chatHistory]);

  // Check if we should show the daily mental health check
  useEffect(() => {
    const now = Date.now();
    const lastCheck = localStorage.getItem('lastMentalHealthCheck');
    lastCheckRef.current = lastCheck ? parseInt(lastCheck) : 0;

    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (now - lastCheckRef.current > oneDayInMs) {
      setShowWellnessCheck(true);
    }
  }, []);

  if (!user || !selectedDoctor) {
    return null;
  }

  // Get today's date for quick reference
  const today = new Date().toISOString().split('T')[0];
  
  // Filter today's medications
  const todaysMedications = user.medications.filter(med => 
    med.timeOfDay.some(time => {
      const now = new Date();
      const hour = now.getHours();
      
      if (time === 'morning' && hour >= 6 && hour < 12) return true;
      if (time === 'afternoon' && hour >= 12 && hour < 18) return true;
      if (time === 'evening' && hour >= 18 && hour < 22) return true;
      if (time === 'night' && (hour >= 22 || hour < 6)) return true;
      
      return false;
    })
  );
  
  // Filter upcoming appointments
  const upcomingAppointments = user.appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    addChatMessage({
      sender: 'user',
      text: message,
    });

    // Clear input and show typing indicator
    setMessage('');
    setIsTyping(true);

    // Generate doctor's response with delay for typing effect
    setTimeout(() => {
      const response = generateDoctorResponse(message, selectedDoctor);
      addChatMessage({
        sender: 'doctor',
        text: response,
      });
      setIsTyping(false);
    }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms
  };

  const handleWellnessCheck = () => {
    localStorage.setItem('lastMentalHealthCheck', Date.now().toString());
    setShowWellnessCheck(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: selectedDoctor.primaryColor }}>
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          Dr. {selectedDoctor.name} is monitoring your health today
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Daily Quote */}
        <div 
          className="col-span-1 md:col-span-3 p-6 rounded-lg shadow-md"
          style={{ 
            backgroundColor: `${selectedDoctor.primaryColor}10`,
            borderLeft: `4px solid ${selectedDoctor.primaryColor}` 
          }}
        >
          <div className="italic text-lg">{selectedDoctor.bio}</div>
          <div className="mt-2 text-right text-sm text-gray-600">— Dr. {selectedDoctor.name}</div>
        </div>

        {/* Medications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl flex items-center">
              <PillIcon className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
              Today's Medications
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">
              {todaysMedications.length} Due
            </span>
          </div>
          
          {todaysMedications.length > 0 ? (
            <ul className="space-y-3">
              {todaysMedications.map(med => (
                <li key={med.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-gray-600">{med.dosage}</div>
                  </div>
                  <div className="bg-gray-100 py-1 px-2 rounded text-sm">
                    {med.timeOfDay.join(', ')}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No medications scheduled for now</p>
          )}
          
          <button 
            className="mt-4 text-sm font-medium flex items-center"
            style={{ color: selectedDoctor.primaryColor }}
            onClick={() => window.location.href = '/medications'}
          >
            View all medications
          </button>
        </div>

        {/* Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl flex items-center">
              <Calendar className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
              Upcoming Appointments
            </h2>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <ul className="space-y-3">
              {upcomingAppointments.map(apt => (
                <li key={apt.id} className="border-b pb-2">
                  <div className="font-medium">{apt.title}</div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">
                      {new Date(apt.date).toLocaleDateString()} at {apt.time}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(`${apt.date}T${apt.time}`))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No upcoming appointments</p>
          )}
          
          <button 
            className="mt-4 text-sm font-medium flex items-center"
            style={{ color: selectedDoctor.primaryColor }}
            onClick={() => window.location.href = '/appointments'}
          >
            View all appointments
          </button>
        </div>

        {/* Wellness */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl flex items-center">
              <Heart className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
              Wellness Check
            </h2>
            <Bell size={18} className="text-gray-400" />
          </div>
          
          {!showWellnessCheck ? (
            <div>
              <p className="text-gray-600 mb-4">
                {user.wellnessChecks.length === 0 
                  ? "You haven't completed any wellness checks yet." 
                  : `Your last check was ${formatDistanceToNow(new Date(user.wellnessChecks[user.wellnessChecks.length - 1].date))} ago.`
                }
              </p>
              <button 
                className="w-full py-2 px-4 rounded-md text-white font-medium"
                style={{ backgroundColor: selectedDoctor.primaryColor }}
                onClick={() => setShowWellnessCheck(true)}
              >
                Start Daily Check-in
              </button>
            </div>
          ) : (
            <p className="text-gray-500 italic">Wellness check form would appear here</p>
          )}
        </div>
      </div>

      {/* Chat Button */}
      <motion.button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full text-white shadow-lg flex items-center space-x-2"
        style={{ backgroundColor: selectedDoctor.primaryColor }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
        <span className="hidden md:inline">Talk to Dr. {selectedDoctor.name}</span>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedDoctor.avatar})` }}
                />
                <div>
                  <div className="font-bold">Dr. {selectedDoctor.name}</div>
                  <div className="text-sm text-gray-500">{selectedDoctor.specialty}</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {user.chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 italic">
                    Start a conversation with Dr. {selectedDoctor.name}
                  </div>
                ) : (
                  user.chatHistory.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'doctor' && (
                        <div 
                          className="w-8 h-8 rounded-full bg-cover bg-center mr-2 self-end"
                          style={{ backgroundImage: `url(${selectedDoctor.avatar})` }}
                        />
                      )}
                      
                      <div 
                        className={`max-w-xs rounded-lg p-3 ${
                          msg.sender === 'user' 
                            ? 'bg-blue-100 text-gray-800' 
                            : 'text-white'
                        }`}
                        style={msg.sender === 'doctor' ? { backgroundColor: selectedDoctor.primaryColor } : {}}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 self-end flex items-center justify-center text-gray-600">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div 
                      className="w-8 h-8 rounded-full bg-cover bg-center mr-2 self-end"
                      style={{ backgroundImage: `url(${selectedDoctor.avatar})` }}
                    />
                    <div 
                      className="max-w-xs rounded-lg p-3 text-white"
                      style={{ backgroundColor: selectedDoctor.primaryColor }}
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form 
                onSubmit={handleSendMessage}
                className="p-4 border-t flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Ask Dr. ${selectedDoctor.name} something...`}
                  className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2"
                />
                <motion.button 
                  type="submit"
                  className="p-2 rounded-full text-white"
                  style={{ backgroundColor: selectedDoctor.primaryColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!message.trim()}
                >
                  <MessageSquare size={20} />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mental Health Check Modal */}
      <AnimatePresence>
        {showWellnessCheck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <h2 className="text-xl font-bold mb-4">Daily Mental Health Check</h2>
              <p className="text-gray-600 mb-4">
                Dr. {selectedDoctor.name} would like to check on your mental well-being.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How are you feeling today?
                  </label>
                  <input type="range" min="1" max="5" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How's your stress level?
                  </label>
                  <input type="range" min="1" max="5" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How well did you sleep?
                  </label>
                  <input type="range" min="1" max="5" className="w-full" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowWellnessCheck(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Skip
                </button>
                <button
                  onClick={handleWellnessCheck}
                  className="px-4 py-2 rounded-md text-white"
                  style={{ backgroundColor: selectedDoctor.primaryColor }}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;