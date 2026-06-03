"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function IndustryMicroDashboard({ 
  title, 
  description, 
  Icon, 
  nodes, 
  metrics 
}: { 
  title: string, 
  description: string, 
  Icon: any, 
  nodes: string[], 
  metrics: { label: string, value: string }[] 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/contact" className="block">
      <motion.div 
        className="relative p-6 rounded-2xl bg-[#050505] border border-white/5 overflow-hidden group h-full flex flex-col justify-between"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5, borderColor: "rgba(6, 182, 212, 0.3)" }}
      >
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <div>
          {/* Top Header */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-500">
              <Icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-500" />
            </div>
            
            {/* Live Status Indicator (Visible on hover) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-green-400">System Active</span>
            </motion.div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">{description}</p>
        </div>

        <div className="mt-auto">
          {/* Hidden Live Engine (Expands on Hover) */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/5 space-y-6">
              
              {/* Miniature Workflow Map */}
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-cyan-500" /> Active Orchestration
                </p>
                <div className="relative flex justify-between items-center py-2 px-1">
                  <svg className="absolute inset-0 w-full h-full" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                     <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
                     {isHovered && (
                       <motion.line 
                         x1="5%" y1="50%" x2="95%" y2="50%" 
                         stroke="#06b6d4" strokeWidth="1.5" 
                         initial={{ strokeDasharray: "0, 200" }}
                         animate={{ strokeDasharray: ["0, 200", "200, 0"] }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                       />
                     )}
                  </svg>
                  {nodes.map((node, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10 group/node">
                      <div className={`w-3 h-3 rounded-full border border-white/20 mb-1.5 transition-colors ${i === 1 ? 'bg-cyan-500/20 border-cyan-500' : 'bg-[#111] group-hover/node:bg-white/10'}`} />
                      <span className="text-[8px] font-mono text-gray-400 tracking-wider uppercase bg-[#050505] px-1 text-center whitespace-nowrap">{node}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 p-3 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 blur-xl rounded-full" />
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">{metric.label}</p>
                    <p className="text-sm font-mono text-white tracking-tight">{metric.value}</p>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Action indicator */}
          <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">Deploy Infrastructure</span>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
