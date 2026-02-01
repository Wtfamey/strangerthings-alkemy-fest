import React from 'react';
import { Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, FileText } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative pt-12 pb-8 px-4 bg-[#0a0e1a] overflow-hidden border-t-4 border-red-900/40">
            {/* Background Texture/Mist could go here */}

            <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
                {/* Title */}
                <h2
                    className="text-4xl md:text-5xl mb-4 text-center select-none"
                    style={{
                        color: '#ff2a2a',
                        textShadow: '0 0 10px rgba(255, 42, 42, 0.7), 0 0 20px rgba(255, 42, 42, 0.5)'
                    }}
                >
                    Alkemy 2026
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-center max-w-2xl text-xs md:text-sm mb-10 leading-relaxed">
                    Alkemy Fest – BVDU Navi Mumbai's premier celebration of talent, innovation, and
                    community, uniting culture, e-sports, technology, and sports
                </p>

                {/* Contact Box */}
                <div className="relative w-full max-w-xl mb-12 group">
                    {/* Top Scroll Icon */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0a0e1a] px-3 text-red-500 z-20">
                        <FileText size={20} strokeWidth={1.5} className="drop-shadow-[0_0_5px_rgba(239,68,68,0.6)]" />
                    </div>

                    {/* The Box Border */}
                    <div className="relative border border-red-500/50 rounded-lg p-6 flex justify-center items-center bg-[#0a0e1a]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.1)] transition-all duration-300 hover:border-red-500/80 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                        {/* Email Link */}
                        <a
                            href="mailto:detnm.studentcouncil@gmail.com"
                            className="flex items-center gap-3 text-lg md:text-xl text-red-100 hover:text-red-500 transition-colors duration-300"
                            style={{ letterSpacing: '0.05em' }}
                        >
                            <Mail className="w-5 h-5 md:w-6 md:h-6" />
                            <span>detnm.studentcouncil@gmail.com</span>
                        </a>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-red-900/30 w-full">
                    {/* Copyright */}
                    <div className="text-gray-500 text-sm order-2 md:order-1">
                        Copyright © Alkemy 2026. All rights reserved.
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 order-1 md:order-2">
                        {[MapPin, Instagram, Facebook, Linkedin, Youtube].map((Icon, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-10 h-10 rounded-full border border-red-900/50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 hover:scale-110 hover:shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all duration-300 bg-black/40"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
