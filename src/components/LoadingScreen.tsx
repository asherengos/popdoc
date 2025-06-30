import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Medical Database...');

  const loadingMessages = [
    'Initializing Medical Database...',
    'Calibrating Diagnostic Algorithms...',
    'Assembling Medical Multiverse...',
    'Synchronizing Voice Systems...',
    'Loading Pop Culture Doctors...',
    'Activating LCARS Interface...'
  ];

  useEffect(() => {
    const messageSound = new Audio('/assets/sounds/message.mp3');
    messageSound.play().catch(() => {});

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update loading message
        const messageIndex = Math.floor(newProgress / 16.67);
        if (messageIndex < loadingMessages.length) {
          setLoadingText(loadingMessages[messageIndex]);
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading POPDOC application"
    >
      {/* LCARS Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-500/30 animate-pulse"
              style={{
                animationDelay: `${i * 0.02}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-cyan-400 mb-2 tracking-wider animate-pulse">
            POPDOC
          </h1>
          <p className="text-xl text-cyan-300 tracking-widest">
            MEDICAL MULTIVERSE
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className="w-full h-full border-4 border-cyan-500/30 rounded-full animate-spin border-t-cyan-400"></div>
            <div className="absolute inset-2 border-2 border-purple-500/30 rounded-full animate-spin border-r-purple-400" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p 
          className="text-cyan-300 text-lg font-mono animate-pulse mb-4"
          aria-atomic="true"
        >
          {loadingText}
        </p>

        {/* Progress Percentage */}
        <p className="text-cyan-400 text-2xl font-bold tabular-nums">
          {Math.round(progress)}%
        </p>

        {/* LCARS Corner Elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-cyan-500 opacity-60"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-purple-500 opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-cyan-500 opacity-60"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-purple-500 opacity-60"></div>
      </div>
    </div>
  );
}; 