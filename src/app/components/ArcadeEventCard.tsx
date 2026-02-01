import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ArcadeEventCardProps {
  title: string;
  icon: LucideIcon;
  color: 'cyan' | 'pink' | 'purple';
  image: string;
  index: number;
}

export function ArcadeEventCard({ title, icon: Icon, color, image, index }: ArcadeEventCardProps) {
  // Using fixed red/blue neon colors to match reference
  const neonBorder = 'border-red-500';
  const neonGlow = 'shadow-[0_0_15px_rgba(220,38,38,0.5),inset_0_0_15px_rgba(220,38,38,0.2)]';
  const cabinetColor = 'border-cyan-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative pb-8"
    >
      {/* Outer Neon Border Frame */}
      <div className={`absolute inset-0 border-2 ${neonBorder} rounded-lg ${neonGlow} z-0 opacity-80`}></div>

      {/* Arcade Cabinet Container */}
      <div className="relative z-10 p-6 flex flex-col items-center h-full">

        {/* Cabinet Body Top */}
        <div className="w-full relative bg-gray-900 border-2 border-cyan-400 rounded-t-xl pt-4 px-4 pb-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">

          {/* MARQUEE / Header */}
          <div className="bg-red-900/40 border border-red-500/50 p-2 mb-4 rounded text-center shadow-[inset_0_0_10px_rgba(220,38,38,0.3)]">
            <h3 className="text-red-100 font-bold tracking-widest text-sm uppercase leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', textShadow: '0 0 5px rgba(220,38,38,0.8)' }}>
              {title}
            </h3>
          </div>

          {/* Cabinet Screen Area */}
          <div className="bg-gray-800 p-3 rounded-lg border border-cyan-500/50 mb-4 relative overflow-hidden">
            {/* Screen Inner */}
            <div className="bg-black aspect-square rounded border border-gray-700 relative flex items-center justify-center overflow-hidden">
              {/* Icon Display */}
              <Icon className="w-24 h-24 text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" strokeWidth={1} />

              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }}>
              </div>
            </div>
          </div>

          {/* Controls Deck */}
          <div className="bg-gray-800 border-t border-cyan-500/50 p-3 rounded-b-lg">
            <div className="flex justify-center gap-6 mb-4">
              {/* Joysticks */}
              <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_red]">
                <div className="w-1 h-6 bg-gray-400 mx-auto mt-2"></div>
              </div>
              <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_red]">
                <div className="w-1 h-6 bg-gray-400 mx-auto mt-2"></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            </div>

            {/* REGISTER Button */}
            <div className="text-center">
              <button className="px-6 py-1 border-2 border-red-500 bg-black/50 text-red-500 hover:bg-red-900/30 transition-all duration-300 rounded-sm">
                <span className="font-bold tracking-widest text-lg"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    textShadow: '0 0 5px rgba(220,38,38,0.8)'
                  }}>
                  REGISTER
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Cabinet Bottom / Legs */}
        <div className="w-[90%] h-4 bg-gray-900 border-x-2 border-b-2 border-cyan-400 rounded-b-lg mx-auto mb-2 opacity-80"></div>

      </div>
    </motion.div>
  );
}