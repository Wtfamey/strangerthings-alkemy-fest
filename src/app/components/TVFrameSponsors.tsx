import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Sponsor {
  id: number;
  name: string;
  website?: string;
  position: { x: number; y: number; width: number; height: number };
}

interface TVFrameSponsorsProps {
  sponsors: Sponsor[];
}

export function TVFrameSponsors({ sponsors }: TVFrameSponsorsProps) {
  const handleSponsorClick = (website?: string) => {
    if (website) {
      window.open(website, '_blank');
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* TV Frame Background */}
      <div className="relative">
        <img
          src="/images/TVFINAL.png"
          alt="TV Frame for Sponsors"
          className="w-full h-auto object-contain"
        />
        
        {/* Sponsor Slots */}
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="absolute cursor-pointer group transition-all duration-300 hover:scale-105"
            style={{
              left: `${sponsor.position.x}%`,
              top: `${sponsor.position.y}%`,
              width: `${sponsor.position.width}%`,
              height: `${sponsor.position.height}%`,
            }}
            onClick={() => handleSponsorClick(sponsor.website)}
          >
            {/* Sponsor Placeholder */}
            <div className="w-full h-full bg-black/50 border-2 border-red-600/50 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600/20 group-hover:border-red-400 transition-all">
              <div className="text-center p-2">
                <div className="text-white text-xs font-bold mb-1">{sponsor.name}</div>
                {sponsor.website && (
                  <div className="flex items-center justify-center gap-1 text-red-400 group-hover:text-red-300">
                    <ExternalLink size={12} />
                    <span className="text-xs">Visit</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 text-red-400">
        <p className="text-sm">Click on sponsor slots to visit their websites</p>
        <p className="text-xs mt-1">Replace placeholder areas with sponsor logos</p>
      </div>
    </div>
  );
}

// Default sponsor positions (you can adjust these based on your TV frame layout)
export const defaultSponsors: Sponsor[] = [
  {
    id: 1,
    name: "Sponsor 1",
    website: "https://example.com",
    position: { x: 15, y: 25, width: 20, height: 15 }
  },
  {
    id: 2,
    name: "Sponsor 2", 
    website: "https://example.com",
    position: { x: 40, y: 25, width: 20, height: 15 }
  },
  {
    id: 3,
    name: "Sponsor 3",
    website: "https://example.com", 
    position: { x: 65, y: 25, width: 20, height: 15 }
  },
  {
    id: 4,
    name: "Sponsor 4",
    website: "https://example.com",
    position: { x: 15, y: 45, width: 20, height: 15 }
  },
  {
    id: 5,
    name: "Sponsor 5",
    website: "https://example.com",
    position: { x: 40, y: 45, width: 20, height: 15 }
  },
  {
    id: 6,
    name: "Sponsor 6",
    website: "https://example.com",
    position: { x: 65, y: 45, width: 20, height: 15 }
  }
];
