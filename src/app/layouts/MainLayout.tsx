import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UpsideDownVideoPlayer } from '../components/UpsideDownVideoPlayer';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handleFlip = (flipped: boolean) => {
        setIsFlipped(flipped);
        if (flipped) {
            setShowVideo(true);
        }
    };

    return (
        <div
            className={`min-h-screen flex flex-col transition-all duration-1000 ${isFlipped ? 'bg-red-950' : 'bg-[#0a0e1a]'
                }`}
            style={{
                backgroundImage: isFlipped
                    ? 'radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 0, 0, 0.2) 0%, transparent 50%)'
                    : 'none'
            }}
        >
            <Header onFlip={handleFlip} />
            
            <UpsideDownVideoPlayer 
                isOpen={showVideo} 
                onClose={() => {
                    setShowVideo(false);
                    setIsFlipped(false);
                }} 
            />

            <main className="flex-1 pt-14 sm:pt-16 md:pt-18 lg:pt-20">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
