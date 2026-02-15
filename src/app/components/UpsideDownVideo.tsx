import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Maximize2 } from 'lucide-react';

interface UpsideDownVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpsideDownVideo({ isOpen, onClose }: UpsideDownVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Exit fullscreen first, then close modal
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Auto-enter fullscreen when video opens
      const timer = setTimeout(() => {
        if (videoRef.current && !document.fullscreenElement) {
          videoRef.current.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported:', err);
          });
        }
      }, 100);
      
      return () => {
        document.removeEventListener('keydown', handleEsc);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  const handleDownloadSchedule = () => {
    const link = document.createElement('a');
    link.href = '/schedule.txt';
    link.download = 'stranger-things-schedule.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && videoRef.current) {
      videoRef.current.requestFullscreen().catch(err => {
        console.log('Fullscreen not supported:', err);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Video Container - Fullscreen capable */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close Button - Top Right */}
        <button
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen().then(() => onClose());
            } else {
              onClose();
            }
          }}
          className="absolute top-4 right-4 z-10 bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Fullscreen Toggle Button - Top Left */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 z-10 bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors"
        >
          <Maximize2 size={24} />
        </button>

        {/* Video - Fullscreen */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
          style={{
            maxHeight: '100vh',
            maxWidth: '100vw'
          }}
        >
          <source src="/videos/upsidedown.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Download Button Overlay - Bottom Center */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
          <div className="flex justify-center">
            <button
              onClick={handleDownloadSchedule}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg text-lg font-bold tracking-wider"
            >
              <Download size={24} />
              <span>DOWNLOAD EVENT SCHEDULE</span>
            </button>
          </div>
          
          {/* Instructions */}
          <div className="text-center mt-4 text-red-400">
            <p className="text-sm">Press ESC to exit fullscreen • Click X to close</p>
          </div>
        </div>
      </div>
    </div>
  );
}
