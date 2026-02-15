import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

interface NavbarProps {
  isUpsideDown: boolean;
  onToggleUpsideDown: (value: boolean) => void;
}

const navItems = ['HOME', 'EVENTS', 'ABOUT', 'SPONSORS', 'CONTACT'];

export function Navbar({ isUpsideDown, onToggleUpsideDown }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-bg-primary/95 backdrop-blur-md border-b border-neon-red/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="font-benguiat text-xl md:text-2xl neon-text-red tracking-wider cursor-pointer hover:scale-105 transition-transform">
              ALCHEMY FEST
            </h1>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className="relative text-sm font-semibold tracking-wider text-white/80 hover:text-neon-red transition-colors duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-neon-red transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </motion.a>
            ))}
          </div>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-semibold tracking-wider text-white/80 hidden sm:block">
              FLIP TO UPSIDE DOWN
            </span>
            <Switch
              checked={isUpsideDown}
              onCheckedChange={onToggleUpsideDown}
              className="data-[state=checked]:bg-neon-red"
            />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
