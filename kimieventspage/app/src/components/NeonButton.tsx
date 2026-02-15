import { motion } from 'framer-motion';
import type { NeonColor } from '@/types';

interface NeonButtonProps {
  children: React.ReactNode;
  color: NeonColor;
  onClick?: () => void;
  className?: string;
}

const buttonClasses: Record<NeonColor, string> = {
  purple: 'btn-neon-purple border-purple-500 text-purple-500',
  pink: 'btn-neon-pink border-pink-500 text-pink-500',
  red: 'btn-neon-red border-orange-500 text-orange-500',
  green: 'btn-neon-green border-green-500 text-green-500',
  cyan: 'btn-neon-cyan border-cyan-500 text-cyan-500',
  orange: 'btn-neon-orange border-orange-500 text-orange-500',
};

export function NeonButton({ children, color, onClick, className = '' }: NeonButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-6 py-2 
        border-2 
        rounded 
        text-xs font-semibold tracking-widest uppercase
        transition-all duration-300
        ${buttonClasses[color]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
