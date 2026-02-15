import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ArcadeEventCardProps {
  title: string;
  subtitle: string;
  accentColor: 'purple' | 'pink' | 'red' | 'green' | 'cyan' | 'orange';
  imageSrc: string;
  stats?: { label: string; value: string }[];
  onRegister?: () => void;
  index?: number;
  icon?: LucideIcon;
}

const borderGlowClasses = {
  purple: 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4),inset_0_0_10px_rgba(168,85,247,0.5)]',
  pink: 'border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.4),inset_0_0_10px_rgba(236,72,153,0.5)]',
  red: 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4),inset_0_0_10px_rgba(239,68,68,0.5)]',
  green: 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.4),inset_0_0_10px_rgba(34,197,94,0.5)]',
  cyan: 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4),inset_0_0_10px_rgba(6,182,212,0.5)]',
  orange: 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.4),inset_0_0_10px_rgba(249,115,22,0.5)]',
};

const textColorClasses = {
  purple: 'text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
  pink: 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]',
  red: 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]',
  green: 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]',
  cyan: 'text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]',
  orange: 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]',
};

const bgGradientClasses = {
  purple: 'bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,rgba(0,0,0,1)_70%)]',
  pink: 'bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,rgba(0,0,0,1)_70%)]',
  red: 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,rgba(0,0,0,1)_70%)]',
  green: 'bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,rgba(0,0,0,1)_70%)]',
  cyan: 'bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,rgba(0,0,0,1)_70%)]',
  orange: 'bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,rgba(0,0,0,1)_70%)]',
};

export function ArcadeEventCard({ 
  title, 
  subtitle, 
  accentColor, 
  imageSrc, 
  stats, 
  onRegister, 
  index = 0,
  icon: Icon
}: ArcadeEventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.5 + index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4 }}
      className={`
        relative overflow-hidden
        bg-black/40 backdrop-blur-sm
        border-2 rounded-lg
        p-4 md:p-5
        transition-all duration-300
        w-full min-h-[180px] md:min-h-[200px] lg:min-h-[220px]
        ${borderGlowClasses[accentColor]}
        ${bgGradientClasses[accentColor]}
      `}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Arcade Machine Image */}
        <motion.div 
          className="flex-shrink-0 w-28 md:w-32 lg:w-36"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-auto object-contain drop-shadow-2xl max-h-[140px] md:max-h-[160px] lg:max-h-[180px]"
            style={{
              filter: `drop-shadow(0 0 15px currentColor)`,
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col items-center gap-2 text-center w-full">
          <div className="w-full">
            <h3 className={`font-bold text-sm md:text-base lg:text-lg tracking-wider uppercase ${textColorClasses[accentColor]} leading-tight`}
                style={{ fontFamily: "'ITC Benguiat', 'Georgia', 'serif'" }}>
              {title}
            </h3>
            <p className={`text-sm md:text-base tracking-wide ${textColorClasses[accentColor]} opacity-90 leading-tight mt-1`}>
              {subtitle}
            </p>
          </div>
          
          {/* Stats Display */}
          {stats && (
            <div className="flex gap-4 md:gap-6 text-sm md:text-base">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className={`font-bold ${textColorClasses[accentColor]}`}>
                    {stat.value}
                  </span>
                  <span className="text-gray-400 uppercase text-xs md:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRegister}
            className={`
              px-6 py-2 md:px-7 md:py-2.5
              border-2 
              rounded 
              text-xs md:text-sm font-semibold tracking-widest uppercase
              transition-all duration-300
              ${borderGlowClasses[accentColor]}
              ${textColorClasses[accentColor]}
              hover:bg-current hover:text-black
              whitespace-nowrap
            `}
          >
            VIEW EVENTS
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}