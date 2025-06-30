import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer 
      className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white p-6 border-t-2 border-cyan-500/30"
      role="contentinfo"
      aria-label="POPDOC footer information"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* POPDOC Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-cyan-400 mb-2 tracking-wider">
              POPDOC
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Heroic Health powered by AI
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Medical advice for entertainment only. 
              Consult licensed doctors for real medical needs.
            </p>
          </div>

          {/* Challenge Badges */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-purple-400 mb-3">
              Hackathon Challenges
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              <span 
                className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-bold"
                role="badge"
                aria-label="Voice AI Challenge participant"
              >
                🎵 Voice AI
              </span>
              <span 
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full text-xs font-bold"
                role="badge"
                aria-label="Deploy Challenge participant"
              >
                🚀 Deploy
              </span>
              <span 
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold"
                role="badge"
                aria-label="Custom Domain Challenge participant"
              >
                🌐 Custom Domain
              </span>
              <span 
                className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold"
                role="badge"
                aria-label="Conversational AI Video Challenge participant"
              >
                🎬 AI Video
              </span>
            </div>
          </div>

          {/* Built With */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-cyan-400 mb-3">
              Built With
            </h4>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
                aria-label="Built with Bolt.new"
                onMouseEnter={() => {
                  const hoverSound = new Audio('/assets/sounds/hover.mp3');
                  hoverSound.play().catch(() => {});
                }}
              >
                <img
                  src="/assets/images/bolt-badge.png"
                  alt="Built with Bolt.new"
                  className="h-8 w-auto"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-cyan-300 font-bold text-sm">
                  Bolt.new
                </span>
              </a>
              <div className="text-xs text-gray-400">
                React • TypeScript • Vite
              </div>
              <div className="text-xs text-gray-400">
                ElevenLabs • Google Cloud TTS
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan-500/20 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-300">
                © 2025 POPDOC Team | World's Largest Hackathon
              </p>
              <p className="text-xs text-gray-500">
                Built with ❤️ by Asher & Cursor
              </p>
            </div>

            {/* Links */}
            <div className="flex space-x-6 text-sm">
              <a
                href="https://github.com/asherengos/popdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                aria-label="View POPDOC source code on GitHub"
              >
                GitHub
              </a>
              <a
                href="https://worldslargesthackathon.devpost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                aria-label="View hackathon on Devpost"
              >
                Hackathon
              </a>
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                aria-label="Learn more about Bolt.new"
              >
                Bolt.new
              </a>
            </div>
          </div>
        </div>

        {/* LCARS Corner Elements */}
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-500/30"></div>
      </div>
    </footer>
  );
}; 