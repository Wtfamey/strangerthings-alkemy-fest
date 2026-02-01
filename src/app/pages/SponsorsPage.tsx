import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingParticles } from '../components/FloatingParticles';
import { TVFrameSponsors, defaultSponsors } from '../components/TVFrameSponsors';

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen bg-[#050510]">
      {/* Header */}
      <Header onFlip={() => {}} />
      
      {/* Background Effects */}
      <FloatingParticles />

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

          {/* TV Frame Sponsors Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TVFrameSponsors sponsors={defaultSponsors} />
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-400 mb-4">
              Want to become a sponsor? Join us in making this the best Stranger Things event ever!
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold tracking-wider transition-all transform hover:scale-105">
              BECOME A SPONSOR
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
