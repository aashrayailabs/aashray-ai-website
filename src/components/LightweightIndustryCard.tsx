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
        whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.3)", boxShadow: "0 10px 40px -10px rgba(6,182,212,0.15)" }}
        className="p-5 md:p-6 text-left border border-white/[0.03] rounded-2xl bg-[#030303] transition-all duration-700 group relative overflow-hidden h-full flex flex-col justify-between"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-950/20 transition-all duration-500">
            <Icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors duration-500" />
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex items-center gap-1.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest">Active</span>
          </motion.div>
        </div>

        <div className="relative z-10 mt-auto">
          <h4 className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-500 tracking-tight mb-4">{title}</h4>
          
          {/* Miniature SVG Orchestration Line */}
          <div className="h-4 relative flex items-center w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500">
            <svg className="absolute inset-0 w-full h-full" style={{ top: '50%', transform: 'translateY(-50%)' }}>
               <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2" />
               {isHovered && (
                 <motion.line 
                   x1="5%" y1="50%" x2="95%" y2="50%" 
                   stroke="#06b6d4" strokeWidth="1.5" 
                   initial={{ strokeDasharray: "0, 100" }}
                   animate={{ strokeDasharray: ["0, 100", "100, 0"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 />
               )}
            </svg>
            <div className="absolute left-[2%] w-1.5 h-1.5 rounded-full border border-gray-600 bg-[#050505] group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-colors" />
            <div className="absolute left-[50%] -translate-x-[50%] w-1.5 h-1.5 rounded-full border border-gray-600 bg-[#050505] group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-colors" />
            <div className="absolute right-[2%] w-1.5 h-1.5 rounded-full border border-gray-600 bg-[#050505] group-hover:border-cyan-500 group-hover:bg-cyan-500 transition-colors" />
          </div>
        </div>
        
      </motion.div>
    </Link>
  );
}
