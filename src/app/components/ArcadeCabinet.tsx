import React from 'react';
import { LucideIcon } from 'lucide-react';
import arcadeImg from '../../assets/arcade_no_bg.png';

interface ArcadeCabinetProps {
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    color?: 'red' | 'blue' | 'green' | 'purple' | 'orange';
    stats?: { label: string; value: string }[];
    onRegister?: () => void;
}

const ArcadeCabinet = ({ title, subtitle, icon: Icon, color = "red", stats, onRegister }: ArcadeCabinetProps) => {
    // Defines the glow color based on the prop
    const textGlow = color === 'red' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' :
        color === 'blue' ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' :
            color === 'green' ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' :
                color === 'purple' ? 'text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' :
                    'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]';

    const borderGlow = color === 'red' ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8),inset_0_0_10px_rgba(239,68,68,0.5)]' :
        color === 'blue' ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8),inset_0_0_10px_rgba(59,130,246,0.5)]' :
            color === 'green' ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8),inset_0_0_10px_rgba(34,197,94,0.5)]' :
                color === 'purple' ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8),inset_0_0_10px_rgba(168,85,247,0.5)]' :
                    'border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8),inset_0_0_10px_rgba(249,115,22,0.5)]';

    const bgGradient = color === 'red' ? 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,rgba(0,0,0,1)_70%)]' :
        color === 'blue' ? 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,rgba(0,0,0,1)_70%)]' :
            color === 'green' ? 'bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,rgba(0,0,0,1)_70%)]' :
                color === 'purple' ? 'bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,rgba(0,0,0,1)_70%)]' :
                    'bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,rgba(0,0,0,1)_70%)]';

    return (
        <div className="relative w-full mx-auto group cursor-pointer hover:scale-105 transition-transform duration-300 touch-manipulation">
            {/* Cropped Cabinet Container */}
            <div className={`aspect-[9/13] w-full overflow-hidden relative rounded-xl ${bgGradient}`}>
                <img src={arcadeImg} alt="Arcade Cabinet" className="w-full h-full object-cover drop-shadow-3xl scale-125" />

                {/* Marquee Title (Top) */}
                <div className="absolute top-[2%] left-[6%] right-[6%] h-[14%] flex flex-col items-center justify-center text-center leading-none z-20">
                    <h3 className={`uppercase tracking-wider ${textGlow} text-[0.7rem] md:text-[0.9rem] drop-shadow-[0_0_12px_currentColor] mb-1 leading-tighter`}>
                        {title}
                    </h3>
                    {subtitle && (
                        <span className={`uppercase tracking-wide text-[0.45rem] md:text-[0.55rem] text-white/90 drop-shadow-md`}>{subtitle}</span>
                    )}
                </div>

                {/* Screen Area (Center) */}
                <div className="absolute top-[28%] left-[17%] right-[17%] h-[28%] flex flex-col items-center justify-center p-2 rounded-lg overflow-hidden bg-black/40">
                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-0 opacity-40"></div>

                    {/* Default State: Large Icon */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                        <Icon size={36} className={`${textGlow} opacity-90`} />
                    </div>

                    {/* Hover State: Stats Grid */}
                    {stats && (
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                            <div className="flex gap-2 items-center mb-1">
                                <Icon size={12} className={textGlow} />
                                <span className="text-[8px] text-white/90 tracking-widest">STATS</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full px-1">
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center bg-black/80 rounded p-1 border border-white/10 shadow-[inner_0_0_5px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                                        <span className={`text-[9px] md:text-[10px] ${textGlow} filter brightness-125 leading-tight`}>{stat.value}</span>
                                        <span className="text-[5px] md:text-[6px] text-gray-400 uppercase mt-0.5 leading-none">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Register "Neon Sign" Button (Bottom) */}
                <div className="absolute bottom-[3%] left-[14%] right-[14%] h-[10%] flex justify-center items-center z-20">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onRegister) onRegister();
                        }}
                        className={`w-full h-full border-[3px] ${borderGlow} bg-black/60 text-white font-bold uppercase tracking-[0.35em] text-[0.7rem] md:text-[0.85rem] rounded-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 ${textGlow} shadow-[0_0_35px_rgba(0,0,0,0.9)]`}
                    >
                        REGISTER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArcadeCabinet;