"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#000000] pointer-events-none">
      {/* Refined Institutional Ambient Glow - Very low opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/5 via-[#000000] to-[#000000] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/5 via-[#000000] to-[#000000] opacity-40"></div>

      {/* Ultra-Soft Animated Grid Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 48px'],
        }}
        transition={{
          duration: 15, // Extremely slow, calm movement
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Subtle Data Flows (Vertical lines) */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[20, 40, 60, 80].map((left, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
            style={{ left: `${left}%` }}
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
