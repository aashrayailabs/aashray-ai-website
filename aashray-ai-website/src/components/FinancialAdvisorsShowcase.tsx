"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, ArrowRight, User, FileText, Repeat, HeartHandshake, Banknote, 
  Activity, Server, Smartphone, LayoutDashboard, Settings, BarChart3, Clock, 
  CheckCircle2, BellRing, Lock, MessageCircle
} from "lucide-react";
import { useEffect, useState } from "react";

type Tab = "Overview" | "Document Intelligence" | "WhatsApp Operations" | "Analytics" | "Infrastructure";

export default function FinancialAdvisorsShowcase() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  
  // Live Metrics State
  const [policies, setPolicies] = useState(12408);
  const [aiActions, setAiActions] = useState(842);
  const [responseRate, setResponseRate] = useState(98.4);

  // Live Activity Feed State
  const [feed, setFeed] = useState([
    { id: 1, time: "Just now", msg: "AI extracted policy metadata for POL-9931", icon: Server, color: "text-blue-400" },
    { id: 2, time: "1m ago", msg: "Renewal reminder delivered via WhatsApp", icon: Smartphone, color: "text-green-400" },
    { id: 3, time: "3m ago", msg: "Lead score increased to high priority", icon: Activity, color: "text-cyan-400" },
  ]);

  useEffect(() => {
    setMounted(true);
    
    // Simulate live ticking metrics
    const metricInterval = setInterval(() => {
      setPolicies(prev => prev + Math.floor(Math.random() * 2));
      setAiActions(prev => prev + Math.floor(Math.random() * 5));
    }, 4000);

    // Simulate live feed updates
    const feedInterval = setInterval(() => {
      const newEvents = [
        { msg: "Document verification completed", icon: CheckCircle2, color: "text-green-400" },
        { msg: "Payment confirmation received", icon: Banknote, color: "text-emerald-400" },
        { msg: "Hospital appointment workflow routed", icon: Repeat, color: "text-cyan-400" },
        { msg: "Customer responded to AI alert", icon: MessageCircle, color: "text-blue-400" },
        { msg: "Maturity anomaly detected", icon: BellRing, color: "text-orange-400" }
      ];
      const randomEvent = newEvents[Math.floor(Math.random() * newEvents.length)];
      
      setFeed(prev => {
        const newFeed = [{ id: Date.now(), time: "Just now", ...randomEvent }, ...prev];
        return newFeed.slice(0, 5); // Keep last 5
      });
    }, 8000);

    return () => {
      clearInterval(metricInterval);
      clearInterval(feedInterval);
    };
  }, []);

  const pipelineNodes = [
    { icon: User, label: "Lead Intake" },
    { icon: FileText, label: "Format Scan" },
    { icon: ShieldCheck, label: "Validation Check" },
    { icon: Repeat, label: "Audit Tracking" },
    { icon: HeartHandshake, label: "AI Servicing" }
  ];

  if (!mounted) return null;

  return (
    <div className="w-full bg-[#030303] rounded-xl border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.05)] flex flex-col md:flex-row h-[800px] font-sans">
      
      {/* ---------------- LEFT SIDEBAR (Navigation) ---------------- */}
      <div className="w-full md:w-64 bg-[#080808] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Command Center</h3>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">Financial & Document Ops</p>
        </div>
        
        <div className="p-3 flex-1 space-y-1">
          {["Overview", "Document Intelligence", "WhatsApp Operations", "Analytics", "Infrastructure"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {tab === "Overview" && <LayoutDashboard className="w-4 h-4" />}
              {tab === "Document Intelligence" && <Server className="w-4 h-4" />}
              {tab === "WhatsApp Operations" && <Smartphone className="w-4 h-4" />}
              {tab === "Analytics" && <BarChart3 className="w-4 h-4" />}
              {tab === "Infrastructure" && <Settings className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5 border-t border-white/5 bg-[#050505]">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2">
            <Lock className="w-3 h-3" /> Encrypted Processing
          </div>
          <p className="text-xs text-gray-600 leading-tight">
            Orchestrate and monitor mission-critical systems securely through deterministic workflow execution engines designed for enterprise environments.
          </p>
        </div>
      </div>

      {/* ---------------- CENTER CONSOLE (The Engine) ---------------- */}
      <div className="flex-1 flex flex-col bg-[#020202] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-20 pointer-events-none" />

        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 relative z-10 bg-black/40 backdrop-blur-md">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Active Executions</p>
            <p className="text-2xl font-mono text-white flex items-center gap-2">
              {policies.toLocaleString()} <span className="text-xs text-green-400 font-sans">+12%</span>
            </p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 blur-xl rounded-full" />
            <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-1">Telemetry Synced</p>
            <p className="text-2xl font-mono text-cyan-400">{aiActions.toLocaleString()}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Queue Success Rate</p>
            <p className="text-2xl font-mono text-white">{responseRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Main View Area */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
          <AnimatePresence mode="wait">
            
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Live AI Orchestration Pipeline</h2>
                  <p className="text-sm text-gray-400 mb-8">
                    Monitoring automated workflows, AI processing stages, and human collaboration routing.
                  </p>
                  
                  {/* Animated Workflow Visualizer */}
                  <div className="relative py-12 px-6 bg-[#050505] border border-white/5 rounded-xl">
                    {/* SVG Connection Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                       <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
                       <motion.line 
                         x1="10%" y1="50%" x2="90%" y2="50%" 
                         stroke="#06b6d4" strokeWidth="2" 
                         initial={{ strokeDasharray: "0, 1000" }}
                         animate={{ strokeDasharray: ["0, 1000", "1000, 0"] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       />
                    </svg>
                    
                    <div className="flex justify-between relative z-10">
                      {pipelineNodes.map((node, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <motion.div 
                            className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] relative"
                            whileHover={{ scale: 1.1, borderColor: "#06b6d4" }}
                          >
                            <node.icon className="w-5 h-5 text-gray-400" />
                            {i === 2 && (
                               <motion.span 
                                 className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border border-black"
                                 animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                 transition={{ duration: 2, repeat: Infinity }}
                               />
                            )}
                          </motion.div>
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider bg-black/50 px-2 py-1 rounded">{node.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub Modules Preview */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#080808] border border-white/5 p-5 rounded-xl">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" /> Maturity Tracking
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      AI systems continuously scan policy lifecycles, alerting advisors 30 days before maturity to secure retention.
                    </p>
                  </div>
                  <div className="bg-[#080808] border border-white/5 p-5 rounded-xl">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-green-400" /> Loan Eligibility Assistant
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Automated assessment of customer portfolios to intelligently route loan qualification opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Document Intelligence" && (
              <motion.div
                key="policy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">Active Intelligence Tracking</h2>
                <div className="bg-[#050505] border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#111] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                      <tr>
                        <th className="p-4 font-semibold">Document ID</th>
                        <th className="p-4 font-semibold">Customer</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">AI Action Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {[
                        { id: "DOC-9931", user: "R. Sharma", status: "Maturity Approaching", action: "Schedule Call", color: "text-orange-400", bg: "bg-orange-400/10" },
                        { id: "DOC-7124", user: "A. Patel", status: "Active", action: "None", color: "text-green-400", bg: "bg-green-400/10" },
                        { id: "DOC-8992", user: "S. Gupta", status: "Pending Verification", action: "Parse Documents", color: "text-cyan-400", bg: "bg-cyan-400/10" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="p-4 font-mono text-xs">{row.id}</td>
                          <td className="p-4">{row.user}</td>
                          <td className="p-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${row.color} ${row.bg}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-400">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Fallback for other tabs */}
            {activeTab !== "Overview" && activeTab !== "Document Intelligence" && (
              <motion.div
                key="other"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin mb-4" />
                <p className="text-cyan-400 font-mono text-sm">Loading {activeTab} Module...</p>
                <p className="text-gray-500 text-xs mt-2">Connecting to secure infrastructure node.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- RIGHT SIDEBAR (Live Activity Feed) ---------------- */}
      <div className="w-full md:w-72 bg-[#050505] border-l border-white/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white tracking-widest uppercase">Live Activity</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-mono text-green-500">SYSTEM ONLINE</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden relative p-4">
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050505] to-transparent z-10" />
          
          <div className="space-y-3 relative z-0">
            <AnimatePresence>
              {feed.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 rounded-lg border border-white/[0.03] bg-[#0a0a0a] flex gap-3"
                >
                  <event.icon className={`w-4 h-4 mt-0.5 shrink-0 ${event.color}`} />
                  <div>
                    <p className="text-xs text-gray-300 leading-snug">{event.msg}</p>
                    <p className="text-[9px] text-gray-600 font-mono mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}

