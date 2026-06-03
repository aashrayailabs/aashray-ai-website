"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Server, Activity, Database, CheckCircle2, AlertTriangle, 
  Terminal, ShieldCheck, Play, ArrowRight, Layers, Users, Zap, RefreshCw, Info, Lock 
} from "lucide-react";
import Link from "next/link";

interface NodeData {
  id: string;
  name: string;
  type: string;
  status: "idle" | "active" | "error" | "completed";
  latency: string;
  throughput: string;
  description: string;
  logs: string[];
}

export default function DashboardPage() {
  const [selectedWorkspace, setSelectedWorkspace] = useState("mitra-insurance-prod");
  const [operationsCount, setOperationsCount] = useState(14820);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<string>("router");
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Initial node structures
  const [nodes, setNodes] = useState<Record<string, NodeData>>({
    ingest: {
      id: "ingest",
      name: "API Ingest Gateway",
      type: "network",
      status: "completed",
      latency: "14ms",
      throughput: "24.5 req/s",
      description: "Edge ingestion point handling payload normalization and PII sanitization filters.",
      logs: [
        "INGEST: Connection established from 192.168.10.4",
        "INGEST: Parsing claims JSON payload...",
        "SECURITY: PII Sanitizer scrubbed SSN & Credit Card fields.",
        "INGEST: Normalized struct passed to routing queue."
      ]
    },
    router: {
      id: "router",
      name: "Deterministic Router",
      type: "compute",
      status: "active",
      latency: "42ms",
      throughput: "18.2 req/s",
      description: "Classifies documents against pre-defined corporate SOP rulesets.",
      logs: [
        "ROUTER: Received payload ID #881-A",
        "ROUTER: Evaluated schema matching SLA_CLAIM_REIMBURSE",
        "ROUTER: Triggering parallel validation on Fraud & Risk nodes."
      ]
    },
    fraud: {
      id: "fraud",
      name: "Fraud Scan Engine",
      type: "validation",
      status: "idle",
      latency: "85ms",
      throughput: "12.0 req/s",
      description: "Analyzes claims files for anomalies, duplicates, and statistical outliers.",
      logs: [
        "FRAUD: Checking transaction history of user U-881",
        "FRAUD: Evaluated metadata signatures. No anomalies detected.",
        "FRAUD: Output score: 0.02 (Low Risk)"
      ]
    },
    risk: {
      id: "risk",
      name: "Risk Valuation Node",
      type: "validation",
      status: "idle",
      latency: "120ms",
      throughput: "12.0 req/s",
      description: "Validates claimant policy limits, deductibles, and financial constraints.",
      logs: [
        "RISK: Fetching active policy details for POL-901-B",
        "RISK: Calculating outstanding deductible balance: $250.00",
        "RISK: Verified threshold request falls within approved liability parameters."
      ]
    },
    human: {
      id: "human",
      name: "Human Verification Gate",
      type: "gate",
      status: "idle",
      latency: "N/A",
      throughput: "2.1 reviews/m",
      description: "Human-in-the-loop auth queue triggered when transactions exceed limits.",
      logs: [
        "HITL: Awaiting security validation key from usr_compliance_manager.",
        "HITL: Queue state: 0 active requests pending signature."
      ]
    },
    egress: {
      id: "egress",
      name: "Signed Egress Ledger",
      type: "database",
      status: "idle",
      latency: "28ms",
      throughput: "45.0 req/s",
      description: "Writes state transitions to immutable audit ledger and updates DB records.",
      logs: [
        "EGRESS: Compiling cryptographic execution block.",
        "AUDIT: Signed SHA-256 state transaction block registered.",
        "EGRESS: Dispatched Webhook trigger to client payment API."
      ]
    }
  });

  // Simulated log generator
  useEffect(() => {
    const logsList = [
      "SYSTEM: CPU load at 14.5% across server clusters.",
      "SECURITY: Executed routine credential rotation.",
      "INGEST: Normalizing incoming lease document...",
      "ROUTER: SOP classified payload #912-C successfully.",
      "RISK: Validation node processed claim in 118ms.",
      "SYSTEM: Cache sync completed on 8 node subnets."
    ];

    const interval = setInterval(() => {
      const randomLog = logsList[Math.floor(Math.random() * logsList.length)];
      const time = new Date().toLocaleTimeString();
      setLiveLogs(prev => [...prev.slice(-30), `[${time}] ${randomLog}`]);
      setOperationsCount(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Scroll logs to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [liveLogs]);

  // Inject visual task simulation
  const handleInjectTask = async () => {
    if (activeStep !== null) return;
    
    // Step 1: Ingest
    setActiveStep(1);
    setNodes(prev => ({
      ...prev,
      ingest: { ...prev.ingest, status: "active" },
      router: { ...prev.router, status: "idle" },
      fraud: { ...prev.fraud, status: "idle" },
      risk: { ...prev.risk, status: "idle" },
      human: { ...prev.human, status: "idle" },
      egress: { ...prev.egress, status: "idle" }
    }));
    
    // Step 2: Router
    await new Promise(r => setTimeout(r, 1200));
    setActiveStep(2);
    setNodes(prev => ({
      ...prev,
      ingest: { ...prev.ingest, status: "completed" },
      router: { ...prev.router, status: "active" }
    }));

    // Step 3: Fraud & Risk in Parallel
    await new Promise(r => setTimeout(r, 1200));
    setActiveStep(3);
    setNodes(prev => ({
      ...prev,
      router: { ...prev.router, status: "completed" },
      fraud: { ...prev.fraud, status: "active" },
      risk: { ...prev.risk, status: "active" }
    }));

    // Step 4: Human
    await new Promise(r => setTimeout(r, 1500));
    setActiveStep(4);
    setNodes(prev => ({
      ...prev,
      fraud: { ...prev.fraud, status: "completed" },
      risk: { ...prev.risk, status: "completed" },
      human: { ...prev.human, status: "active" }
    }));

    // Step 5: Egress
    await new Promise(r => setTimeout(r, 1200));
    setActiveStep(5);
    setNodes(prev => ({
      ...prev,
      human: { ...prev.human, status: "completed" },
      egress: { ...prev.egress, status: "active" }
    }));

    // Completed
    await new Promise(r => setTimeout(r, 1000));
    setActiveStep(null);
    setNodes(prev => ({
      ...prev,
      egress: { ...prev.egress, status: "completed" }
    }));
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden font-sans">
      
      {/* Ambience grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-cyan-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-semibold">Command Center Interface</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">MitraAI Ecosystem Controller</h1>
          </div>

          <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
            {/* Workspace Select */}
            <div className="relative">
              <select
                value={selectedWorkspace}
                onChange={(e) => setSelectedWorkspace(e.target.value)}
                className="bg-[#050505] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-cyan-500/30 cursor-pointer appearance-none pr-10"
              >
                <option value="mitra-insurance-prod">MitraAI Insurance (Production)</option>
                <option value="mitra-realty-prod">MitraAI Realty (Production)</option>
                <option value="mitra-health-sandbox">MitraAI Healthcare (Sandbox)</option>
                <option value="mitra-enterprise-staging">MitraAI Enterprise (Staging)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Simulated Action */}
            <button
              onClick={handleInjectTask}
              disabled={activeStep !== null}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                activeStep !== null
                  ? "bg-[#050505] border-white/5 text-gray-500"
                  : "bg-cyan-500 text-black border-cyan-400 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Inject Payload Run</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Pipelines", val: "12 / 12", desc: "All subnets running", icon: Server },
            { label: "Operations Logged", val: operationsCount.toLocaleString(), desc: "Syncing live ledgers", icon: Activity },
            { label: "Average Node Latency", val: "42ms", desc: "Under SLA threshold", icon: Zap },
            { label: "Secure Isolation Status", val: "Stateless", desc: "Private VPC partition", icon: Lock }
          ].map((metric, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#050505] border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase font-semibold">{metric.label}</span>
                <metric.icon className="w-4 h-4 text-cyan-500/80" />
              </div>
              <p className="text-xl font-bold text-white tracking-tight mb-1 font-mono">{metric.val}</p>
              <p className="text-[10px] text-gray-500 font-medium">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* Topology map panel (8 cols) */}
          <div className="lg:col-span-8 flex flex-col p-6 rounded-3xl border border-white/5 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.01] blur-xl rounded-full" />
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-white">Active Operational Routing Topology</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Click any node to inspect execution variables and live logs.</p>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10 uppercase">
                Interactive Grid
              </span>
            </div>

            {/* SVG Pipeline Map */}
            <div className="flex-1 bg-[#020202] rounded-2xl border border-white/[0.03] p-8 aspect-[16/9] flex items-center justify-center relative min-h-[300px]">
              
              {/* SVG Connector Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 350" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="activePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* static paths */}
                <path d="M 120 175 C 200 175, 200 175, 280 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 280 175 C 340 175, 340 100, 400 100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 280 175 C 340 175, 340 250, 400 250" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 400 100 C 465 100, 465 175, 520 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 400 250 C 465 250, 465 175, 520 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 520 175 C 600 175, 600 175, 680 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />

                {/* dynamic flow path animations */}
                {activeStep === 1 && (
                  <motion.path d="M 120 175 H 280" fill="none" stroke="url(#activePulse)" strokeWidth="2.5"
                    initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                )}
                {activeStep === 2 && (
                  <>
                    <motion.path d="M 280 175 C 340 175, 340 100, 400 100" fill="none" stroke="url(#activePulse)" strokeWidth="2.5"
                      initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                    <motion.path d="M 280 175 C 340 175, 340 250, 400 250" fill="none" stroke="url(#activePulse)" strokeWidth="2.5"
                      initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <motion.path d="M 400 100 C 465 100, 465 175, 520 175" fill="none" stroke="url(#activePulse)" strokeWidth="2.5"
                      initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                    <motion.path d="M 400 250 C 465 250, 465 175, 520 175" fill="none" stroke="url(#activePulse)" strokeWidth="2.5"
                      initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                  </>
                )}
                {activeStep === 4 && (
                  <motion.path d="M 520 175 H 680" fill="none" stroke="url(#activePulse)" strokeWidth="2.5"
                    initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                )}
              </svg>

              {/* Node Placements */}
              <div className="absolute inset-0 flex justify-between items-center px-12 pb-4">
                
                {/* Node: Ingest */}
                <div 
                  onClick={() => setSelectedNode("ingest")}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    selectedNode === "ingest" ? "scale-105" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    nodes.ingest.status === "active" 
                      ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse"
                      : selectedNode === "ingest"
                        ? "bg-[#0c0c0c] border-cyan-500/40"
                        : "bg-[#050505] border-white/5 hover:border-white/15"
                  }`}>
                    <Server className={`w-5 h-5 ${nodes.ingest.status === "active" ? "text-cyan-400" : "text-gray-400"}`} />
                  </div>
                  <span className="text-[8px] font-mono font-bold mt-2 uppercase tracking-wider text-gray-500">Ingest Gate</span>
                </div>

                {/* Node: Router */}
                <div 
                  onClick={() => setSelectedNode("router")}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    selectedNode === "router" ? "scale-105" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    nodes.router.status === "active" 
                      ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse"
                      : selectedNode === "router"
                        ? "bg-[#0c0c0c] border-cyan-500/40"
                        : "bg-[#050505] border-white/5 hover:border-white/15"
                  }`}>
                    <Zap className={`w-5 h-5 ${nodes.router.status === "active" ? "text-cyan-400" : "text-gray-400"}`} />
                  </div>
                  <span className="text-[8px] font-mono font-bold mt-2 uppercase tracking-wider text-gray-500">SOP Router</span>
                </div>

                {/* Nodes: Parallel Validators (Risk & Fraud) */}
                <div className="flex flex-col gap-20">
                  {/* Node: Fraud */}
                  <div 
                    onClick={() => setSelectedNode("fraud")}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      selectedNode === "fraud" ? "scale-105" : ""
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                      nodes.fraud.status === "active" 
                        ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse"
                        : selectedNode === "fraud"
                          ? "bg-[#0c0c0c] border-cyan-500/40"
                          : "bg-[#050505] border-white/5 hover:border-white/15"
                    }`}>
                      <ShieldCheck className={`w-5 h-5 ${nodes.fraud.status === "active" ? "text-cyan-400" : "text-gray-400"}`} />
                    </div>
                    <span className="text-[8px] font-mono font-bold mt-2 uppercase tracking-wider text-gray-500">Fraud Engine</span>
                  </div>

                  {/* Node: Risk */}
                  <div 
                    onClick={() => setSelectedNode("risk")}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                      selectedNode === "risk" ? "scale-105" : ""
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                      nodes.risk.status === "active" 
                        ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse"
                        : selectedNode === "risk"
                          ? "bg-[#0c0c0c] border-cyan-500/40"
                          : "bg-[#050505] border-white/5 hover:border-white/15"
                    }`}>
                      <Activity className={`w-5 h-5 ${nodes.risk.status === "active" ? "text-cyan-400" : "text-gray-400"}`} />
                    </div>
                    <span className="text-[8px] font-mono font-bold mt-2 uppercase tracking-wider text-gray-500">Risk Audit</span>
                  </div>
                </div>

                {/* Node: Human */}
                <div 
                  onClick={() => setSelectedNode("human")}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    selectedNode === "human" ? "scale-105" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    nodes.human.status === "active" 
                      ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse"
                      : selectedNode === "human"
                        ? "bg-[#0c0c0c] border-cyan-500/40"
                        : "bg-[#050505] border-white/5 hover:border-white/15"
                  }`}>
                    <Users className={`w-5 h-5 ${nodes.human.status === "active" ? "text-cyan-400" : "text-gray-400"}`} />
                  </div>
                  <span className="text-[8px] font-mono font-bold mt-2 uppercase tracking-wider text-gray-500">Human Gate</span>
                </div>

                {/* Node: Egress */}
                <div 
                  onClick={() => setSelectedNode("egress")}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    selectedNode === "egress" ? "scale-105" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    nodes.egress.status === "active" 
                      ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse"
                      : selectedNode === "egress"
                        ? "bg-[#0c0c0c] border-cyan-500/40"
                        : "bg-[#050505] border-white/5 hover:border-white/15"
                  }`}>
                    <Database className={`w-5 h-5 ${nodes.egress.status === "active" ? "text-cyan-400" : "text-gray-400"}`} />
                  </div>
                  <span className="text-[8px] font-mono font-bold mt-2 uppercase tracking-wider text-gray-500">Egress Sign</span>
                </div>

              </div>

            </div>

          </div>

          {/* Node detail side panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col p-6 rounded-3xl border border-white/5 bg-[#050505] min-h-[400px]">
            <h3 className="text-xs font-mono text-gray-500 font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
              Node Variable Inspector
            </h3>

            {selectedNode && nodes[selectedNode] ? (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Title & Metadata */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{nodes[selectedNode].name}</h4>
                      <span className="text-[9px] font-mono text-cyan-400 uppercase bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10 mt-1 inline-block">
                        ID: {nodes[selectedNode].id}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-white/5 px-2.5 py-1 rounded-full capitalize">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        nodes[selectedNode].status === "active" 
                          ? "bg-cyan-500" 
                          : nodes[selectedNode].status === "completed"
                            ? "bg-emerald-500"
                            : "bg-gray-700"
                      }`} />
                      {nodes[selectedNode].status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
                    {nodes[selectedNode].description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-[#080808] border border-white/5">
                      <span className="text-[9px] text-gray-500 font-mono block mb-1">LATENCY</span>
                      <span className="text-xs font-bold text-white font-mono">{nodes[selectedNode].latency}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080808] border border-white/5">
                      <span className="text-[9px] text-gray-500 font-mono block mb-1">THROUGHPUT</span>
                      <span className="text-xs font-bold text-white font-mono">{nodes[selectedNode].throughput}</span>
                    </div>
                  </div>

                  {/* Node logs */}
                  <div>
                    <span className="text-[9px] text-gray-500 font-mono block mb-2 font-bold uppercase tracking-wider">Node Event Log</span>
                    <div className="p-4 rounded-xl bg-[#030303] border border-white/5 font-mono text-[9px] text-gray-400 space-y-2 max-h-[160px] overflow-y-auto">
                      {nodes[selectedNode].logs.map((log, i) => (
                        <div key={i} className="leading-relaxed border-l border-white/10 pl-2">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.03] mt-6">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                    <Info className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span>Selected node variables are compiled state-lessly in memory.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-xs">
                <span>Select a node on the network map</span>
                <span>to inspect variables.</span>
              </div>
            )}
          </div>

        </div>

        {/* Live System Log stream */}
        <div className="p-6 rounded-3xl border border-white/5 bg-[#050505] flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-mono font-bold text-white">Live Central System Trace Stream</span>
            </div>
            <span className="text-[9px] font-mono text-gray-500">Auto-updating trace</span>
          </div>

          <div className="font-mono text-[10px] text-gray-400 bg-[#030303] rounded-xl border border-white/5 p-5 h-36 overflow-y-auto space-y-2">
            {liveLogs.length > 0 ? (
              liveLogs.map((log, i) => (
                <div key={i} className="border-l border-white/5 pl-2 leading-relaxed text-gray-400">
                  {log}
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 font-sans text-xs">
                <span>Central system trace idle. Logs will stream in as transactions execute...</span>
              </div>
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
