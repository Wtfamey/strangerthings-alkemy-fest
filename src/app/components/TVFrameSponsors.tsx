import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tv } from 'lucide-react';

interface Sponsor {
  id: number;
  name: string;
  website?: string;
  logo?: string;
  description?: string;
}

interface TVFrameSponsorsProps {
  sponsors: Sponsor[];
}

// Individual TV Frame Component
function IndividualTVFrame({ sponsor }: { sponsor: Sponsor }) {
  const handleClick = () => {
    if (sponsor.website) {
      window.open(sponsor.website, '_blank');
    }
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* TV Frame Container */}
      <div className="relative bg-gray-900 rounded-lg p-6 border-4 border-gray-700 shadow-2xl hover:border-red-600 transition-all duration-300">
        
        {/* TV Screen */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ height: '200px' }}>
          {/* TV Static Effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-red-600 to-blue-600 animate-pulse"></div>
          </div>
          
          {/* Scanlines Effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
            }}></div>
          </div>
          
          {/* Sponsor Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
            {/* Sponsor Logo/Placeholder */}
            <div className="w-16 h-16 bg-red-600/20 border-2 border-red-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-600/40 transition-all">
              <Tv size={32} className="text-red-400" />
            </div>
            
            {/* Sponsor Name */}
            <h3 className="text-lg font-bold text-center mb-1 group-hover:text-red-400 transition-colors">
              {sponsor.name}
            </h3>
            
            {/* Sponsor Description */}
            {sponsor.description && (
              <p className="text-xs text-gray-400 text-center group-hover:text-gray-300 transition-colors">
                {sponsor.description}
              </p>
            )}
          </div>
          
          {/* Flicker Effect */}
          <motion.div
            className="absolute left-0 w-full h-[2px] z-20"
            style={{ backgroundColor: '#ef4444', opacity: 0.6 }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* TV Controls */}
        <div className="flex justify-center gap-2 mb-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
        
        {/* TV Stand */}
        <div className="flex justify-center">
          <div className="w-8 h-4 bg-gray-700 rounded-b-lg"></div>
        </div>
        
        {/* Visit Button */}
        {sponsor.website && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-red-600 text-white p-2 rounded-full">
              <ExternalLink size={16} />
            </div>
          </div>
        )}
      </div>
      
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-lg blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10"
        style={{ backgroundColor: '#ef4444' }}
      />
    </motion.div>
  );
}

export function TVFrameSponsors({ sponsors }: TVFrameSponsorsProps) {
  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4 tracking-wider"
          style={{
            textShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.4)',
            letterSpacing: '0.05em'
          }}
        >
          SPONSOR TV CHANNELS
        </h2>
        <div className="flex justify-center">
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        </div>
        <p className="text-sm text-gray-400 mt-4 tracking-widest uppercase font-mono">
          [ TUNE IN TO OUR PARTNERS ]
        </p>
      </div>

      {/* TV Frames Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sponsors.map((sponsor, index) => (
          <IndividualTVFrame 
            key={sponsor.id} 
            sponsor={sponsor}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-12 text-gray-400">
        <p className="text-sm">Click on any TV to visit the sponsor's website</p>
        <p className="text-xs mt-2">Each TV frame displays sponsor information</p>
      </div>
    </div>
  );
}

// Updated sponsor data with individual TV frames
export const defaultSponsors: Sponsor[] = [
  {
    id: 1,
    name: "TechCorp Industries",
    website: "https://techcorp.example.com",
    description: "Leading technology solutions"
  },
  {
    id: 2,
    name: "Gaming Zone",
    website: "https://gamingzone.example.com", 
    description: "Ultimate gaming experience"
  },
  {
    id: 3,
    name: "Music Hub",
    website: "https://musichub.example.com",
    description: "Your music destination"
  },
  {
    id: 4,
    name: "Sports Pro",
    website: "https://sportspro.example.com",
    description: "Professional sports gear"
  },
  {
    id: 5,
    name: "Neon Lights",
    website: "https://neonlights.example.com",
    description: "Vibrant lighting solutions"
  },
  {
    id: 6,
    name: "Future Tech",
    website: "https://futuretech.example.com",
    description: "Tomorrow's technology today"
  }
];
