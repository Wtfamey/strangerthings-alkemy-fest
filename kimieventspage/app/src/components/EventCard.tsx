import { motion } from 'framer-motion';
import type { EventData } from '@/types';
import { NeonButton } from './NeonButton';

interface EventCardProps {
  event: EventData;
  index: number;
}

const borderGlowClasses = {
  purple: 'neon-border-purple hover:neon-glow-purple',
  pink: 'neon-border-pink hover:neon-glow-pink',
  red: 'neon-border-orange hover:neon-glow-orange',
  green: 'neon-border-green hover:neon-glow-green',
  cyan: 'neon-border-cyan hover:neon-glow-cyan',
  orange: 'neon-border-orange hover:neon-glow-orange',
};

const textColorClasses = {
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  red: 'text-orange-500',
  green: 'text-green-500',
  cyan: 'text-cyan-500',
  orange: 'text-orange-500',
};

export function EventCard({ event, index }: EventCardProps) {
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
        bg-bg-secondary/80 backdrop-blur-sm
        border rounded-lg
        p-4 md:p-6
        transition-all duration-300
        ${borderGlowClasses[event.accentColor]}
      `}
    >
      <div className="flex items-center gap-4 md:gap-6">
        {/* Arcade Machine Image */}
        <motion.div 
          className="flex-shrink-0 w-24 md:w-32 lg:w-40"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={event.imageSrc}
            alt={event.title}
            className="w-full h-auto object-contain drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 0 10px currentColor)`,
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col items-start gap-3">
          <div>
            <h3 className={`font-inter font-bold text-sm md:text-base tracking-wider uppercase ${textColorClasses[event.accentColor]}`}>
              {event.title}
            </h3>
            <p className={`font-inter text-xs md:text-sm tracking-wide ${textColorClasses[event.accentColor]} opacity-80`}>
              {event.subtitle}
            </p>
          </div>
          
          <NeonButton color={event.accentColor}>
            REGISTER
          </NeonButton>
        </div>
      </div>
    </motion.div>
  );
}
