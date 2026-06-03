"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Server, Zap, CheckCircle2, AlertCircle, Clock, Database, Lock, Globe, Info } from "lucide-react";
import Link from "next/link";

interface Service {
  name: string;
  uptime: string;
  status: "operational" | "degraded" | "outage";
  icon: any;
  desc: string;
}

interface RegionalNode {
  id: string;
  name: string;
  location: string;
  status: "operational" | "degraded";
  ping: number;
  throughput: number;
  cx: number;
  cy: number;
}

export default function StatusPage() {
  const [throughput, setThroughput] = useState(24.5);
  const [latency, setLatency] = useState(42);
  const [selectedNode, setSelectedNode] = useState<string>("hyd");

  const [regionalNodes, setRegionalNodes] = useState<Record<string, RegionalNode>>({
    hyd: {
      id: "hyd",
      name: "Core Orchestrator Scheduler",
      location: "Hyderabad, India (HQ)",
      status: "operational",
      ping: 42,
      throughput: 12.4,
      cx: 600,
      cy: 180
    },
    ore: {
      id: "ore",
      name: "Americas Edge Ingest",
      location: "Oregon, USA",
      status: "operational",
      ping: 112,
      throughput: 6.8,
      cx: 150,
      cy: 100
    },
    fra: {
      id: "fra",
      name: "EU Ingestion & Egress",
      location: "Frankfurt, Germany",
      status: "operational",
      ping: 85,
      throughput: 5.3,
      cx: 460,
      cy: 90
    },
    nrt: {
      id: "nrt",
      name: "Asia-Pacific Gateway",
      location: "Tokyo, Japan",
      status: "operational",
      ping: 98,
      throughput: 4.1,
      cx: 720,
      cy: 110
    }
  });

  // Ticker for fluctuating telemetries
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput((prev) => Math.max(10, Math.min(60, +(prev + (Math.random() * 4 - 2)).toFixed(1))));
      setLatency((prev) => Math.max(30, Math.min(90, Math.floor(prev + (Math.random() * 6 - 3)))));
      
      setRegionalNodes(prev => ({
        hyd: { ...prev.hyd, ping: Math.max(35, Math.min(50, Math.floor(prev.hyd.ping + (Math.random() * 4 - 2)))), throughput: Math.max(10, Math.min(15, +(prev.hyd.throughput + (Math.random() * 0.8 - 0.4)).toFixed(1))) },
        ore: { ...prev.ore, ping: Math.max(105, Math.min(125, Math.floor(prev.ore.ping + (Math.random() * 8 - 4)))), throughput: Math.max(5, Math.min(9, +(prev.ore.throughput + (Math.random() * 0.4 - 0.2)).toFixed(1))) },
        fra: { ...prev.fra, ping: Math.max(80, Math.min(95, Math.floor(prev.fra.ping + (Math.random() * 6 - 3)))), throughput: Math.max(4, Math.min(7, +(prev.fra.throughput + (Math.random() * 0.4 - 0.2)).toFixed(1))) },
        nrt: { ...prev.nrt, ping: Math.max(90, Math.min(105, Math.floor(prev.nrt.ping + (Math.random() * 6 - 3)))), throughput: Math.max(3, Math.min(6, +(prev.nrt.throughput + (Math.random() * 0.4 - 0.2)).toFixed(1))) }
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const services: Service[] = [
    {
      name: "MitraAI Model Routing Gateway",
      uptime: "99.98%",
      status: "operational",
      icon: Zap,
      desc: "API proxy and routing dispatcher coordinating foundation model sub-nodes."
    },
    {
      name: "Deterministic Verification Scheduler",
      uptime: "100.00%",
      status: "operational",
      icon: Activity,
      desc: "Finite state machine scheduling code-enforced SOP guidelines."
    },
    {
      name: "PII Ingress Sanitization Egress Shield",
      uptime: "99.99%",
      status: "operational",
      icon: Lock,
      desc: "Data scrubbing layer ensuring automatic variable tokenization and scrubbing."
    },
    {
      name: "Signed Audit Database Ledger",
      uptime: "99.97%",
      status: "operational",
      icon: Database,
      desc: "Immutable PostgreSQL transaction ledger storing execution cryptographic keys."
    },
    {
      name: "Multi-Agent Worker Subnets",
      uptime: "99.95%",
      status: "operational",
      icon: Server,
      desc: "Isolated server resources executing parallel document extraction & audit steps."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden font-sans">
      {/* Background ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-950/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Live Telemetry</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Platform Operational <br /> <span className="text-gray-500">Status &amp; Uptime</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-medium">
            Uptime monitoring, regional endpoint latencies, and transaction heartbeats across Aashray AI Labs' subnets.
          </p>
        </div>

        {/* Pulsing Status Banner */}
        <section className="mb-12">
          <div className="p-6 rounded-3xl bg-[#050505] border border-emerald-500/20 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.02)]">
            <div className="flex items-center gap-4">
              <span className="flex h-4 w-4 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">All Orchestration Subnets Active</h3>
                <p className="text-xs text-gray-400 mt-0.5">Systems are fully operational. Telemetries are updating in real-time.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-xl uppercase">
              Uptime Check: 99.98%
            </span>
          </div>
        </section>

        {/* Regional subnets map & side info */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT: Regional Map SVG (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-[#050505] border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white">Global Subnet Operations</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Click regional hubs to query local telemetry limits.</p>
                </div>
                <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/10 bg-cyan-950/20 px-2 py-0.5 rounded">
                  4 Active Nodes
                </span>
              </div>

              {/* Map SVG */}
              <div className="bg-[#020202] border border-white/[0.03] rounded-2xl p-4 flex items-center justify-center relative aspect-[2/1] overflow-hidden">
                <svg className="w-full h-full text-neutral-800 opacity-40" viewBox="0 0 800 350" fill="none">
                  {/* Stylized world map dots */}
                  <rect x="100" y="50" width="10" height="10" rx="2" fill="currentColor" />
                  <rect x="140" y="80" width="15" height="15" rx="3" fill="currentColor" />
                  <rect x="220" y="200" width="8" height="8" rx="2" fill="currentColor" />
                  <rect x="300" y="260" width="12" height="12" rx="2" fill="currentColor" />
                  <rect x="420" y="70" width="20" height="20" rx="4" fill="currentColor" />
                  <rect x="450" y="110" width="10" height="10" rx="2" fill="currentColor" />
                  <rect x="580" y="150" width="14" height="14" rx="3" fill="currentColor" />
                  <rect x="680" y="90" width="16" height="16" rx="4" fill="currentColor" />
                  <rect x="740" y="210" width="10" height="10" rx="2" fill="currentColor" />

                  {/* Draw latency ping pathways from hyd */}
                  <path d="M 600 180 Q 530 135 460 90" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 600 180 Q 375 140 150 100" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 600 180 Q 660 145 720 110" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Glowing pulses */}
                  <circle cx="600" cy="180" r="6" fill="#06b6d4" className="animate-ping opacity-30" />
                </svg>

                {/* Overlay regional buttons */}
                {Object.values(regionalNodes).map((node) => {
                  const isActive = selectedNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className="absolute group -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{ left: `${(node.cx / 800) * 100}%`, top: `${(node.cy / 350) * 100}%` }}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all ${
                        isActive 
                          ? "bg-cyan-500 border-white shadow-[0_0_10px_#06b6d4]" 
                          : "bg-neutral-900 border-white/20 group-hover:border-cyan-400"
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      </span>
                      <span className="hidden sm:block text-[8px] font-mono font-bold mt-1 bg-black/85 px-1.5 py-0.5 rounded border border-white/5 text-gray-400 group-hover:text-white whitespace-nowrap">
                        {node.id.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Node details info (4 cols) */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#050505] border border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono text-gray-500 font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                  Node Telemetry Inspector
                </h3>

                {selectedNode && regionalNodes[selectedNode] ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-white">{regionalNodes[selectedNode].name}</h4>
                      <p className="text-xs text-gray-400 font-medium mt-1">{regionalNodes[selectedNode].location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#080808] border border-white/5 rounded-xl">
                        <span className="text-[9px] text-gray-500 font-mono block mb-1">LATENCY PING</span>
                        <span className="text-sm font-bold text-white font-mono">{regionalNodes[selectedNode].ping} ms</span>
                      </div>
                      <div className="p-3 bg-[#080808] border border-white/5 rounded-xl">
                        <span className="text-[9px] text-gray-500 font-mono block mb-1">THROUGHPUT</span>
                        <span className="text-sm font-bold text-white font-mono">{regionalNodes[selectedNode].throughput} req/s</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#020202] border border-white/5 rounded-xl font-mono text-[9px] text-gray-500 space-y-1.5">
                      <div className="flex justify-between">
                        <span>SUBNET IP</span>
                        <span className="text-gray-400">10.140.{selectedNode === "hyd" ? "10" : selectedNode === "ore" ? "20" : "30"}.1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LEDGER SYNC</span>
                        <span className="text-emerald-400">SYNCHRONIZED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SSL CLEARANCE</span>
                        <span className="text-gray-400">TLS 1.3 SECURED</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 font-medium">Select a node on the map to inspect variables.</p>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 mt-6 flex items-center gap-2 text-[10px] text-gray-500">
                <Info className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                <span>All telemetry metrics update via live client-side event loops.</span>
              </div>
            </div>

          </div>
        </section>

        {/* Component uptime monitors */}
        <section className="mb-16">
          <h2 className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-6 font-semibold">Subnet Performance Registers</h2>
          <div className="space-y-4">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-[#050505] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <service.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{service.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium mt-1">{service.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 self-stretch md:self-auto justify-between border-t border-white/[0.03] md:border-none pt-3 md:pt-0 mt-2 md:mt-0 font-mono">
                  <div>
                    <span className="text-[9px] text-gray-500 block mb-0.5 uppercase tracking-wider">UPTIME</span>
                    <span className="text-xs font-bold text-white">{service.uptime}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block mb-0.5 uppercase tracking-wider">STATUS</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Historical Logs */}
        <section className="mb-12">
          <h2 className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-6 font-semibold">Incident Registry Log</h2>
          <div className="p-6 rounded-3xl bg-[#050505] border border-white/5 space-y-6">
            
            <div className="flex gap-4 items-start">
              <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">May 18, 2026 - Third-Party Model API Latency Spike</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed font-medium">
                  Model Gateway observed latency anomalies exceeding 4000ms from third-party vendor APIs. The local routing scheduler initiated fallback routing to secondary private subnets. Resolved in 6 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start pt-6 border-t border-white/[0.03]">
              <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">April 29, 2026 - Scheduled Database Ledger Pruning</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed font-medium">
                  Routine schema indexing and archiving of historic signed logs. Completed under standard 15-minute maintenance window. Zero systems interruption recorded.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start pt-6 border-t border-white/[0.03]">
              <Clock className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">March 12, 2026 - Model Gateway Systems Patch 2.4.1</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed font-medium">
                  Deployed performance upgrades to the PII sanitization regex matching algorithm. Network throughput bounds expanded by 15%. Completed with 0% traffic loss.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Status Disclaimer */}
        <div className="p-4 bg-[#080808] border border-white/5 rounded-2xl text-[10px] text-gray-500 text-center leading-relaxed">
          Operational telemetries represent simulated performance limits, latency bounds, and systems logging traces constructed for testing and engineering demonstrative purposes unless explicitly linked to a customer SLA dashboard key.
        </div>

      </div>
    </div>
  );
}
