"use client";

import { motion } from "framer-motion";
import { Database, Workflow, ShieldCheck, Activity, Terminal } from "lucide-react";

export default function OrchestrationPipelineVisual() {
  return (
    <div className="w-full mt-16 rounded-2xl bg-[#050505] border border-white/10 p-6 md:p-12 relative overflow-hidden shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
      
      {/* Animated Light Sweep */}
      <motion.div 
        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent skew-x-12 pointer-events-none"
        animate={{ x: ["-100%", "50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Pipeline Status */}
        <div className="flex-1 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Orchestration Active</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Deterministic AI Routing
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
            Our proprietary infrastructure layer routes requests through specialized models, ensuring high-fidelity execution, zero-latency handoffs, and complete enterprise data privacy.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Activity className="w-4 h-4 text-emerald-400 mb-2" />
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Success Rate</p>
                <p className="text-xl font-bold text-white tracking-tight">99.99%</p>
             </div>
             <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <Terminal className="w-4 h-4 text-blue-400 mb-2" />
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Avg Latency</p>
                <p className="text-xl font-bold text-white tracking-tight">12ms</p>
             </div>
          </div>
        </div>

        {/* Right Side: The Visual Pipeline */}
        <div className="flex-1 w-full relative h-[300px] flex items-center justify-center">
          
          {/* Incoming Data Node */}
          <motion.div 
            className="absolute left-0 w-16 h-16 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center z-20 shadow-lg"
            animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}
          >
            <Database className="w-6 h-6 text-gray-400" />
            <div className="absolute -top-6 text-[8px] text-gray-500 font-mono tracking-widest">INGESTION</div>
          </motion.div>

          {/* Central AI Processor */}
          <motion.div 
            className="relative w-24 h-24 rounded-2xl bg-[#020202] border border-cyan-500/40 flex items-center justify-center z-20 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl animate-pulse" />
            <Workflow className="w-10 h-10 text-cyan-400 relative z-10" />
            <div className="absolute -bottom-8 text-[9px] text-cyan-400 font-mono tracking-widest bg-[#0a0a0a] px-2 py-0.5 border border-white/10 rounded">ROUTING ENGINE</div>
          </motion.div>

          {/* Outgoing Secure Node */}
          <motion.div 
            className="absolute right-0 w-16 h-16 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center z-20 shadow-lg"
            animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity }}
          >
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div className="absolute -top-6 text-[8px] text-gray-500 font-mono tracking-widest">EXECUTION</div>
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none">
            <motion.path 
              d="M 64 150 L 50% 150" 
              stroke="rgba(6,182,212,0.5)" strokeWidth="2" fill="none" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [-20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.path 
              d="M 50% 150 L calc(100% - 64px) 150" 
              stroke="rgba(16,185,129,0.5)" strokeWidth="2" fill="none" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [-20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </svg>

        </div>

      </div>
    </div>
  );
}
