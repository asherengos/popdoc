import * as React from 'react';
import { Doctor } from '../../types/index'; // Pointing to index

interface Props {
  doctor: Doctor;
  onSelect: () => void;
}

export const CharacterCard: React.FC<Props> = ({ doctor, onSelect }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      onSelect();
    }, 200); // Short zoom effect
  };

  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-purple-700 to-blue-500 shadow-xl border-4 border-transparent cursor-pointer animate-fade-in transition-all duration-300
        hover:scale-105 hover:shadow-[0_0_20px_8px_rgba(255,255,0,0.6)] hover:border-yellow-400
        ${isClicked ? 'scale-110 ring-4 ring-yellow-300' : ''}`}
      style={{ outlineColor: doctor.primaryColor || '#3B82F6' }}
      role="button"
      tabIndex={0}
      aria-label={`Select Dr. ${doctor.name}`}
      aria-selected={false}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      {/* Particle overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-yellow-300 opacity-70 animate-pulse`}
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div className="w-full aspect-[3/4] overflow-hidden rounded-t-xl mb-2 bg-black">
        <img
          src={doctor.avatar}
          alt={`Avatar of Dr. ${doctor.name}`}
          className="w-full h-full object-cover object-center rounded-t-xl transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-white animate-pulse">{doctor.name}</h3>
      <p className="text-sm text-gray-200">{doctor.specialty}</p>
      <p className="text-xs text-gray-300 italic">{doctor.bio}</p>
    </div>
  );
};

// Default export might be preferred by some bundlers/setups, can adjust if needed.
// export default CharacterCard; 