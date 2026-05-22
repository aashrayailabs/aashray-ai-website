"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Globe, Rocket } from "lucide-react";

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
      className="relative pt-40 pb-32 px-6 md:px-12 container mx-auto overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Visual Atmosphere Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] mix-blend-screen pointer-events-none" />
      
      {/* Floating telemetry particles (Inertia-like movement) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
         {[...Array(15)].map((_, i) => (
           <motion.div
             key={`particle-${i}`}
             className="absolute w-1 h-1 bg-cyan-400/50 rounded-full blur-[1px]"
             initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
             animate={{ 
               y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
               opacity: [0, 0.8, 0],
               scale: [0.8, 1.2, 0.8]
             }}
             transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" }}
           />
         ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tighter leading-[1.05] text-white">
            Building the <br className="hidden sm:block" /><span className="text-gray-500">Automated Enterprise</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed font-medium">
            We engineer intelligent operational systems that help businesses automate workflows, improve visibility, and scale operations through practical AI infrastructure.
          </p>
        </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mt-20">
        
        {/* Left Side: Founder Identity */}
        <div className="lg:w-1/3 shrink-0 flex flex-col">
          <div className="flex flex-col items-start mb-10 pb-8 border-b border-white/[0.03]">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 shadow-xl bg-black">
              <img
                src="/founder.jpg"
                alt="Akula Naveenkumar"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-white">
              Akula Naveenkumar
            </h3>

            <p className="text-gray-400 text-sm">
              Founder & Lead Architect
            </p>

            <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-gray-500">
              Operational AI Infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Cpu, title: "Practical Systems", desc: "Built to work, not just demo." },
              { icon: Brain, title: "Intelligent Automation", desc: "AI that actually saves time." },
            ].map((item, i) => (
              <div key={i} className="relative p-5 bg-[#050505] border border-white/[0.03] rounded-2xl hover:border-cyan-500/20 transition-all duration-700 group overflow-hidden">
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/80 transition-colors duration-700 group-hover:animate-pulse" />
                <item.icon className="w-5 h-5 text-gray-600 mb-4 group-hover:text-cyan-400 transition-colors duration-700" />
                <h4 className="text-gray-300 font-semibold mb-1 tracking-tight group-hover:text-white transition-colors duration-700">{item.title}</h4>
                <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors duration-700">{item.desc}</p>
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/0 group-hover:via-cyan-500/20 group-hover:to-cyan-500/0 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Enterprise Messaging */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-2/3"
        >
          <blockquote className="text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 leading-tight font-medium tracking-tighter mb-10 border-l-2 border-cyan-500/30 pl-6 md:pl-8 py-2">
            &quot;We design enterprise-grade AI systems that simplify workflows, improve operational visibility, and support scalable business automation.&quot;
          </blockquote>
          
          <div className="flex flex-wrap items-center gap-3 mb-12 pb-8 border-b border-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">Aashray AI Labs</span>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed text-base md:text-lg font-medium max-w-2xl">
            <p className="text-white/80">
              Aashray AI Labs develops operational AI infrastructure focused on intelligent automation, scalable workflows, enterprise visibility, and practical AI systems.
            </p>
            <p>
              Our focus is on operational AI systems that improve workflows, automate repetitive processes, centralize visibility, and enable business owners to manage critical operations remotely through secure, scalable cloud-based infrastructure.
            </p>
            <p>
              From intelligent data extraction and workflow orchestration to enterprise dashboards, we build systems designed for real-world business outcomes, not hype.
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
}
