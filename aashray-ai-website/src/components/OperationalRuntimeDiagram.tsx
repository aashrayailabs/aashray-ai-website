"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Cpu, Network, Lock, Globe, Database, Pause } from "lucide-react";

type PipelineStage = "input" | "sanitize" | "process" | "route" | "deliver";

interface LogLine {
  timestamp: string;
  module: string;
  level: "INFO" | "WARN" | "SUCCESS";
  message: string;
}

const pipelineData: Record<PipelineStage, { label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; desc: string; logs: string[] }> = {
  input: {
    label: "Input", icon: Globe, desc: "Webhook Ingestion & Auth",
    logs: [
      "POST /v1/webhook_ingress from client_ip=104.22.45.19",
      "HMAC signature verification succeeded",
      "Token verification: JWT validated scope=[write:workflows]"
    ]
  },
  sanitize: {
    label: "Sanitize", icon: ShieldCheck, desc: "PII Scrub & Governance",
    logs: [
      "Ingress payload scan initiated for corporate compliance",
      "PII Scrub matched field=email action=mask_sha256",
      "Safety compliance score checked: 0.99 (cleared)"
    ]
  },
  process: {
    label: "Process", icon: Cpu, desc: "Stateful Execution DAG",
    logs: [
      "Spawning state machine instance run_id=f83e-92a1",
      "Mapping DAG edges dynamically based on context",
      "State lock acquired for run_id=f83e-92a1"
    ]
  },
  route: {
    label: "Route", icon: Network, desc: "Model & Agent Routing",
    logs: [
      "Model routing initiated: local model fallback prioritized",
      "Dispatching task to specialized sub-agent topology",
      "Latency optimized routing path confirmed"
    ]
  },
  deliver: {
    label: "Deliver", icon: Database, desc: "Audit Commit & Webhook Out",
    logs: [
      "State transition logged for Commit #99824",
      "Audit signature verified for workflow run_id=f83e",
      "Ledger entry committed to immutable replica nodes"
    ]
  }
};

const stages: PipelineStage[] = ["input", "sanitize", "process", "route", "deliver"];

