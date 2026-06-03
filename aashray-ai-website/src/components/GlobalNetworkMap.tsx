"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Network, ShieldCheck, Activity, Database, Check, Cpu, RefreshCw, Radio } from "lucide-react";
import { useState, useEffect } from "react";

export default function GlobalNetworkMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [livePackets, setLivePackets] = useState<number>(1405);
  const [latencies, setLatencies] = useState({
    Virginia: 14,
    London: 22,
    Mumbai: 12,
    Singapore: 18,
  });

  // Fluctuate latencies and packet count to simulate a living network
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies(prev => ({
        Virginia: prev.Virginia + (Math.random() > 0.5 ? 1 : -1),
        London: prev.London + (Math.random() > 0.5 ? 1 : -1),
        Mumbai: prev.Mumbai + (Math.random() > 0.5 ? 1 : -1),
        Singapore: prev.Singapore + (Math.random() > 0.5 ? 1 : -1),
      }));
      setLivePackets(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { 
      id: "Virginia", 
      x: 250, 
      y: 175, 
      label: "US-EAST (Virginia)", 
      latency: `${latencies.Virginia}ms`, 
      status: "Operational",
      throughput: "450 GB/s",
      ip: "10.120.4.19",
      role: "Primary Ingestion Node"
    },
    { 
      id: "London", 
      x: 480, 
      y: 150, 
      label: "UK-SOUTH (London)", 
      latency: `${latencies.London}ms`, 
      status: "Operational",
      throughput: "380 GB/s",
      ip: "10.144.12.8",
      role: "Transit Gateway"
    },
    { 
      id: "Mumbai", 
      x: 700, 
      y: 260, 
      label: "AP-SOUTH (Mumbai)", 
      latency: `${latencies.Mumbai}ms`, 
      status: "Operational",
      throughput: "620 GB/s",
      ip: "10.200.22.45",
      role: "Core Execution Node"
    },
    { 
      id: "Singapore", 
      x: 820, 
      y: 310, 
      label: "AP-SOUTHEAST (Singapore)", 
      latency: `${latencies.Singapore}ms`, 
      status: "Operational",
      throughput: "310 GB/s",
      ip: "10.220.10.12",
      role: "Edge Relaying Node"
    }
  ];

  const routes = [
    { from: "Virginia", to: "London", cp1x: 360, cp1y: 140, checkpoint: "PII Scrubbing Gate", color: "url(#cyan-to-blue)" },
    { from: "London", to: "Mumbai", cp1x: 600, cp1y: 190, checkpoint: "FSM Policy Filter", color: "url(#blue-to-purple)" },
    { from: "Mumbai", to: "Singapore", cp1x: 760, cp1y: 290, checkpoint: "Audit Ledger Checkpoint", color: "url(#purple-to-cyan)" },
    { from: "Singapore", to: "Virginia", cp1x: 530, cp1y: 320, checkpoint: "VPC Transit Gate", color: "url(#cyan-to-blue)" }
  ];

  return (
    <section id="deployment" className="relative py-28 md:py-36 bg-[#040406] overflow-hidden border-t border-white/[0.04]">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/15 via-black to-[#040406] pointer-events-none" />
      
      {/* Background Slow Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.03] mix-blend-screen pointer-events-none" />

      {/* Background Neural Telemetry Pulse Nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[450px] h-[450px] rounded-full bg-blue-900/5 blur-[120px]"
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "15%" }}
        />
        <motion.div 
          className="absolute w-[350px] h-[350px] rounded-full bg-cyan-900/5 blur-[100px]"
          animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ bottom: "15%", right: "20%" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Cinematic Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/10 mb-6">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-300 tracking-widest uppercase font-semibold">Multi-Region Deployment Ready</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-4 sm:mb-6 font-display leading-[1.08]">
            Resilient Orchestration Architecture
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Visual dashboard mapping secure subnet topologies, event boundaries, and state compliance checks across multi-region VPC nodes.
          </p>
        </div>

        {/* Console Container */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[2.2/1] bg-[#08080b]/90 rounded-2xl md:rounded-3xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Internal Grid and Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.003)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#040406_98%)] pointer-events-none z-10" />

          {/* SVG Map Lines & Telemetry Paths */}
          <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none z-10" viewBox="0 0 1000 500" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cyan-to-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="blue-to-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="purple-to-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
              
              <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Draw Routes */}
            {routes.map((route, i) => {
              const fromNode = nodes.find(n => n.id === route.from);
              const toNode = nodes.find(n => n.id === route.to);
              if (!fromNode || !toNode) return null;

              return (
                <g key={i}>
                  {/* Faint static connection path */}
                  <path 
                    d={`M ${fromNode.x} ${fromNode.y} Q ${route.cp1x} ${route.cp1y} ${toNode.x} ${toNode.y}`}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="1.5"
                    opacity="0.12"
                  />
                  
                  {/* Telemetry packet flow pulse */}
                  <motion.path 
                    d={`M ${fromNode.x} ${fromNode.y} Q ${route.cp1x} ${route.cp1y} ${toNode.x} ${toNode.y}`}
                    fill="none"
                    stroke="url(#pulseGradient)"
                    strokeWidth="2"
                    initial={{ strokeDasharray: "0, 1000", opacity: 0 }}
                    animate={{ strokeDasharray: ["0, 1000", "1000, 0"], opacity: [0, 1, 1, 0] }}
                    transition={{ 
                      duration: 4.5 + (i * 0.8), 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: i * 1.2
                    }}
                  />

                  {/* Flowing dashes */}
                  <path 
                    d={`M ${fromNode.x} ${fromNode.y} Q ${route.cp1x} ${route.cp1y} ${toNode.x} ${toNode.y}`}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="1.2"
                    strokeDasharray="4 8"
                    opacity="0.4"
                    className="animate-[dash_20s_linear_infinite]"
                    style={{ animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
                  />
                </g>
              );
            })}

            {/* Render Static Nodes and Rings */}
            {nodes.map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r="8" fill="#040406" stroke={activeNode === node.id ? "#06b6d4" : "rgba(255,255,255,0.1)"} strokeWidth="1" />
                <circle cx={node.x} cy={node.y} r="2.5" fill={activeNode === node.id ? "#2563eb" : "#06b6d4"} />
                <motion.circle 
                  cx={node.x} 
                  cy={node.y} 
                  r="16" 
                  fill="none" 
                  stroke={activeNode === node.id ? "#06b6d4" : "#2563eb"} 
                  strokeWidth="0.5" 
                  opacity="0.3"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              </g>
            ))}
          </svg>

          {/* Interactive HTML Node Elements overlay */}
          {nodes.map((node, i) => {
            const isLeftOffset = node.x < 500;
            return (
              <div 
                key={i} 
                className="absolute z-20 group cursor-pointer" 
                style={{ left: `${node.x / 10}%`, top: `${node.y / 5}%` }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Node Target Core Touch Area */}
                <div className="relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-transparent group-hover:bg-cyan-500/10 border border-transparent group-hover:border-cyan-500/30 transition-all duration-300" />
                </div>

                {/* Micro Readout tag below node */}
                <div className="absolute -translate-x-1/2 mt-1.5 flex flex-col items-center pointer-events-none">
                  <span className="text-[8px] font-mono font-bold tracking-wider text-zinc-400 group-hover:text-white transition-colors duration-300 uppercase whitespace-nowrap bg-black/40 px-1 py-0.5 rounded border border-white/5 backdrop-blur-xs">
                    {node.id}
                  </span>
                  <span className="text-[7.5px] font-mono font-semibold text-cyan-400 mt-0.5">
                    {node.latency}
                  </span>
                </div>

                {/* Floating telemetry console on hover */}
                <AnimatePresence>
                  {activeNode === node.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute z-30 pointer-events-none p-4 rounded-xl bg-[#09090c]/95 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur min-w-[200px] leading-relaxed text-left text-xs text-zinc-350 -translate-y-[155px] ${isLeftOffset ? 'left-6' : 'right-6 -translate-x-full'}`}
                    >
                      <div className="flex justify-between items-center border-b border-white/10 pb-1.5 mb-1.5 font-mono">
                        <span className="font-bold text-white uppercase tracking-wider">{node.label}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="space-y-1 text-[10px] font-mono">
                        <p><span className="text-zinc-500 uppercase tracking-widest font-bold">IP ASSIGN:</span> <span className="text-white">{node.ip}</span></p>
                        <p><span className="text-zinc-500 uppercase tracking-widest font-bold">FUNCTION:</span> <span className="text-white">{node.role}</span></p>
                        <p><span className="text-zinc-500 uppercase tracking-widest font-bold">LATENCY:</span> <span className="text-cyan-400 font-bold">{node.latency}</span></p>
                        <p><span className="text-zinc-500 uppercase tracking-widest font-bold">BANDWIDTH:</span> <span className="text-white">{node.throughput}</span></p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Console Left Card: Jitter & Routing Statistics (Top Left Overlay) */}
          <div className="absolute top-6 left-6 text-left flex flex-col gap-4 z-20 hidden md:flex max-w-[280px] bg-[#0a0a0d]/85 backdrop-blur border border-white/[0.08] p-4 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div>
                <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Mesh Telemetry</span>
                <p className="text-[7.5px] text-zinc-500 font-mono tracking-wider uppercase mt-0.5">Live routing metrics</p>
              </div>
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </div>
            
            <div className="space-y-2 text-[9px] font-mono leading-none">
              {nodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between hover:bg-white/[0.02] p-1 rounded transition-colors">
                  <span className="text-zinc-500">{node.label.split(" (")[0]}</span>
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    {node.id === "Virginia" ? latencies.Virginia : 
                     node.id === "London" ? latencies.London : 
                     node.id === "Mumbai" ? latencies.Mumbai : latencies.Singapore}ms
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-2 text-[8px] font-mono text-zinc-500 flex justify-between items-center leading-none">
              <span>Transit: Multi-VPC Tunnel</span>
              <span className="text-cyan-400 font-bold">SOP-Bound SLA</span>
            </div>
          </div>

          {/* Console Bottom Left Card: Compliance & Policy Checkpoints */}
          <div className="absolute bottom-6 left-6 text-left z-20 hidden md:flex flex-col gap-2 bg-[#0a0a0d]/85 backdrop-blur border border-white/[0.08] p-4 rounded-2xl max-w-[280px] shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold">Governance Filters</span>
            </div>
            <div className="space-y-1.5">
              {routes.map((route, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[9px] font-mono text-zinc-400 hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                  <span className="font-bold text-zinc-500 uppercase">{route.from.slice(0, 3)} ➔ {route.to.slice(0, 3)}:</span>
                  <span className="font-medium text-[8.5px]">{route.checkpoint}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Console Bottom Right Card: Active VPC Isolation Panel */}
          <div className="absolute bottom-6 right-6 text-right bg-[#0a0a0d]/85 backdrop-blur border border-white/[0.08] px-5 py-4 rounded-2xl min-w-[170px] shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex flex-col gap-1.5">
            <div className="flex justify-end items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Operational Nodes</span>
            </div>
            <span className="text-lg font-bold text-white font-mono uppercase tracking-tight">VPC ISOLATED</span>
            <div className="flex flex-col text-[8.5px] font-mono text-zinc-500 mt-1 space-y-0.5 border-t border-white/5 pt-2">
              <p>Packets Tx: <span className="text-cyan-400 font-bold">{livePackets.toLocaleString()}</span></p>
              <p>Failover Register: <span className="text-white">Active</span></p>
              <p>Crypto Check: <span className="text-purple-400 font-bold">SHA-256 Valid</span></p>
            </div>
          </div>

        </div>

        {/* Small Screen Fallback Diagnostics (List grid shown under map container on small mobile viewports) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 md:hidden">
          <div className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/[0.06] text-left">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white font-mono uppercase">Multi-Region Latency</h4>
            </div>
            <div className="space-y-2 text-[11px] font-mono text-zinc-400">
              <p>US-EAST (Virginia): <span className="text-white font-bold">{latencies.Virginia}ms</span></p>
              <p>UK-SOUTH (London): <span className="text-white font-bold">{latencies.London}ms</span></p>
              <p>AP-SOUTH (Mumbai): <span className="text-white font-bold">{latencies.Mumbai}ms</span></p>
              <p>AP-SE (Singapore): <span className="text-white font-bold">{latencies.Singapore}ms</span></p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0a0a0d] border border-white/[0.06] text-left">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white font-mono uppercase">Governance Logs</h4>
            </div>
            <ul className="space-y-1.5 text-[10px] font-mono text-zinc-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 shrink-0" /> Ingress PII Scrubbing Gate</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0" /> Transit FSM Policy Filter</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" /> Edge Audit Ledger Checkpoint</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 shrink-0" /> VPC isolated routing active</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
