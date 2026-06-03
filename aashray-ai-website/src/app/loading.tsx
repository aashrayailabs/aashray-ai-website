"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#020202] z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#020202] to-[#020202] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-16 h-16 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.15)] overflow-hidden">
          {/* Pulsing inner glow */}
          <motion.div 
            className="absolute inset-0 bg-cyan-500/20 blur-md"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark-white.svg" alt="Loading" className="w-8 h-8 opacity-90 relative z-10" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500"
          >
            Aashray AI Labs
          </motion.div>
          
          {/* Loading bar */}
          <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-1/2"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
