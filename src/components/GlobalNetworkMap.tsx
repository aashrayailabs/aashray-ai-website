"use client";

import { motion } from "framer-motion";

export default function GlobalNetworkMap() {
  const nodes = [
    { id: "USA", cx: "25%", cy: "40%", label: "US-EAST", active: true },
    { id: "CAN", cx: "20%", cy: "30%", label: "CA-CENTRAL", active: false },
    { id: "UK", cx: "48%", cy: "35%", label: "UK-SOUTH", active: true },
    { id: "UAE", cx: "60%", cy: "45%", label: "ME-CENTRAL", active: true },
    { id: "IND", cx: "70%", cy: "50%", label: "AP-SOUTH", active: true },
    { id: "SGP", cx: "78%", cy: "60%", label: "AP-SOUTHEAST", active: true },
    { id: "AUS", cx: "85%", cy: "75%", label: "AP-SYDNEY", active: false }
  ];

  const routes = [
    { from: "USA", to: "UK", cp1x: "35%", cp1y: "25%" },
    { from: "UK", to: "UAE", cp1x: "54%", cp1y: "35%" },
    { from: "UAE", to: "IND", cp1x: "65%", cp1y: "40%" },
    { from: "IND", to: "SGP", cp1x: "74%", cp1y: "55%" },
    { from: "USA", to: "CAN", cp1x: "22%", cp1y: "35%" },
    { from: "SGP", to: "AUS", cp1x: "82%", cp1y: "67%" },
    { from: "USA", to: "SGP", cp1x: "50%", cp1y: "85%" }, // Deep Pacific
    { from: "UK", to: "IND", cp1x: "60%", cp1y: "25%" }, // Northern Eurasian
    { from: "CAN", to: "UK", cp1x: "34%", cp1y: "15%" }, // North Atlantic
  ];

  return (
    <section className="relative py-24 md:py-40 bg-black overflow-hidden border-t border-white/[0.02]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter mb-4">Global Deployment Topology</h2>
        <p className="text-gray-500 font-medium text-sm md:text-base max-w-2xl mx-auto mb-16">
          Low-latency edge infrastructure deployed across 14 sovereign regions, ensuring strict data residency and sub-millisecond AI orchestration routing.
        </p>

          {/* Cinematic Map Container */}
        <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] bg-[#020202] rounded-3xl border border-white/[0.03] shadow-[0_0_100px_rgba(6,182,212,0.015)] overflow-hidden">
          
          {/* Faint Topology Grid */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-[#020202]/90 pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />

          {/* SVG Orchestration Map */}
          <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
            {/* Draw Routes */}
            {routes.map((route, i) => {
              const fromNode = nodes.find(n => n.id === route.from);
              const toNode = nodes.find(n => n.id === route.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={i}>
                  {/* Base Faint Line */}
                  <path 
                    d={`M ${fromNode.cx} ${fromNode.cy} Q ${route.cp1x} ${route.cp1y} ${toNode.cx} ${toNode.cy}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1.5"
                  />
                  {/* Active Signal Pulse */}
                  <motion.path 
                    d={`M ${fromNode.cx} ${fromNode.cy} Q ${route.cp1x} ${route.cp1y} ${toNode.cx} ${toNode.cy}`}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    initial={{ strokeDasharray: "0, 1000", opacity: 0 }}
                    animate={{ strokeDasharray: ["0, 1000", "1000, 0"], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1], delay: Math.random() * 2 }}
                  />
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node, i) => (
              <g key={i}>
                <circle cx={node.cx} cy={node.cy} r="4" fill={node.active ? "#06b6d4" : "#222"} opacity={node.active ? "0.35" : "0.2"} />
                {node.active && <circle cx={node.cx} cy={node.cy} r="1.5" fill="#fff" opacity="0.6" />}
                {node.active && (
                  <motion.circle 
                    cx={node.cx} cy={node.cy} r="10" fill="none" stroke="#06b6d4" strokeWidth="0.5"
                    animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity, delay: Math.random() }}
                  />
                )}
                {/* Node Label */}
                <text x={node.cx} y={node.cy} dy="-12" dx="8" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="1">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Top Left Telemetry Overlay */}
          <div className="absolute top-6 left-6 text-left flex flex-col gap-5 z-20 hidden sm:flex">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">Global Mesh Active</span>
              </div>
              <p className="text-[9px] text-gray-500 font-mono tracking-widest">AES-256 E2E ROUTING</p>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-gray-600 font-mono w-14">US-EAST</span>
                <div className="flex gap-[2px]">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} className="w-[3px] h-2.5 bg-cyan-500/80 rounded-[1px]" 
                      animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-gray-600 font-mono w-14">UK-SOUTH</span>
                <div className="flex gap-[2px]">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} className="w-[3px] h-2.5 bg-cyan-500/60 rounded-[1px]" 
                      animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1 }} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-gray-600 font-mono w-14">AP-SOUTH</span>
                <div className="flex gap-[2px]">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} className="w-[3px] h-2.5 bg-emerald-500/80 rounded-[1px]" 
                      animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Telemetry Overlay */}
          <div className="absolute bottom-6 right-6 text-right">
            <p className="text-xl font-bold text-cyan-400 font-mono mb-1">99.998%</p>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">GLOBAL UPTIME</p>
          </div>

        </div>
      </div>
    </section>
  );
}
