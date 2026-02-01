import { motion } from 'motion/react';

interface VintageTVProps {
    label?: string;
    color?: string;
    delay?: number;
    size?: "md" | "lg";
    rotation?: string;
}

export function VintageTV({ label = "NO SIGNAL", color = "cyan", delay = 0, size = "md", rotation = "0deg" }: VintageTVProps) {

    // Size classes
    const sizeClasses = size === 'lg' ? 'w-80 h-64' : 'w-64 h-48';

    // Color mapping - keeping Tailwind classes explicit for JIT
    const colorStyles: Record<string, { shadow: string, text: string, bg: string, gradient: string, hex: string }> = {
        red: {
            shadow: 'shadow-[0_0_5px_#ff0900,0_0_20px_#ff0900,0_0_50px_#ff0900]',
            text: 'text-red-500',
            bg: 'bg-red-500',
            gradient: 'from-red-400 to-red-200',
            hex: '#ff0900'
        },
        purple: {
            shadow: 'shadow-[0_0_30px_#a855f7]',
            text: 'text-purple-400',
            bg: 'bg-purple-500',
            gradient: 'from-purple-400 to-purple-200',
            hex: '#a855f7'
        },
        cyan: {
            shadow: 'shadow-[0_0_5px_#00f3ff,0_0_20px_#00f3ff,0_0_50px_#00f3ff]',
            text: 'text-cyan-400',
            bg: 'bg-cyan-500',
            gradient: 'from-cyan-400 to-cyan-200',
            hex: '#00f3ff'
        },
        blue: {
            shadow: 'shadow-[0_0_5px_#00f3ff,0_0_20px_#00f3ff,0_0_50px_#00f3ff]',
            text: 'text-cyan-400',
            bg: 'bg-cyan-500',
            gradient: 'from-cyan-400 to-cyan-200',
            hex: '#00f3ff'
        },
        orange: {
            shadow: 'shadow-[0_0_30px_#f97316]',
            text: 'text-orange-400',
            bg: 'bg-orange-500',
            gradient: 'from-orange-400 to-orange-200',
            hex: '#f97316'
        },
        yellow: {
            shadow: 'shadow-[0_0_30px_#eab308]',
            text: 'text-yellow-400',
            bg: 'bg-yellow-500',
            gradient: 'from-yellow-400 to-yellow-200',
            hex: '#eab308'
        },
        green: {
            shadow: 'shadow-[0_0_30px_#22c55e]',
            text: 'text-green-400',
            bg: 'bg-green-500',
            gradient: 'from-green-400 to-green-200',
            hex: '#22c55e'
        }
    };

    const style = colorStyles[color] || colorStyles.cyan;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay, duration: 0.5 }}
            className={`relative group ${sizeClasses} mx-auto z-10`}
            style={{ transform: `rotate(${rotation})` }}
        >
            {/* TV Casing (The Box) */}
            <div className="bg-neutral-900 rounded-2xl p-4 border-t border-l border-neutral-700 shadow-2xl h-full flex flex-col relative overflow-hidden">

                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-neutral-900 rounded-2xl opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]"></div>

                {/* The Screen Container */}
                <div className="flex-1 bg-black rounded-xl overflow-hidden relative border-4 border-neutral-800 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">

                    {/* CRT Scanline Effect Overlay */}
                    <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-60"></div>

                    {/* Glass Reflection */}
                    <div className="absolute inset-0 z-30 bg-gradient-to-br from-white/10 to-transparent opacity-40 rounded-xl pointer-events-none"></div>

                    {/* The Glowing Screen Content */}
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        {/* Inner Glow */}
                        <div className={`absolute w-3/4 h-3/4 ${style.bg} blur-[50px] opacity-30`} />

                        {/* Sponsor Text/Logo */}
                        <h3
                            className={`text-3xl font-bold text-center px-4 ${style.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10`}
                            style={{
                                textShadow: `0 0 15px ${style.hex}`,
                            }}
                        >
                            {label}
                        </h3>
                    </div>
                </div>

                {/* TV Controls (Side Panel) - Adjusted positioning */}
                <div className="absolute right-[-12px] top-8 flex flex-col gap-2 bg-neutral-800 p-1 rounded-r shadow-lg border-l border-black w-4 z-0">
                    <div className="w-2 h-2 rounded-full bg-neutral-600 shadow-inner" />
                    <div className="w-2 h-2 rounded-full bg-neutral-600 shadow-inner" />
                </div>
            </div>
        </motion.div>
    );
}
