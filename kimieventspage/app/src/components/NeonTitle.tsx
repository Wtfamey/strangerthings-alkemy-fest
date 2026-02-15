import { motion } from 'framer-motion';

interface NeonTitleProps {
  text: string;
  color?: 'red' | 'purple' | 'pink' | 'cyan' | 'green' | 'orange';
}

const colorClasses = {
  red: 'neon-text-red',
  purple: 'neon-text-purple',
  pink: 'neon-text-pink',
  cyan: 'neon-text-cyan',
  green: 'neon-text-green',
  orange: 'neon-text-orange',
};

export function NeonTitle({ text, color = 'red' }: NeonTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1],
        delay: 0.3
      }}
      className={`font-benguiat text-4xl md:text-5xl lg:text-6xl text-center ${colorClasses[color]} animate-flicker`}
      style={{
        letterSpacing: '0.15em',
      }}
    >
      {text}
    </motion.h2>
  );
}
