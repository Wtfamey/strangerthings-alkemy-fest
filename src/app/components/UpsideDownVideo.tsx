import React, { useState, useRef, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface UpsideDownVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpsideDownVideo({ isOpen, onClose }: UpsideDownVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadSchedule = () => {
    const link = document.createElement('a');
    link.href = '/schedule.txt';
    link.download = 'stranger-things-schedule.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Video Container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[70vh] object-contain"
          >
            <source src="/videos/upsidedown.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Download Button Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex justify-center">
              <button
                onClick={handleDownloadSchedule}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              >
                <Download size={20} />
                <span className="font-bold tracking-wider">DOWNLOAD EVENT SCHEDULE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-4 text-red-400">
          <p className="text-sm">Press ESC or click X to close</p>
        </div>
      </div>
    </div>
  );
}
