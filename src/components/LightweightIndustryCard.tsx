"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LightweightIndustryCard({ title, Icon, delay, id, onHover }: { title: string, Icon: any, delay: number, id: string, onHover?: (id: string | null) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    if (onHover) onHover(id);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    if (onHover) onHover(null);
  };

  return (
    <Link href={`/industries?target=${id}`} className="block h-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileHover={{ y: -4 }}
        className="p-5 md:p-6 text-left border border-zinc-200/50 rounded-2xl bg-white hover:border-zinc-300 transition-all duration-500 group relative overflow-hidden h-full flex flex-col justify-between shadow-[0_2px_12px_rgba(24,24,27,0.02)] hover:shadow-[0_8px_24px_rgba(24,24,27,0.04)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:border-zinc-300 group-hover:bg-zinc-100 transition-all duration-300">
            <Icon className="w-5 h-5 text-zinc-500 group-hover:text-zinc-800 transition-colors duration-300" />
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex items-center gap-1.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[7px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Active</span>
          </motion.div>
        </div>

        <div className="relative z-10 mt-auto">
          <h4 className="text-sm font-bold text-zinc-700 group-hover:text-zinc-950 transition-colors duration-300 tracking-tight mb-4">{title}</h4>
          
          {/* Miniature SVG Orchestration Line */}
          <div className="h-4 relative flex items-center w-full opacity-30 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="absolute inset-0 w-full h-full" style={{ top: '50%', transform: 'translateY(-50%)' }}>
               <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(24,24,27,0.08)" strokeWidth="1" strokeDasharray="2,2" />
               {isHovered && (
                  <motion.line 
                    x1="5%" y1="50%" x2="95%" y2="50%" 
                    stroke="#0f766e" strokeWidth="1.5" 
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: ["0, 100", "100, 0"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
               )}
            </svg>
            <div className="absolute left-[2%] w-1.5 h-1.5 rounded-full border border-zinc-300 bg-white group-hover:border-teal-700 group-hover:bg-teal-700 transition-colors" />
            <div className="absolute left-[50%] -translate-x-[50%] w-1.5 h-1.5 rounded-full border border-zinc-300 bg-white group-hover:border-teal-700 group-hover:bg-teal-700 transition-colors" />
            <div className="absolute right-[2%] w-1.5 h-1.5 rounded-full border border-zinc-300 bg-white group-hover:border-teal-700 group-hover:bg-teal-700 transition-colors" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
