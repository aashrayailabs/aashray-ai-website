"use client";

import { motion } from "framer-motion";
import { Brain, Cpu } from "lucide-react";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function About() {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={pageVariants}
      className="relative pt-40 pb-32 px-6 md:px-12 container mx-auto overflow-hidden min-h-screen flex flex-col justify-center bg-[#020202] text-gray-150"
    >
      {/* Visual Atmosphere Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.02] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter leading-[1.05] text-white font-display">
            Building the <br className="hidden sm:block" /><span className="text-zinc-500">Automated Enterprise</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed font-medium">
            We build operational AI systems enterprises can trust — designed to simplify workflows, improve visibility, and support scalable execution.
          </p>
        </motion.div>
 
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mt-20">
          
          {/* Left Side: Founder Identity */}
          <div className="lg:w-1/3 shrink-0 flex flex-col">
            <div className="flex flex-col items-start mb-10 pb-8 border-b border-white/10">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative">
                <div className="w-full h-full rounded-full border border-white/10 overflow-hidden relative z-10 bg-zinc-900 shadow-sm">
                  <img 
                    src="/founder.jpg" 
                    alt="Akula Naveenkumar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
 
              <h3 className="mt-5 text-xl font-bold text-white tracking-tight">
                Akula Naveenkumar
              </h3>
 
              <p className="text-zinc-400 text-xs font-semibold mt-1">
                Founder &amp; Systems Architect
              </p>
 
              <p className="mt-2 text-[9px] uppercase tracking-widest text-cyan-500 font-mono font-bold leading-none">
                Operational AI Infrastructure
              </p>
            </div>
 
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Cpu, title: "Practical Systems", desc: "Built to perform reliably under strict SLA bounds, avoiding mock dashboards." },
                { icon: Brain, title: "Intelligent Automation", desc: "Deterministic state machine runtimes protecting state transitions." },
              ].map((item, i) => (
                <div key={i} className="relative p-5 bg-[#050505] border border-white/5 rounded-2xl shadow-lg hover:border-cyan-500/20 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-zinc-500 mb-4" />
                  <h4 className="text-white font-bold mb-1 tracking-tight">{item.title}</h4>
                  <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
 
          {/* Right Side: Enterprise Messaging (Founder Philosophy synced with homepage) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-2/3 space-y-6"
          >
            <p className="text-[10px] text-cyan-500 font-mono tracking-widest uppercase font-bold pl-1">FOUNDER PHILOSOPHY</p>
            <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-semibold leading-relaxed italic text-justify md:text-left">
              &ldquo;We design enterprise-grade AI systems that simplify workflows, improve operational visibility, and support scalable business automation.&rdquo;
            </blockquote>
            <div className="w-10 h-0.5 bg-white/10 rounded-full" />
            
            <div className="space-y-6 text-zinc-400 leading-relaxed text-sm sm:text-base font-medium max-w-2xl text-justify">
              <p className="text-zinc-300">
                Aashray AI Labs develops operational AI infrastructure focused on workflow automation, governance systems, and enterprise process orchestration.
              </p>
              <p>
                Our platforms address operational bottlenecks by placing safe, auditable, and resilient automation layers directly in command of enterprise operations, avoiding decorative hype to build systems backed by cryptographic state persistence.
              </p>
            </div>
            
            <p className="text-xs font-bold text-zinc-350 tracking-tight font-sans pt-2">
              — Akula Naveenkumar, Founder &amp; Systems Architect
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
