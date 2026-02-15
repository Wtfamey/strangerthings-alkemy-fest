import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function AboutPage() {
    const [typedText, setTypedText] = useState('');
    const fullText = `> INITIATING 'ALKEMY_INITIATIVE.LOG'...
> 
> ALKEMY FEST IS THE ANNUAL FUSION OF
  TECHNOLOGY AND CREATIVITY, A PORTAL TO
  THE EXTRAORDINARY. BORN FROM THE MINDS
  AT HAWKINS, IT UNITES INNOVATORS AND
  DREAMERS. OUR MISSION: TO EXPLORE THE
  UPSIDE DOWN OF POSSIBILITIES.
> 
> -- THE ALKEMY TEAM, HAWKINS, IN
> 
> CLEARANCE LEVEL: TOP SECRET [CLASSIFIED]
> █`;

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 30); // Typing speed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center relative overscroll-none">

            {/* Neon Title */}
            <div className="relative mb-12 transform hover:scale-105 transition-transform duration-500 z-10">
                <h1 className="text-7xl font-bold text-transparent text-center tracking-widest stroke-red-600"
                    style={{
                        fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                        WebkitTextStroke: '2px #ef4444',
                        textShadow: "0 0 10px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4)"
                    }}>
                    ABOUT
                </h1>
                <div className="h-1 w-full bg-red-600 shadow-[0_0_20px_#ef4444] mt-2 rounded-full"></div>
            </div>

            {/* The Terminal Monitor Container */}
            <div className="relative w-full max-w-4xl aspect-[4/3] bg-[#e0e0e0] p-6 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-b-[16px] border-[#c0c0c0] flex items-center justify-center">

                {/* Monitor Casing Texture */}
                <div className="absolute inset-0 bg-[#d4d4d4] rounded-[2rem] pointer-events-none"></div>
                {/* Vintage Beige Plastic Look */}
                <div className="absolute inset-0 bg-[#d8d3c5] rounded-[2rem] opacity-90 pointer-events-none border-t-2 border-white/50 border-b-8 border-black/10"></div>

                {/* Inner Bezel */}
                <div className="relative w-full h-full bg-[#111] rounded-[2rem] p-8 shadow-[inset_0_0_20px_black] border-[3px] border-[#333]">

                    {/* The Screen */}
                    <div className="w-full h-full bg-[#051105] rounded-xl relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)] border border-[#333]">

                        {/* CRT Effects */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-20 opacity-40"></div>
                        <div className="absolute inset-0 bg-radial-gradient(circle, transparent 50%, black 150%) pointer-events-none z-20 opacity-60"></div>

                        {/* Screen Glow */}
                        <div className="absolute inset-0 bg-green-500/5 blur-[100px] pointer-events-none z-10"></div>

                        {/* Text Content */}
                        <div className="relative z-10 p-6 md:p-12 font-mono text-green-500 text-lg md:text-xl leading-relaxed whitespace-pre-wrap h-full overflow-hidden"
                            style={{
                                textShadow: "0 0 8px rgba(34, 197, 94, 0.8)",
                            }}>
                            {typedText}
                        </div>
                    </div>
                </div>

                {/* Power LED */}
                <div className="absolute bottom-6 right-16 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] animate-pulse"></div>

                {/* Speaker Grills */}
                <div className="absolute bottom-6 left-16 flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="w-1 h-4 bg-[#333] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
                    ))}
                </div>
            </div>

            {/* Desk Surface (implied) */}
            <div className="absolute bottom-0 w-full h-1/4 bg-neutral-900 -z-10 shadow-[inner_0_10px_50px_black]"></div>
        </div>
    );
}