export default function OperationalRuntimeDiagram() {
  const [activeStage, setActiveStage] = useState<PipelineStage>("input");
  const [isLive, setIsLive] = useState<boolean>(true);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-cycle stages and generate logs
  useEffect(() => {
    if (!isLive) return;

    let stageIndex = stages.indexOf(activeStage);
    const interval = setInterval(() => {
      stageIndex = (stageIndex + 1) % stages.length;
      const nextStage = stages[stageIndex];
      setActiveStage(nextStage);
      
      const timeStr = new Date().toLocaleTimeString();
      const pool = pipelineData[nextStage].logs;
      setLogs((prev: LogLine[]) => {
        const newLogs: LogLine[] = [...prev, {
          timestamp: timeStr,
          module: nextStage.toUpperCase(),
          level: (Math.random() > 0.85 ? "WARN" : Math.random() > 0.6 ? "SUCCESS" : "INFO") as LogLine["level"],
          message: pool[Math.floor(Math.random() * pool.length)]
        }];
        return newLogs.slice(Math.max(newLogs.length - 15, 0)); // Keep last 15
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [activeStage, isLive]);

  // Initial Logs
  useEffect(() => {
    const initialLogs: LogLine[] = [];
    const now = new Date();
    for (let i = 0; i < 5; i++) {
      const timeStr = new Date(now.getTime() - (5 - i) * 1000).toLocaleTimeString();
      initialLogs.push({
        timestamp: timeStr,
        module: "SYSTEM",
        level: "INFO",
        message: "Initializing Mitra OS orchestration runtime..."
      });
    }
    setLogs(initialLogs);
  }, []);

  // Autoscroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <section className="section-dark py-16 md:py-24 lg:py-32 relative overflow-hidden border-t border-white/[0.04] bg-[#0a0a0c]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/10 via-black to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[9px] font-mono text-cyan-300 tracking-widest uppercase font-bold">Active Operational Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-4 font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-50 to-zinc-400">
            Real-Time Execution Engine
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Interactive system schematics tracing webhook ingestion, async execution loops, safety filters, and immutable logging.
          </p>
        </div>

        {/* Console Container */}
        <div className="flex flex-col gap-8 relative">
          
          {/* Ambient Particles Layer behind Panel - hidden on mobile for GPU performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
            <motion.div 
              className="absolute w-2 h-2 rounded-full bg-cyan-400/30 blur-[2px]"
              animate={{ y: [0, -100, 0], x: [0, 50, 0], opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ top: "80%", left: "20%" }}
            />
            <motion.div 
              className="absolute w-3 h-3 rounded-full bg-blue-500/30 blur-[3px]"
              animate={{ y: [0, -150, 0], x: [0, -80, 0], opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ top: "70%", right: "15%" }}
            />
            <motion.div 
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/40 blur-[1px]"
              animate={{ y: [0, -120, 0], x: [0, 30, 0], opacity: [0.1, 0.7, 0.1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ top: "90%", left: "50%" }}
            />
          </div>

          {/* TOP: Huge Cinematic Schematic Block */}
          <div className="bg-[#0c0d12]/60 md:backdrop-blur-[40px] border border-white/[0.06] md:border-x md:border-b md:border-white/[0.04] md:border-t md:border-t-white/[0.1] rounded-2xl md:rounded-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-14 lg:pt-10 lg:pb-12 md:min-h-[500px] flex flex-col justify-between relative shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] overflow-hidden z-10">
            
            {/* Ambient glows inside panel */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/[0.04] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.04] mix-blend-screen pointer-events-none" />
            {/* Tiny noise texture */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-cyan-900/15 blur-[150px] rounded-full pointer-events-none" />

            <div className="flex justify-between items-center border-b border-white/[0.08] pb-4 md:pb-5 mb-6 md:mb-8 relative z-20">
              <span className="text-[10px] sm:text-xs font-mono text-zinc-100 tracking-widest uppercase font-bold flex items-center gap-2 drop-shadow-md">
                <Network className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" /> <span className="hidden sm:inline">ENTERPRISE</span> PIPELINE TOPOLOGY
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-white/5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.9)]" />
                <span className="text-[8px] sm:text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider drop-shadow-md">Nominal</span>
              </div>
            </div>

            {/* Pipeline Visualizations */}
            <div className="flex-1 flex flex-col items-center justify-center pt-2 pb-4 md:pb-8 relative z-10 w-full max-w-6xl mx-auto">
              
              {/* Animated Connection Line — desktop only */}
              <div className="absolute top-[35%] left-[10%] right-[10%] h-[2px] bg-zinc-900/80 -translate-y-1/2 rounded-full overflow-hidden hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-60 w-full h-full" />
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_10px_#3b82f6]"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
                />
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#06b6d4]"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2.4 }}
                />
              </div>

              {/* Nodes — horizontal on desktop, vertical scrollable on mobile */}
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0 w-full relative z-20 mt-2 md:mt-4">
                {stages.map((stageId, idx) => {
                  const stage = pipelineData[stageId];
                  const isActive = activeStage === stageId;
                  const Icon = stage.icon;
                  
                  return (
                    <div key={stageId} className="flex md:flex-col items-center gap-3 md:gap-5 relative group cursor-pointer w-full md:w-28 lg:w-32 py-2 md:py-0" onClick={() => setActiveStage(stageId)}>
                      
                      {/* Node Glow — desktop only */}
                      {isActive && (
                        <motion.div 
                          layoutId="activeGlow"
                          className="absolute top-1/2 md:top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 h-32 md:h-48 bg-cyan-500/30 blur-[40px] md:blur-[55px] rounded-full pointer-events-none hidden md:block"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                        />
                      )}

                      {/* Icon Box */}
                      <motion.div 
                        className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-700 relative shrink-0 ${
                          isActive 
                            ? "bg-[#060b14]/90 border border-cyan-400/90 shadow-[0_0_30px_rgba(6,182,212,0.4)] md:shadow-[0_0_50px_rgba(6,182,212,0.5),inset_0_0_25px_rgba(6,182,212,0.25)]" 
                            : "bg-black/90 border border-white/[0.05] shadow-md hover:border-white/10"
                        }`}
                        animate={{ y: isActive ? (typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0) : 0, scale: isActive ? 1.05 : 1 }}
                      >
                        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors duration-700 ${
                          isActive ? "text-cyan-300 drop-shadow-[0_0_18px_rgba(6,182,212,1)]" : "text-zinc-700/70"
                        }`} />
                        
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl md:rounded-3xl animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-[0.25]" />
                        )}
                      </motion.div>

                      {/* Labels */}
                      <div className="flex flex-col items-start md:items-center gap-0.5 md:gap-2 md:mt-2">
                        <span className={`text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider md:tracking-widest font-display transition-colors duration-500 ${
                          isActive ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" : "text-zinc-500"
                        }`}>
                          {stage.label}
                        </span>
                        <span className={`text-[10px] sm:text-xs font-mono md:max-w-[130px] md:text-center transition-colors duration-500 leading-relaxed font-semibold ${
                          isActive ? "text-cyan-200" : "text-zinc-700/60"
                        }`}>
                          {stage.desc}
                        </span>
                      </div>

                      {/* Mobile connector line between nodes */}
                      {idx < stages.length - 1 && (
                        <div className="md:hidden absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-4 bg-zinc-800" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom State Readouts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 pt-6 md:pt-8 mt-6 md:mt-10 border-t border-white/[0.06] text-[9px] sm:text-[10px] md:text-xs font-mono leading-none text-zinc-400 relative z-20">
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="uppercase tracking-widest block mb-2 font-bold text-zinc-500">Active State</span>
                <span className="text-white font-bold tracking-widest">NOMINAL</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-cyan-900/30 shadow-[inset_0_0_15px_rgba(6,182,212,0.05)]">
                <span className="uppercase tracking-widest block mb-2 font-bold text-zinc-500">Failover Reg</span>
                <span className="text-cyan-400 font-bold uppercase tracking-widest drop-shadow-md">ACTIVE</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="uppercase tracking-widest block mb-2 font-bold text-zinc-500">Verification</span>
                <span className="text-blue-400 font-bold tracking-widest">PROGRAMMATIC</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-inner">
                <span className="uppercase tracking-widest block mb-2 font-bold text-zinc-500">Throughput</span>
                <span className="text-emerald-400 font-bold tracking-widest">42.8K REQ/S</span>
              </div>
            </div>
          </div>

          {/* BOTTOM: Real-time Terminal Logs & Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Terminal Widget */}
            <div className="lg:col-span-2 bg-[#0a0b0e] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between h-[320px] shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-md">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono text-zinc-200 uppercase tracking-widest font-bold">Live Execution Stream</span>
                </div>
                <button 
                  onClick={() => setIsLive(!isLive)}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-mono font-bold uppercase transition-all flex items-center gap-2 ${
                    isLive 
                      ? "bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900/50" 
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  {isLive ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      STREAMING
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3" />
                      PAUSED
                    </>
                  )}
                </button>
              </div>

              {/* Logs Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar text-[11px] font-mono leading-relaxed text-left text-zinc-300">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 hover:bg-white/[0.02] p-1.5 rounded-md transition-colors duration-200">
                    <span className="text-zinc-500 shrink-0 mt-0.5">{log.timestamp}</span>
                    <span className={`font-bold shrink-0 uppercase text-[9px] px-1.5 py-0.5 rounded ${
                      log.level === "SUCCESS" 
                        ? "bg-emerald-950/30 text-emerald-400 border border-emerald-500/30" 
                        : log.level === "WARN" 
                        ? "bg-amber-950/30 text-amber-400 border border-amber-500/30" 
                        : "bg-cyan-950/30 text-cyan-400 border border-cyan-500/30"
                    }`}>
                      {log.module}
                    </span>
                    <span className="text-zinc-300">{log.message}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Quick Metrics Readout */}
            <div className="lg:col-span-1 p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-[320px] backdrop-blur-md">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold mb-6 border-b border-white/10 pb-4">
                Global Edge Network
              </h3>
              
              <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5">Average Processing Jitter</p>
                  <p className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-1">0.18 <span className="text-sm text-zinc-500">ms</span></p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5">Model Edge Inference</p>
                  <p className="text-xl font-bold text-cyan-400 tracking-tight shadow-cyan-400">Locally Prioritized</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5">VPC Data Isolation</p>
                  <p className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    AES-256 Encrypted
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
