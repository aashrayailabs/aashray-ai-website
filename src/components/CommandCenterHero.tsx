"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Lock, Activity, ShieldCheck, Zap, Database } from "lucide-react";
import Link from "next/link";

export default function CommandCenterHero() {
  return (
    <div className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-16 md:pb-28 overflow-hidden font-sans bg-[#0c0d0f] text-[#cbd5e1] border-b border-white/[0.03]">
      
      {/* Background Lighting specifically for the Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-cyan-950/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Typography & Action */}
          <div className="lg:col-span-7 max-w-3xl">
            {/* Live Status Strip */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
              </span>
              <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase font-bold">
                Operational AI Infrastructure Studio
              </span>
            </div>

            {/* Large editorial title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-white mb-4 sm:mb-6 font-display">
              Operational AI Infrastructure <br className="hidden md:inline" />
              for Enterprise Systems
            </h1>

            {/* Business-oriented Subheadline */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 leading-relaxed font-medium mb-8 md:mb-10 max-w-2xl text-justify md:text-left">
              We help organizations automate workflows, streamline operations, and deploy secure AI-driven systems across enterprise environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-0">
              <Link href="/contact" className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#ffffff] text-black font-bold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center text-[10px] sm:text-xs tracking-wider uppercase shadow-md font-sans">
                Schedule Architecture Review
              </Link>
              <Link href="/platforms" className="group px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-transparent border border-white/10 hover:border-white/20 text-white font-bold transition-all duration-300 flex items-center justify-center text-[10px] sm:text-xs tracking-wider uppercase font-sans">
                Explore Platform <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Animated Operational AI Visualizer */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-center items-center h-[390px] relative w-full">
            {/* Visualizer Frame */}
            <div className="w-full h-full bg-[#08080a] border border-white/[0.08] rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#08080a_98%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 via-transparent to-transparent pointer-events-none" />

              {/* Status Header */}
              <div className="relative z-10 flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Runtime Orchestrator</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-blue-950/20 border border-blue-500/20 text-[8px] font-mono text-blue-400 font-bold uppercase tracking-wider animate-pulse">
                  Telemetry Active
                </div>
              </div>

              {/* Interactive Telemetry Visualization Map */}
              <div className="relative w-full h-[220px] flex items-center justify-center">
                {/* SVG Connections and Pulses */}
                <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" viewBox="0 0 400 220">
                  <defs>
                    <linearGradient id="packetGlowHero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="lineGradHero" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Draw Curved Connection Lines */}
                  <path d="M 50 110 Q 100 50 150 60" fill="none" stroke="url(#lineGradHero)" strokeWidth="1.5" />
                  <path d="M 50 110 Q 100 170 150 160" fill="none" stroke="url(#lineGradHero)" strokeWidth="1.5" />
                  <path d="M 150 60 Q 200 85 250 110" fill="none" stroke="url(#lineGradHero)" strokeWidth="1.5" />
                  <path d="M 150 160 Q 200 135 250 110" fill="none" stroke="url(#lineGradHero)" strokeWidth="1.5" />
                  <path d="M 250 110 L 350 110" fill="none" stroke="url(#lineGradHero)" strokeWidth="1.5" />

                  {/* Active routing pulses */}
                  <motion.circle r="2.5" fill="url(#packetGlowHero)"
                    animate={{ 
                      cx: [50, 100, 150, 200, 250, 350], 
                      cy: [110, 70, 60, 85, 110, 110] 
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle r="2.5" fill="url(#packetGlowHero)"
                    animate={{ 
                      cx: [50, 100, 150, 200, 250, 350], 
                      cy: [110, 150, 160, 135, 110, 110] 
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 2.25 }}
                  />

                  {/* Checkpoint checkpoints */}
                  <circle cx="200" cy="85" r="2.5" fill="#a855f7" className="animate-pulse" />
                  <circle cx="200" cy="135" r="2.5" fill="#2563eb" className="animate-pulse" />
                </svg>

                {/* Nodes HTML Overlay */}
                {/* Node 1: Ingestion */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.08, borderColor: "rgba(6, 182, 212, 0.4)" }}
                    className="w-9 h-9 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Database className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-zinc-500 group-hover:text-zinc-300 font-bold uppercase tracking-wider transition-colors">Ingress</span>
                </div>

                {/* Node 2: Intent Audit */}
                <div className="absolute left-[132px] top-6 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.08, borderColor: "rgba(168, 85, 247, 0.4)" }}
                    className="w-9 h-9 rounded-xl bg-[#0c0d10] border border-purple-500/20 flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-zinc-500 group-hover:text-zinc-300 font-bold uppercase tracking-wider transition-colors">Intent</span>
                </div>

                {/* Node 3: Policy Guard */}
                <div className="absolute left-[132px] bottom-6 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.08, borderColor: "rgba(37, 99, 235, 0.4)" }}
                    className="w-9 h-9 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Lock className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-zinc-500 group-hover:text-zinc-300 font-bold uppercase tracking-wider transition-colors">Policy</span>
                </div>

                {/* Node 4: Orchestrator Core */}
                <div className="absolute left-[232px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.08, borderColor: "rgba(6, 182, 212, 0.5)" }}
                    className="w-10 h-10 rounded-xl bg-black border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-colors"
                  >
                    <ShieldCheck className="w-4.5 h-4.5 text-cyan-400" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-wider">MitraAI</span>
                </div>

                {/* Node 5: Egress */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <motion.div 
                    whileHover={{ scale: 1.08, borderColor: "rgba(168, 85, 247, 0.4)" }}
                    className="w-9 h-9 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Zap className="w-4 h-4 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                  </motion.div>
                  <span className="text-[8px] font-mono text-zinc-555 group-hover:text-zinc-300 font-bold uppercase tracking-wider transition-colors">Egress</span>
                </div>
              </div>

              {/* Status footer with telemetry stats */}
              <div className="relative z-10 flex justify-between items-center pt-3 border-t border-white/5 font-mono text-[9px] text-zinc-500 w-full">
                <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-cyan-400 animate-pulse" /> Latency: 12.4ms</span>
                <span>Active VPCs: 4</span>
                <span className="text-blue-400 font-bold">Queue: Nominal</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
