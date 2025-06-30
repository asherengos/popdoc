import * as React from 'react';
import { useContext, useState, useRef, useEffect } from 'react';
import { SelectedDoctorContext } from '../../context/SelectedDoctorContext';
// import { Doctor } from '../../types/index'; // Doctor type not directly used here, selectedDoctor has it

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  audioDataUri?: string;
}

export const Chat: React.FC = () => {
  const { selectedDoctor } = useContext(SelectedDoctorContext);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useTTS, setUseTTS] = useState(true);
  const [useElevenLabs, setUseElevenLabs] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (selectedDoctor) {
      setMessages([
        {
          id: Date.now().toString(),
          text: `Hello! I am Dr. ${selectedDoctor.name}. How can I help you today?`,
          sender: 'doctor',
        }
      ]);
    } else {
      setMessages([]);
    }
  }, [selectedDoctor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !selectedDoctor || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user',
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          doctorId: selectedDoctor.id,
          useTTS,
          useElevenLabs
        })
      });
      const { text, audioDataUri } = await res.json();
      const doctorResponse: ChatMessage = {
        id: Date.now().toString() + '-doc',
        text: text,
        sender: 'doctor',
        audioDataUri: audioDataUri,
      };
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
      if (audioDataUri && useTTS && audioRef.current) {
        audioRef.current.src = audioDataUri;
        audioRef.current.play().catch(err => console.error("Audio play error:", err));
      }
      // Play chat sound for every message
      const chatSound = new Audio('/assets/sounds/message.mp3');
      chatSound.play().catch(() => {});
    } catch (error: any) {
      setIsLoading(false);
      console.error('Chat submission error:', error);
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString() + '-client-error', text: `Client error: ${error.message}`, sender: 'doctor'}]);
    }
  };

  if (!selectedDoctor) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-100 rounded-lg shadow-xl animate-fadeIn">
        <h2 className="text-3xl font-semibold text-gray-700 mb-3">No Doctor Selected</h2>
        <p className="text-gray-500">Please choose a doctor to start your POPDOC experience!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 animate-fadeIn">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white shadow-md">
        <h2 className="text-2xl font-bold text-center tracking-tight">
          Chat with Dr. {selectedDoctor.name}
        </h2>
        <p className="text-sm text-center text-blue-100">{selectedDoctor.bio}</p>
      </header>
      <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
        {messages.map((msg, index) => (
          <div key={msg.id} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block p-3 rounded-lg transition-all duration-300 animate-[typing_1s] ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(0,0,255,0.5)]'
                  : 'bg-gray-700 text-blue-100 shadow-[0_0_10px_rgba(0,255,255,0.3)]'
              }`}
              role="log"
              aria-live="polite"
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && (
        <div className="p-3 text-center text-sm text-blue-600 font-semibold animate-pulse">Dr. {selectedDoctor.name} is formulating a response...</div>
      )}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-100 shadow-inner">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-200 transition-shadow duration-150 shadow-sm hover:shadow-md"
            placeholder={`Message Dr. ${selectedDoctor.name}...`}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 text-white font-semibold p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-md hover:shadow-lg active:translate-y-px"
            disabled={isLoading || !prompt.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </form>
      <audio ref={audioRef} className="hidden" />
      <div className="flex gap-4 mb-4 p-2 bg-blue-50 rounded-lg justify-center">
        <label className="flex items-center text-blue-900 font-semibold">
          <input
            type="checkbox"
            checked={useTTS}
            onChange={(e) => setUseTTS(e.target.checked)}
            className="mr-2"
          />
          Enable Voice
        </label>
        <label className="flex items-center text-blue-900 font-semibold">
          <input
            type="checkbox"
            checked={useElevenLabs}
            onChange={(e) => setUseElevenLabs(e.target.checked)}
            className="mr-2"
          />
          Use ElevenLabs
        </label>
      </div>
    </div>
  );
}; 