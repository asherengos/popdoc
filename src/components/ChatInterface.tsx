import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Send, PaperclipIcon } from 'lucide-react';
import { generateDoctorResponse } from '../utils/chatUtils';

const ChatInterface: React.FC = () => {
  const { user, selectedDoctor, addChatMessage } = useUser();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [user?.chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user || !selectedDoctor) return;
    
    // Add user message
    addChatMessage({
      sender: 'user',
      text: message,
    });
    
    // Clear input
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Generate doctor's response (simulated delay)
    setTimeout(() => {
      const response = generateDoctorResponse(message, selectedDoctor);
      
      addChatMessage({
        sender: 'doctor',
        text: response,
      });
      
      setIsTyping(false);
    }, 1500);
  };

  if (!user || !selectedDoctor) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header */}
      <div 
        className="p-4 border-b flex items-center space-x-4"
        style={{ 
          borderColor: `${selectedDoctor.primaryColor}30` 
        }}
      >
        <div 
          className="w-12 h-12 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedDoctor.avatar})` }}
        />
        <div>
          <div className="font-bold">Dr. {selectedDoctor.name}</div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message if no chat history */}
          {user.chatHistory.length === 0 && (
            <div 
              className="p-4 rounded-lg text-white max-w-md mx-auto text-center mb-8"
              style={{ backgroundColor: selectedDoctor.primaryColor }}
            >
              <p className="mb-2 font-bold">
                Welcome to your medical consultation with Dr. {selectedDoctor.name}!
              </p>
              <p className="text-sm opacity-90">
                Ask about your health, medications, or appointments. I'm here to help!
              </p>
            </div>
          )}
          
          {/* Chat messages */}
          {user.chatHistory.map((msg) => (
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
                className={`max-w-md rounded-lg p-3 ${
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
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div 
                className="w-8 h-8 rounded-full bg-cover bg-center mr-2 self-end"
                style={{ backgroundImage: `url(${selectedDoctor.avatar})` }}
              />
              <div 
                className="max-w-md rounded-lg p-3 text-white"
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
      </div>
      
      {/* Message input */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4 border-t flex items-center space-x-2"
        style={{ 
          borderColor: `${selectedDoctor.primaryColor}30` 
        }}
      >
        <button 
          type="button"
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
        >
          <PaperclipIcon size={20} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Ask Dr. ${selectedDoctor.name} something...`}
          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2"
        />
        
        <button 
          type="submit"
          className="p-3 rounded-full text-white"
          style={{ backgroundColor: selectedDoctor.primaryColor }}
          disabled={!message.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;