"use client";

import { motion } from "framer-motion";
import { Database, Zap, Globe, Smartphone, Network, Code2, Server, Lock, ArrowRight, Activity, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function LiveSystemOrchestrator() {
  const [mounted, setMounted] = useState(false);
  const [operations, setOperations] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setOperations(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-[#030303] border-y border-white/5 py-20 md:py-24 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[400px] bg-blue-900/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.03] pointer-events-none" />

      {/* Grid Scanline Animation */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/0 via-cyan-500/[0.03] to-cyan-500/0 pointer-events-none"
        animate={{ y: [0, 800, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-semibold">Active Orchestration Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Live Enterprise Routing</h2>
          </div>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="bg-[#0a0a0a] border border-white/5 px-4 py-2 rounded-lg flex-1 sm:flex-none">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Encrypted Payload</p>
              <p className="text-xs sm:text-sm font-mono text-white flex items-center gap-2"><Lock className="w-3 h-3 text-emerald-400" /> SHA-256 Secured</p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 px-4 py-2 rounded-lg min-w-[120px] flex-1 sm:flex-none">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Ops Processed</p>
              <p className="text-xs sm:text-sm font-mono text-cyan-400">{operations.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* The Machine Visualizer - Hidden on mobile/tablet to reduce visual noise and avoid squeeze issues */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 md:p-12 hidden md:block">
          
          {/* Animated SVG Network Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="electricBlueLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="governancePurpleLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Static Ghost Lines */}
            <path d="M 150 200 C 350 200, 350 100, 500 100" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 150 200 C 350 200, 350 300, 500 300" fill="none" stroke="rgba(168,85,247,0.06)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 500 100 C 650 100, 650 200, 850 200" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 500 300 C 650 300, 650 200, 850 200" fill="none" stroke="rgba(168,85,247,0.06)" strokeWidth="2" strokeDasharray="4 4" />

            {/* Animated Data Pulses */}
            <motion.path d="M 150 200 C 350 200, 350 100, 500 100" fill="none" stroke="url(#electricBlueLine)" strokeWidth="2.5"
              initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "800 0"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
              
            <motion.path d="M 150 200 C 350 200, 350 300, 500 300" fill="none" stroke="url(#governancePurpleLine)" strokeWidth="2.5"
              initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "800 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.8 }} />

            <motion.path d="M 500 100 C 650 100, 650 200, 850 200" fill="none" stroke="url(#electricBlueLine)" strokeWidth="2.5"
              initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "800 0"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }} />
              
            <motion.path d="M 500 300 C 650 300, 650 200, 850 200" fill="none" stroke="url(#governancePurpleLine)" strokeWidth="2.5"
              initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "800 0"] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: 0.4 }} />
          </svg>

          {/* Infrastructure Nodes Layer */}
          <div className="absolute inset-0 w-full h-full p-8 flex justify-between items-center relative z-10">
            
            {/* Zone 1: Edge Intake */}
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-16 h-16 rounded-xl bg-[#09090c] border border-white/10 flex items-center justify-center shadow-2xl relative mb-3"
                whileHover={{ scale: 1.05, borderColor: "rgba(37, 99, 235, 0.4)" }}
              >
                <div className="absolute inset-0 bg-blue-500/5 rounded-xl animate-pulse" />
                <Globe className="w-6 h-6 text-zinc-400" />
              </motion.div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-black px-2 py-1 rounded border border-white/5">Edge API</p>
              
              <div className="mt-4 flex flex-col gap-1">
                <div className="text-[8px] font-mono text-cyan-400 bg-cyan-950/20 px-2 py-0.5 border border-cyan-500/10 rounded">POST /webhook</div>
                <div className="text-[8px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded">GET /status</div>
              </div>
            </div>

            {/* Zone 2: Processing Core */}
            <div className="flex flex-col gap-16 md:gap-24">
              <div className="flex flex-col items-center group">
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-[#09090c] border border-white/10 flex items-center justify-center shadow-2xl mb-3 relative"
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ borderColor: "rgba(37, 99, 235, 0.4)" }}
                >
                  <Database className="w-6 h-6 text-blue-400" />
                </motion.div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-black px-2 py-1 rounded border border-white/5">CRM Engine</p>
              </div>

              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-[#09090c] border border-white/10 flex items-center justify-center shadow-2xl mb-3 relative"
                  animate={{ y: [0, 4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{ borderColor: "rgba(168, 85, 247, 0.4)" }}
                >
                  <Terminal className="w-6 h-6 text-purple-400" />
                </motion.div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-black px-2 py-1 rounded border border-white/5">AI Reasoning</p>
              </div>
            </div>

            {/* Zone 3: Output Delivery */}
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-20 h-20 rounded-xl bg-[#08080a] border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.15)] relative mb-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl" />
                <Smartphone className="w-8 h-8 text-blue-400" />
                
                {/* Tiny blinking indicator */}
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#08080a]"
                  animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                />
              </motion.div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/20 px-2 py-1 rounded border border-blue-500/20">Client Delivery</p>
              
              <div className="mt-4 flex flex-col gap-1 items-center">
                <div className="text-[8px] font-mono text-zinc-400 flex items-center gap-1"><Activity className="w-2 h-2 text-emerald-400" /> Latency: 42ms</div>
                <div className="text-[8px] font-mono text-zinc-400 flex items-center gap-1"><Network className="w-2 h-2 text-blue-400" /> Nodes: 12</div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Alternative UI Description */}
        <div className="md:hidden p-6 rounded-2xl bg-[#09090c] border border-white/[0.06] mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
            <h4 className="text-white font-bold text-sm">Systems Active & Routing Payloads</h4>
          </div>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-4">
            Aashray AI orchestration processes inbound API transactions statelessly and encrypts outbound telemetry dynamically.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1 font-bold">Encryption</span>
              <span className="text-xs text-white font-bold font-mono flex items-center gap-1.5"><Lock className="w-3 h-3 text-emerald-400" /> SHA-256</span>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1 font-bold">Ops Count</span>
              <span className="text-xs text-cyan-400 font-bold font-mono">{operations.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
