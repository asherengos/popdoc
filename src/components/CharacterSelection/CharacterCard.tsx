import React, { useState, useRef } from 'react';
import { Doctor } from '../../types';

interface CharacterCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ doctor, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVoicePreview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isVoicePlaying) return;
    
    setIsVoicePlaying(true);
    
    try {
      // Play hover sound first
      const hoverSound = new Audio('/assets/sounds/hover.mp3');
      hoverSound.play().catch(() => {});
      
      // Get voice preview from backend
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Hello, I am Dr. ${doctor.name}. How can I help you today?`,
          doctorId: doctor.id,
          useTTS: true,
          useElevenLabs: false
        })
      });
      
      if (response.ok) {
        const { audioDataUri } = await response.json();
        if (audioDataUri && audioRef.current) {
          audioRef.current.src = audioDataUri;
          audioRef.current.play().catch(() => {});
        }
      }
    } catch (error) {
      console.error('Voice preview error:', error);
    } finally {
      setTimeout(() => setIsVoicePlaying(false), 2000);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const hoverSound = new Audio('/assets/sounds/hover.mp3');
    hoverSound.play().catch(() => {});
  };

  return (
    <div 
      className={`
        relative group cursor-pointer transform transition-all duration-300 hover:scale-105
        ${isSelected ? 'scale-105' : ''}
        ${isHovered ? 'z-10' : ''}
      `}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Select Dr. ${doctor.name}, ${doctor.specialty}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl blur-xl transition-all duration-300
          ${isSelected || isHovered 
            ? `bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-blue-500/50 animate-pulse` 
            : 'bg-transparent'
          }
        `}
        style={{
          background: isSelected || isHovered 
            ? `linear-gradient(45deg, ${doctor.primaryColor}40, #06b6d440, #8b5cf640)`
            : 'transparent'
        }}
      />
      
      {/* Main Card */}
      <div 
        className={`
          relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
          rounded-xl p-6 border-2 transition-all duration-300 overflow-hidden
          ${isSelected 
            ? 'border-cyan-400 shadow-lg shadow-cyan-500/25' 
            : isHovered 
              ? 'border-purple-400 shadow-lg shadow-purple-500/25'
              : 'border-gray-600 hover:border-gray-500'
          }
        `}
        style={{
          borderColor: isSelected || isHovered ? doctor.primaryColor : undefined,
          boxShadow: isSelected || isHovered 
            ? `0 0 30px ${doctor.primaryColor}40, 0 0 60px ${doctor.primaryColor}20`
            : undefined
        }}
      >
        {/* LCARS Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-60"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-purple-400 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-400 opacity-60"></div>

        {/* Avatar */}
        <div className="relative mb-4">
          <div 
            className={`
              w-24 h-24 mx-auto rounded-full overflow-hidden border-4 transition-all duration-300
              ${isSelected ? 'border-cyan-400' : 'border-gray-600'}
            `}
            style={{
              borderColor: isSelected || isHovered ? doctor.primaryColor : undefined
            }}
          >
            <img 
              src={doctor.avatar} 
              alt={`Dr. ${doctor.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Voice Preview Button */}
          <button
            onClick={handleVoicePreview}
            disabled={isVoicePlaying}
            className={`
              absolute -bottom-2 -right-2 w-8 h-8 rounded-full 
              bg-gradient-to-r from-cyan-500 to-purple-500 
              flex items-center justify-center text-white text-sm
              transition-all duration-300 hover:scale-110
              ${isVoicePlaying ? 'animate-pulse' : 'hover:shadow-lg'}
            `}
            aria-label={`Play voice preview for Dr. ${doctor.name}`}
            title="Voice Preview"
          >
            {isVoicePlaying ? '🔊' : '🎵'}
          </button>
        </div>

        {/* Doctor Info */}
        <div className="text-center">
          <h3 
            className={`
              text-xl font-bold mb-2 transition-all duration-300
              ${isSelected ? 'text-cyan-400' : 'text-white'}
            `}
            style={{
              color: isSelected || isHovered ? doctor.primaryColor : undefined
            }}
          >
            {doctor.name}
          </h3>
          
          <p className="text-sm text-gray-300 mb-3 font-mono tracking-wide">
            {doctor.specialty}
          </p>
          
          <p className="text-xs text-gray-400 leading-relaxed min-h-[3rem]">
            {doctor.bio}
          </p>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-gray-900 text-sm font-bold">✓</span>
            </div>
          </div>
        )}

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-transparent to-purple-500 animate-pulse"></div>
        </div>
      </div>
      
      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

// Default export might be preferred by some bundlers/setups, can adjust if needed.
// export default CharacterCard; 