import * as React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-900 text-white text-center shadow-[0_0_15px_rgba(0,255,255,0.3)]">
      <p className="animate-[glow_2s_infinite]">
        POPDOC: Heroic Health &copy; 2025 | Built for Bolt.new Hackathon
      </p>
      <p className="text-sm text-blue-200">
        Powered by Vite, React, Express, and ElevenLabs
      </p>
      <a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2"
      >
        <img
          src="/assets/images/bolt-badge.png"
          alt="Built with Bolt.new"
          className="h-8"
        />
      </a>
    </footer>
  );
}; 