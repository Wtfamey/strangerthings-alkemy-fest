import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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

// Individual TV Frame Component using TVFINAL.png
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
      <div className="relative bg-gray-900 rounded-lg p-4 border-4 border-gray-700 shadow-2xl hover:border-red-600 transition-all duration-300">
        
        {/* TV Frame Background - Using TVFINAL.png */}
        <div className="relative">
          <img
            src="/images/TVFINAL.png"
            alt="TV Frame"
            className="w-full h-auto object-contain"
          />
          
          {/* Sponsor Image Area - Positioned inside the TV screen */}
          <div
            className="absolute cursor-pointer group/image"
            style={{
              left: '18%',    // Adjust these values to match the TV screen area in your PNG
              top: '28%',
              width: '55%',
              height: '45%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {/* Sponsor Logo/Image */}
            {sponsor.logo ? (
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-600/30 border-2 border-red-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover/image:bg-red-600/50 transition-all">
                  <ExternalLink size={20} className="text-red-400" />
                </div>
                <p className="text-white text-xs font-bold">{sponsor.name}</p>
                <p className="text-red-400 text-xs mt-1">Add Logo</p>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-sm font-bold">Visit Website</p>
                <p className="text-xs">{sponsor.name}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sponsor Info Below TV */}
        <div className="text-center mt-4">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
            {sponsor.name}
          </h3>
          {sponsor.description && (
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              {sponsor.description}
            </p>
          )}
        </div>
        
        {/* Visit Button */}
        {sponsor.website && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
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
        {sponsors.map((sponsor) => (
          <IndividualTVFrame 
            key={sponsor.id} 
            sponsor={sponsor}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-12 text-gray-400">
        <p className="text-sm">Click on any TV screen to visit the sponsor's website</p>
        <p className="text-xs mt-2">Each TV frame uses TVFINAL.png with sponsor image areas</p>
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
    description: "Leading technology solutions",
    logo: "" // Add sponsor logo path here
  },
  {
    id: 2,
    name: "Gaming Zone",
    website: "https://gamingzone.example.com", 
    description: "Ultimate gaming experience",
    logo: "" // Add sponsor logo path here
  },
  {
    id: 3,
    name: "Music Hub",
    website: "https://musichub.example.com",
    description: "Your music destination",
    logo: "" // Add sponsor logo path here
  },
  {
    id: 4,
    name: "Sports Pro",
    website: "https://sportspro.example.com",
    description: "Professional sports gear",
    logo: "" // Add sponsor logo path here
  },
  {
    id: 5,
    name: "Neon Lights",
    website: "https://neonlights.example.com",
    description: "Vibrant lighting solutions",
    logo: "" // Add sponsor logo path here
  },
  {
    id: 6,
    name: "Future Tech",
    website: "https://futuretech.example.com",
    description: "Tomorrow's technology today",
    logo: "" // Add sponsor logo path here
  }
];
