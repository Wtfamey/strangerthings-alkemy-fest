import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingParticles } from '../components/FloatingParticles';

const categories = ['technology', 'gaming', 'music', 'sports', 'neon'];

const sponsors = [
  {
    tier: 'PLATINUM',
    color: '#9B5DE5',
    glowColor: 'hsla(265, 75%, 67%, 0.6)',
    companies: [
      { name: 'TechCorp', category: 'technology', website: 'https://techcorp.example.com' },
      { name: 'InnovateLabs', category: 'technology', website: 'https://innovatelabs.example.com' },
    ],
  },
  {
    tier: 'GOLD',
    color: '#FF2B2B',
    glowColor: 'hsla(0, 100%, 56%, 0.6)',
    companies: [
      { name: 'FutureTech', category: 'gaming', website: 'https://futuretech.example.com' },
      { name: 'CyberNet', category: 'neon', website: 'https://cybernet.example.com' },
      { name: 'QuantumAI', category: 'technology', website: 'https://quantumai.example.com' },
    ],
  },
  {
    tier: 'SILVER',
    color: '#00F5D4',
    glowColor: 'hsla(168, 100%, 48%, 0.6)',
    companies: [
      { name: 'DevHub', category: 'music', website: 'https://devhub.example.com' },
      { name: 'CodeBase', category: 'technology', website: 'https://codebase.example.com' },
      { name: 'ByteWorks', category: 'gaming', website: 'https://byteworks.example.com' },
      { name: 'DataFlow', category: 'sports', website: 'https://dataflow.example.com' },
    ],
  },
];

const tierColors: Record<string, { text: string; border: string; glow: string }> = {
  PLATINUM: { text: 'text-purple-400', border: 'border-purple-400', glow: 'shadow-purple-500' },
  GOLD: { text: 'text-red-500', border: 'border-red-500', glow: 'shadow-red-500' },
  SILVER: { text: 'text-cyan-400', border: 'border-cyan-400', glow: 'shadow-cyan-500' },
};

