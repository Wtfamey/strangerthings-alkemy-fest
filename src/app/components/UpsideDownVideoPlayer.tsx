import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface UpsideDownVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpsideDownVideoPlayer({ isOpen, onClose }: UpsideDownVideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      setIsLoading(true);
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setIsLoading(false);
        video.play().catch(err => {
          console.error('Video play failed:', err);
          setIsLoading(false);
        });
        setIsPlaying(true);
      };

      const handleLoadStart = () => {
        setIsLoading(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadstart', handleLoadStart);
      
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadstart', handleLoadStart);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsLoading(false);
    onClose();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const downloadSchedule = () => {
    // Create a sample event schedule PDF download
    const scheduleData = `
STRANGER THINGS 2026 - EVENT SCHEDULE

TECHNICAL EVENTS
• Code Demogorgon (Hackathon) - March 20, 2024
• Mind Flayer Quiz (Technical Quiz) - March 21, 2024  
• Hawkins AV Club (Robotics Workshop) - March 22, 2024

E-SPORTS TOURNAMENTS
• Madmax's Club (Gaming Tournament) - March 23, 2024
• Demogorgon Rush (Speedrun Challenge) - March 24, 2024
• Dimension C-137 (VR Championship) - March 25, 2024

SPORTS EVENTS
• Basketball Championship - March 26, 2024
• Football League - March 27, 2024
• Athletics Meet - March 28, 2024

CULTURAL EVENTS
• Mike & Eleven's Jam (Music Competition) - March 29, 2024
• Demobat Design (Art Exhibition) - March 30, 2024
• Drama Club (Theater Performance) - March 31, 2024

For more details, visit: strangerthings2026.com
    `;

    const blob = new Blob([scheduleData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stranger-things-2026-event-schedule.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Video Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Mobile: Full screen, Tablet/Desktop: Scaled */}
            <div className="w-full h-full max-w-[100vw] max-h-[100vh] md:max-w-[90vw] md:max-h-[90vh] lg:max-w-[85vw] lg:max-h-[85vh]">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                playsInline
                muted={isMuted}
                controls={false}
                preload="metadata"
              >
                <source src="/strangerthingsvedio.MOV" type="video/mp4" />
                <source src="/strangerthingsvedio.MOV" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Overlay Controls */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex justify-between items-start pointer-events-auto">
              <div className="flex gap-2 sm:gap-3">
                {/* Mute/Unmute Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="bg-black/60 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full border border-red-500/30 hover:bg-red-900/40 transition-all duration-300"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </motion.button>
              </div>

              {/* Exit Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="bg-black/60 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full border border-red-500/30 hover:bg-red-900/40 transition-all duration-300"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex justify-center items-center pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadSchedule}
                className="bg-red-600/80 backdrop-blur-sm hover:bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full border-2 border-red-500/50 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Download Event Schedule</span>
                <span className="xs:hidden">Schedule</span>
              </motion.button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="text-red-500 text-base sm:text-lg md:text-xl font-bold animate-pulse text-center">
                <div className="mb-2">Loading Upside Down...</div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
