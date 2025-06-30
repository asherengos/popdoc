import * as React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold text-white animate-[glow_2s_infinite]">
          Loading POPDOC: Heroic Health
        </h2>
        <p className="text-blue-200">Assembling your medical multiverse...</p>
      </div>
    </div>
  );
}; 