export function SponsorsPage() {
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  // Flatten all sponsors
  const allSponsors = sponsors.flatMap(tier => tier.companies);

  // Auto-rotate sponsors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex(prev => (prev + 1) % allSponsors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allSponsors.length]);

  return (
    <div className="relative min-h-screen bg-[#050510]">
      {/* Header */}
      <Header onFlip={() => {}} />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0505_0%,#000000_100%)] opacity-80"></div>
        <div className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#2a0a0a] via-transparent to-transparent opacity-40 blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 opacity-60">
        <FloatingParticles />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-500 mb-4 tracking-wider"
              style={{
                textShadow: '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.4)',
                letterSpacing: '0.05em'
              }}
            >
              SPONSORS
            </h2>
            <div className="flex justify-center mt-4">
              <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            </div>
            <p className="text-sm text-gray-400 mt-4 tracking-widest uppercase font-mono">
              [ POWERED BY THE BEST ]
            </p>
          </motion.div>

          {/* Sponsor Tiers */}
          {sponsors.map((tier, tierIndex) => {
            const colors = tierColors[tier.tier];
            return (
              <motion.section
                key={tier.tier}
                className="mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tierIndex * 0.1 }}
              >
                {/* Tier Title */}
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`text-2xl md:text-3xl ${colors.text} tracking-widest font-bold mb-2`}
                    style={{
                      textShadow: `0 0 15px ${tier.color}, 0 0 30px ${tier.color}`,
                      letterSpacing: '0.05em'
                    }}
                  >
                    {tier.tier} SPONSORS
                  </h3>
                  <div className={`w-32 h-px ${colors.border} mx-auto opacity-50`}></div>
                </motion.div>

                {/* Sponsor Grid */}
                <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
                  {tier.companies.map((company, companyIndex) => (
                    <RetroTV 
                      key={company.name}
                      company={company}
                      color={tier.color}
                      glowColor={tier.glowColor}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}

          {/* Rolling Sponsor TV */}
          <motion.section
            className="my-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl text-red-500 tracking-widest font-bold mb-2"
                style={{
                  textShadow: '0 0 15px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.4)',
                  letterSpacing: '0.05em'
                }}
              >
                FEATURED SPONSOR
              </h3>
              <div className="w-32 h-px bg-red-500/50 mx-auto"></div>
            </motion.div>

            {/* Rolling TV */}
            <div className="flex justify-center">
              <motion.div
                key={currentSponsorIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <RetroTV 
                  company={allSponsors[currentSponsorIndex]}
                  color="#FF2B2B"
                  glowColor="hsla(0, 100%, 56%, 0.6)"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#0a0e1a] border border-red-900/30 p-8 md:p-12 max-w-2xl mx-auto rounded-lg">
              <h3 className="text-3xl md:text-4xl text-purple-400 mb-4 font-bold tracking-wider"
                style={{
                  textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)',
                  letterSpacing: '0.05em'
                }}
              >
                BECOME A SPONSOR
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Partner with ALKEMY FEST and reach thousands of passionate students and tech enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/sponsorship-proposal.txt"
                  download="alkemy-sponsorship-proposal.txt"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  DOWNLOAD PROPOSAL
                </a>
                <a
                  href="mailto:sponsors@alkemyfest.com"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  CONTACT US
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const RetroTV = ({ company, color, glowColor }: { company: { name: string; category: string; website: string }; color: string; glowColor: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const unsplashUrl = `https://source.unsplash.com/600x400/?${company.category}&sig=${company.name}`;
  const fallbackUrl = `https://via.placeholder.com/600x400/0b1026/${color.slice(1)}?text=${company.name}`;

  const handleClick = () => {
    window.open(company.website, '_blank');
  };

  return (
    <motion.div
      className="relative w-[320px] mx-auto cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08 }}
      onClick={handleClick}
    >
      {/* Glow */}
      <div
        className="absolute inset-6 rounded-2xl blur-2xl opacity-80 -z-10 transition-all duration-300 hover:blur-xl"
        style={{ backgroundColor: glowColor }}
      />

      {/* TV Container */}
      <div className="relative flex flex-col items-center justify-center">

        {/* SCREEN CONTENT */}
        <div
          className="absolute"
          style={{
            top: "12%",
            left: "18%",
            width: "55%",
            height: "60%",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: `0 0 30px ${glowColor}, inset 0 0 20px ${glowColor}`,
            border: `2px solid ${color}`,
          }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 z-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Loading */}
          {isLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-full h-full bg-gray-800 animate-pulse"></div>
            </div>
          )}

          {/* Image */}
          <img
            src={imageError ? fallbackUrl : unsplashUrl}
            alt={company.name}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Flicker Line */}
          <motion.div
            className="absolute left-0 w-full h-[2px] z-30"
            style={{ backgroundColor: color, opacity: 0.8 }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* TV Frame - Simple SVG representation */}
        <div className="relative w-full">
          <svg viewBox="0 0 300 250" className="w-full h-auto">
            {/* TV Frame */}
            <rect x="10" y="10" width="280" height="180" rx="15" fill="#1a1a1a" stroke={color} strokeWidth="3"/>
            {/* Screen */}
            <rect x="20" y="20" width="260" height="160" rx="8" fill="#000" stroke={color} strokeWidth="2"/>
            {/* Stand */}
            <rect x="140" y="190" width="20" height="40" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            <rect x="120" y="230" width="60" height="10" rx="5" fill="#1a1a1a" stroke={color} strokeWidth="2"/>
            {/* Speakers */}
            <circle cx="25" cy="200" r="8" fill="#333" stroke={color} strokeWidth="1"/>
            <circle cx="275" cy="200" r="8" fill="#333" stroke={color} strokeWidth="1"/>
            <circle cx="25" cy="220" r="8" fill="#333" stroke={color} strokeWidth="1"/>
            <circle cx="275" cy="220" r="8" fill="#333" stroke={color} strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Company Name */}
      <p
        className="text-center mt-6 text-base md:text-lg font-bold tracking-widest uppercase hover:opacity-80 transition-all"
        style={{ color }}
      >
        {company.name}
      </p>
    </motion.div>
  );
};
