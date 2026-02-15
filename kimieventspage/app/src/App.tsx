import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { GlitchBackground } from '@/components/GlitchBackground';
import { NeonTitle } from '@/components/NeonTitle';
import { EventsGrid } from '@/components/EventsGrid';
import './App.css';

function App() {
  const [isUpsideDown, setIsUpsideDown] = useState(false);

  return (
    <div 
      className={`relative min-h-screen transition-transform duration-1000 ${
        isUpsideDown ? 'rotate-180' : ''
      }`}
    >
      {/* Background Effects */}
      <GlitchBackground />
      
      {/* Navigation */}
      <Navbar 
        isUpsideDown={isUpsideDown} 
        onToggleUpsideDown={setIsUpsideDown} 
      />
      
      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16">
        {/* Events Title Section */}
        <section className="py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NeonTitle text="EVENTS" color="red" />
          </motion.div>
        </section>
        
        {/* Events Grid Section */}
        <section className="py-8 md:py-12">
          <EventsGrid />
        </section>
      </main>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="relative z-10 py-8 text-center"
      >
        <div className="flex justify-center items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
          <span className="text-white/40 text-xs tracking-wider">
            ALCHEMY FEST 2024
          </span>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
