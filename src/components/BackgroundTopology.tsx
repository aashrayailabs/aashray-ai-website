"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundTopology() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020202]">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] opacity-[0.03]" />

      {/* Atmospheric Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full" />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-teal-900/5 blur-[120px] rounded-full" />

      {/* Animated Topology Lines - Disabled on mobile to reduce visual noise & save GPU resources */}
      <svg className="absolute inset-0 w-full h-full opacity-20 hidden md:block" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyanPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Horizontal moving pulse 1 */}
        <motion.path
          d="M -100 200 L 2000 200"
          stroke="url(#cyanPulse)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0, x: -500 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0], x: 2000 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
        />
        
        {/* Horizontal moving pulse 2 */}
        <motion.path
          d="M -100 600 L 2000 600"
          stroke="url(#cyanPulse)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0, x: -500 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0], x: 2000 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 5 }}
        />

        {/* Diagonal moving pulse */}
        <motion.path
          d="M -200 -200 L 2000 1500"
          stroke="url(#cyanPulse)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
