import { motion } from 'motion/react';
import { useState } from 'react';

export function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        frequency: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Transmission Sent:', formState);
        alert('Transmission Encrypted & Sent to Hawkins AV Club.');
    };

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center py-20 px-4">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial_gradient(circle_at_center,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%)]"></div>
                {/* Vines - Simplified SVG shapes or gradients */}
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-900/10 blur-[80px] rounded-full"></div>
                <div className="absolute top-20 right-20 w-32 h-32 bg-red-900/10 blur-[60px] rounded-full"></div>
            </div>

            {/* Neon Title */}
            <div className="relative z-10 mb-12 transform -rotate-1">
                <div className="border-[6px] border-red-600 rounded-xl px-12 py-2 shadow-[0_0_20px_rgba(220,38,38,0.6),inset_0_0_15px_rgba(220,38,38,0.6)] bg-black/50 backdrop-blur-sm">
                    <h1 className="text-7xl font-bold text-transparent text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] tracking-widest"
                        style={{ 
                            fontFamily: "'ITC Benguiat', 'Merriweather', serif",
                            textShadow: "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000" 
                        }}>
                        CONTACT
                    </h1>
                </div>
                {/* Wires hanging from sign */}
                <div className="absolute -top-20 left-10 w-1 h-20 bg-gray-800"></div>
                <div className="absolute -top-20 right-10 w-1 h-20 bg-gray-800"></div>
            </div>

            {/* The Hammer Radio Transmitter */}
            <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[2/1] bg-[#1a1815] rounded-lg border-4 border-[#2a2825] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden">

                {/* Wood Texture Overlay */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none mix-blend-overlay"></div>

                {/* Left Panel: Controls & Tubes */}
                <div className="w-full md:w-5/12 bg-[#252320]/90 p-8 border-b md:border-b-0 md:border-r border-[#3a3835] relative flex flex-col justify-between">
                    {/* Screw heads */}
                    <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#111] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>

                    {/* Microphone Graphic (Simplified CSS/SVG) */}
                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="w-24 h-40 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full border-4 border-gray-700 shadow-xl relative overflow-hidden">
                            {/* Mesh texture */}
                            <div className="absolute inset-0 bg-[radial_gradient(circle,bg-black_1px,transparent_1px)] bg-[length:4px_4px] opacity-40"></div>
                            {/* Shine */}
                            <div className="absolute top-2 left-4 w-8 h-20 bg-white/20 rounded-full blur-md"></div>
                        </div>
                        <div className="absolute bottom-0 w-4 h-24 bg-gray-700"></div>
                        <div className="absolute bottom-0 w-16 h-4 bg-gray-800 rounded-t-lg"></div>
                    </div>

                    {/* Vacuum Tubes */}
                    <div className="h-24 bg-[#111] rounded-lg border border-gray-800 shadow-[inset_0_0_10px_black] flex items-center justify-center gap-4 px-4 mt-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-16 bg-orange-500/10 rounded-t-full border border-orange-500/30 relative overflow-hidden animate-pulse">
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-10 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]"></div>
                                {/* Glass reflection */}
                                <div className="absolute top-2 right-1 w-2 h-8 bg-white/20 rounded-full blur-[1px]"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Interface & Form */}
                <div className="w-full md:w-7/12 bg-[#2d2f33] relative p-8 flex flex-col">
                    {/* Metal Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none"></div>

                    {/* Digital Display */}
                    <div className="bg-black border-4 border-gray-600 rounded mb-8 p-4 shadow-[0_0_15px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
                        <p className="text-red-500 text-lg md:text-xl tracking-widest animate-pulse" style={{ textShadow: "0 0 5px red" }}>
                            FREQUENCY: 11.11 MHz <br />
                            <span className="text-xs text-red-700 opacity-80">- HAWKINS AV CLUB -</span>
                        </p>
                    </div>

                    {/* Clipboard Form */}
                    <div className="relative flex-1 bg-[#d3cbb5] rounded shadow-[5px_5px_15px_rgba(0,0,0,0.5)] p-6 transform rotate-1 ml-4 border-t-8 border-gray-600">
                        {/* Clip */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-300 rounded-t-lg border-2 border-gray-400 shadow-md">
                            <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-lg"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Name (Call Sign):</label>
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent border-b-2 border-gray-400 focus:border-red-600 outline-none text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email (Frequency):</label>
                                <input
                                    type="email"
                                    value={formState.frequency}
                                    onChange={e => setFormState({ ...formState, frequency: e.target.value })}
                                    className="w-full bg-transparent border-b-2 border-gray-400 focus:border-red-600 outline-none text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message:</label>
                                <textarea
                                    rows={3}
                                    value={formState.message}
                                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-transparent border-2 border-gray-300 focus:border-red-600 outline-none text-gray-900 resize-none p-1"
                                ></textarea>
                            </div>

                            <div className="text-right mt-2">
                                <button className="px-6 py-1 bg-red-600 text-white font-bold text-sm rounded shadow-[0_2px_0_#991b1b] active:translate-y-[2px] active:shadow-none hover:bg-red-500 transition-all uppercase tracking-widest">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Red LED/Power Light */}
                    <div className="absolute bottom-6 right-6 flex flex-col items-center gap-1">
                        <div className={`w-4 h-4 rounded-full ${formState.message ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-600 shadow-[0_0_10px_#dc2626]'} animate-pulse`}></div>
                        <span className="text-[10px] text-gray-400 uppercase">Transmit</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
