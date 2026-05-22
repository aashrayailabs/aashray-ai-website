"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Activity, Database, Smartphone, Shield, Zap, Server } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CommandCenterHero() {
  const [mounted, setMounted] = useState(false);
  const [throughput, setThroughput] = useState(482);
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setThroughput(prev => prev + Math.floor(Math.random() * 10) - 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative pt-32 md:pt-48 pb-20 overflow-hidden font-sans">
      
      {/* Background Lighting specifically for the Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-cyan-900/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Typography & Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Live Uptime Strip */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] mb-8 shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase font-semibold">
                System Operational • 99.99% Uptime
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] text-white mb-6">
              AI Infrastructure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                For Modern Business Operations
              </span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed font-medium mb-10 max-w-xl">
              Deploy intelligent workflow systems, customer servicing automation, operational dashboards, and AI-driven business infrastructure — without technical complexity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/contact" className="group px-8 py-4 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Schedule Consultation 
              </Link>
              <Link href="/industries" className="group px-8 py-4 rounded-md bg-transparent border border-white/10 hover:border-cyan-500/50 text-white font-semibold transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Explore Infrastructure <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Link>
            </div>

            {/* Enterprise Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "AI Operations", value: "24/7", icon: Activity, color: "text-cyan-400" },
                { label: "Efficiency", value: "+40%", icon: Zap, color: "text-emerald-400" },
                { label: "Visibility", value: "100%", icon: LayoutDashboard, color: "text-blue-400" },
                { label: "Deployment", value: "Global", icon: Globe, color: "text-violet-400" },
              ].map((metric, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                    <metric.icon className={`w-3 h-3 ${metric.color}`} />
                    {metric.label}
                  </p>
                  <p className="text-xl font-bold text-white tracking-tight">{metric.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The Visual Engine */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            
            {/* The Central AI Core */}
            <motion.div 
              className="absolute w-32 h-32 rounded-2xl bg-[#050505] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex items-center justify-center z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl" />
              <Brain className="w-12 h-12 text-cyan-400" />
              <div className="absolute -bottom-8 bg-black/80 px-3 py-1 rounded border border-white/10 text-[9px] text-cyan-400 font-mono tracking-widest backdrop-blur-md">
                ROUTING CORE
              </div>
            </motion.div>

            {/* Orbiting Nodes & Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600">
              <defs>
                <linearGradient id="flowPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* CRM Connection */}
              <motion.path d="M 100 200 Q 200 300 300 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path d="M 100 200 Q 200 300 300 300" fill="none" stroke="url(#flowPulse)" strokeWidth="2" 
                initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "500 0"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
              
              {/* WhatsApp Connection */}
              <motion.path d="M 500 200 Q 400 300 300 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path d="M 500 200 Q 400 300 300 300" fill="none" stroke="url(#flowPulse)" strokeWidth="2" 
                initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "500 0"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }} />
              
              {/* Database Connection */}
              <motion.path d="M 300 500 L 300 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.path d="M 300 500 L 300 300" fill="none" stroke="url(#flowPulse)" strokeWidth="2" 
                initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: ["0 1000", "500 0"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }} />
            </svg>

            {/* Floating Node: CRM */}
            <motion.div 
              className="absolute top-[150px] left-[50px] w-14 h-14 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl flex items-center justify-center z-20"
              animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Database className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-6 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] text-gray-300 font-mono tracking-widest backdrop-blur-md">CRM SYNC</div>
            </motion.div>

            {/* Floating Node: WhatsApp */}
            <motion.div 
              className="absolute top-[150px] right-[50px] w-14 h-14 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl flex items-center justify-center z-20"
              animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Smartphone className="w-5 h-5 text-green-400" />
              <div className="absolute -top-6 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] text-green-400 font-mono tracking-widest backdrop-blur-md">WHATSAPP ENGINE</div>
            </motion.div>

            {/* Floating Node: Infrastructure DB */}
            <motion.div 
              className="absolute bottom-[50px] left-[50%] -translate-x-[50%] w-14 h-14 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl flex items-center justify-center z-20"
              animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Server className="w-5 h-5 text-blue-400" />
              <div className="absolute -bottom-6 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] text-blue-400 font-mono tracking-widest backdrop-blur-md">OPERATIONAL DB</div>
            </motion.div>

            {/* Live Operational Widgets */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
              className="absolute top-[80px] right-0 bg-[#050505]/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl z-30"
            >
              <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-semibold flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-cyan-400" /> API Throughput
              </p>
              <p className="text-lg font-mono text-white flex items-center gap-2">
                {throughput} <span className="text-[10px] text-gray-500">req/s</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
              className="absolute bottom-[150px] left-0 bg-[#050505]/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-2xl z-30"
            >
              <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-semibold flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-400" /> Security Protocol
              </p>
              <p className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> ENCRYPTED ROUTING
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Missing imports 
import { Globe, Brain, LayoutDashboard } from "lucide-react";
