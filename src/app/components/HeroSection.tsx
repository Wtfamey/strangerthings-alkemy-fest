import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FloatingParticles } from './FloatingParticles';

interface Particle {
    id: number;
    left: string;
    delay: string;
    duration: string;
}

export function HeroSection() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const particleCount = 20;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + 'vw',
            delay: Math.random() * 5 + 's',
            duration: Math.random() * 5 + 5 + 's'
        }));
        setParticles(newParticles);
    }, []);

    const handleFlip = () => {
        const newState = !isFlipped;
        setIsFlipped(newState);
        if (newState) {
            setShowVideo(true);
        } else {
            setShowVideo(false);
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050510]">
            {/* Background Atmosphere - Cinematic Depth */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0505_0%,#000000_100%)] opacity-80"></div>
                {/* Smoky Fog at bottom */}
                <div className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#2a0a0a] via-transparent to-transparent opacity-40 blur-3xl"></div>
                {/* Grain Texture */}
                <div className="absolute inset-0 opacity-25 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 opacity-60">
                <FloatingParticles />
            </div>

            {/* Additional Ember Particles */}
            <div className="particles-container">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: p.left,
                            animationDelay: p.delay,
                            animationDuration: p.duration
                        }}
                    ></div>
                ))}
            </div>

            {/* Video Overlay - Shows when flipped */}
            {showVideo && (
                <div className="absolute inset-0 z-20 bg-black/90 flex items-center justify-center">
                    <div className="relative w-full max-w-4xl mx-4">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors z-30"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Video Placeholder */}
                        <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-red-500 text-6xl mb-4">▶</div>
                                    <p className="text-white text-xl">Stranger Things Event Video</p>
                                    <p className="text-gray-400 mt-2">Video will play here</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Download Schedule Button */}
                        <div className="text-center mt-6">
                            <a
                                href="/schedule.txt"
                                download="alkemy-event-schedule.txt"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Event Schedule
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-full">

                {/* THE TITLE LOCKUP - Exact Alkemy Version */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="flex flex-col items-center mb-8 relative"
                >

                    {/* Top Neon Bar - From Alkemy Version */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "90%" }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="h-1.5 md:h-2 bg-transparent border-2 border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5),0_0_20px_rgba(239,68,68,0.3),inset_0_0_5px_rgba(239,68,68,0.5),inset_0_0_10px_rgba(239,68,68,0.3)] rounded-full mb-2 md:mb-0"
                    ></motion.div>

                    {/* ALKEMY - Exact styling from Alkemy Version */}
                    <div 
                        className="st-logo-container"
                        style={{
                            marginBottom: '50px',
                            position: 'relative',
                            display: 'inline-block'
                        }}
                    >
                        <div 
                            className="st-title"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                                fontSize: 'clamp(3.5rem, 18vw, 12rem)',
                                fontWeight: 900,
                                color: 'transparent',
                                WebkitTextStroke: 'clamp(1px, 0.2vw, 2px) #f56d6d',
                                filter: 'drop-shadow(0 0 2px #f56d6d) drop-shadow(0 0 8px #d10000) drop-shadow(0 0 20px #d10000)',
                                letterSpacing: 0,
                                lineHeight: 0.8,
                                padding: '0 10px',
                                width: '100%'
                            }}
                        >
                            <span 
                                className="st-letter large"
                                style={{
                                    fontSize: '1.28em',
                                    lineHeight: 0.7,
                                    marginRight: '-5px'
                                }}
                            >A</span>
                            <span 
                                className="st-letter"
                                style={{ marginRight: '0px' }}
                            >L</span>
                            <span 
                                className="st-letter"
                                style={{ marginRight: '-2px' }}
                            >K</span>
                            <span 
                                className="st-letter"
                                style={{ marginRight: '0px' }}
                            >E</span>
                            <span 
                                className="st-letter"
                                style={{ marginRight: '5px' }}
                            >M</span>
                            <span 
                                className="st-letter large"
                                style={{
                                    fontSize: '1.28em',
                                    lineHeight: 0.7
                                }}
                            >Y</span>
                        </div>

                        {/* Subtitle Container */}
                        <div 
                            className="st-subtitle-container"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginTop: '15px'
                            }}
                        >
                            <div 
                                className="st-line"
                                style={{
                                    height: '5px',
                                    background: 'transparent',
                                    border: '2px solid #f56d6d',
                                    boxShadow: '0 0 5px #f56d6d, 0 0 15px #d10000, inset 0 0 5px #f56d6d, inset 0 0 10px #d10000',
                                    width: '15%'
                                }}
                            ></div>
                            <div 
                                className="st-subtitle"
                                style={{
                                    fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                                    fontSize: 'clamp(0.7rem, 3vw, 1.8em)',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
                                    letterSpacing: '1px',
                                    whiteSpace: 'nowrap',
                                    padding: '0 10px'
                                }}
                            >THE UPSIDE DOWN OF COLLEGE FESTS</div>
                            <div 
                                className="st-line"
                                style={{
                                    height: '5px',
                                    background: 'transparent',
                                    border: '2px solid #f56d6d',
                                    boxShadow: '0 0 5px #f56d6d, 0 0 15px #d10000, inset 0 0 5px #f56d6d, inset 0 0 10px #d10000',
                                    width: '15%'
                                }}
                            ></div>
                        </div>
                    </div>
                </motion.div>

                {/* CALL TO ACTION BUTTONS - Original Version */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="flex flex-col md:flex-row gap-6 md:gap-12 items-center w-full justify-center"
                >

                    {/* LEFT BUTTON */}
                    <a href="#events" className="group flex flex-col items-center gap-1.5 cursor-pointer">
                        {/* Top Hollow Line */}
                        <div className="w-full h-0.5 md:h-1 bg-transparent border border-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)] rounded-full transition-all duration-300 group-hover:w-[120%] group-hover:shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>

                        <div className="flex flex-col items-center py-1">
                            <span className="text-xl md:text-3xl font-bold tracking-wider select-none transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    color: 'transparent',
                                    WebkitTextStroke: '0.6px #ef4444',
                                    filter: 'drop-shadow(0 0 3px rgba(239, 68, 68, 0.5))'
                                }}>
                                ENTER THE LAB
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                                {/* Flanking Left Hollow Line */}
                                <div className="h-0.5 w-12 bg-transparent border border-red-500/80 shadow-[0_0_4px_#ef4444] rounded-full"></div>
                                <span className="text-red-400 font-bold tracking-[0.15em] text-sm md:text-lg select-none"
                                    style={{ textShadow: "0 0 4px rgba(239,68,68,0.5)" }}>
                                    (EVENTS)
                                </span>
                                {/* Flanking Right Hollow Line */}
                                <div className="h-0.5 w-12 bg-transparent border border-red-500/80 shadow-[0_0_4px_#ef4444] rounded-full"></div>
                            </div>
                        </div>
                    </a>

                    {/* RIGHT BUTTON */}
                    <Link to="/register" className="group flex flex-col items-center gap-1.5 cursor-pointer">
                        {/* Top Hollow Line */}
                        <div className="w-full h-0.5 md:h-1 bg-transparent border border-purple-500/80 shadow-[0_0_6px_rgba(168,85,247,0.5)] rounded-full transition-all duration-300 group-hover:w-[120%] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>

                        <div className="flex flex-col items-center py-1">
                            <span className="text-xl md:text-3xl font-bold tracking-wider select-none transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    color: 'transparent',
                                    WebkitTextStroke: '0.6px #a855f7',
                                    filter: 'drop-shadow(0 0 3px rgba(168, 85, 247, 0.5))'
                                }}>
                                JOIN THE PARTY
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                                {/* Flanking Left Hollow Line */}
                                <div className="h-0.5 w-12 bg-transparent border border-purple-500/80 shadow-[0_0_4px_#a855f7] rounded-full"></div>
                                <span className="text-purple-400 font-bold tracking-[0.15em] text-sm md:text-lg select-none"
                                    style={{ textShadow: "0 0 4px rgba(168,85,247,0.5)" }}>
                                    (REGISTER)
                                </span>
                                {/* Flanking Right Hollow Line */}
                                <div className="h-0.5 w-12 bg-transparent border border-purple-500/80 shadow-[0_0_4px_#a855f7] rounded-full"></div>
                            </div>
                        </div>
                    </Link>

                </motion.div>
            </div>
        </section>
    );
}
