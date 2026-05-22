"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, User, FileText, Repeat, HeartHandshake, Banknote, 
  Activity, Server, Smartphone, LayoutDashboard, Settings, BarChart3, Clock, 
  CheckCircle2, BellRing, Lock, MessageCircle, Building2, Zap, 
  ShoppingCart, GraduationCap, Briefcase, HeartPulse, Landmark, Users, 
  Stethoscope, HardHat, Package, Send, Bot
} from "lucide-react";
import { useEffect, useState } from "react";

type Tab = "Overview" | "Intelligence" | "Communications" | "Analytics" | "Infrastructure";

export const INDUSTRY_DATA: Record<string, any> = {
  financial: {
    id: "financial", title: "Financial & Insurance", icon: Landmark, accent: "cyan",
    nodes: [{ icon: User, label: "Lead Intake" }, { icon: FileText, label: "Policy Gen" }, { icon: ShieldCheck, label: "Underwriting" }, { icon: Repeat, label: "Renewal Track" }, { icon: HeartHandshake, label: "AI Servicing" }],
    metrics: [{ label: "Policies Managed", start: 12408, prefix: "", suffix: "", step: 2 }, { label: "AI Actions Today", start: 842, prefix: "", suffix: "", step: 5 }, { label: "Workflow Efficiency", start: 98.4, prefix: "", suffix: "%", step: 0 }],
    feedEvents: [{ msg: "Document verification completed", icon: CheckCircle2, color: "text-green-400" }, { msg: "Payment confirmation received", icon: Banknote, color: "text-emerald-400" }, { msg: "Renewal reminder delivered via WhatsApp", icon: Smartphone, color: "text-blue-400" }, { msg: "Maturity anomaly detected", icon: BellRing, color: "text-orange-400" }],
    tableData: { headers: ["Policy ID", "Customer", "Status", "AI Action Required"], rows: [{ id: "POL-9931", col2: "R. Sharma", status: "Maturity Approaching", action: "Schedule Call", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "POL-7124", col2: "A. Patel", status: "Active", action: "None", color: "text-green-400", bg: "bg-green-400/10" }, { id: "POL-8992", col2: "S. Gupta", status: "Pending Verification", action: "Parse Documents", color: "text-cyan-400", bg: "bg-cyan-400/10" }] },
    modules: [{ title: "Maturity Tracking", desc: "AI systems continuously scan policy lifecycles, alerting advisors 30 days before maturity.", icon: ShieldCheck, color: "text-cyan-400" }, { title: "Loan Eligibility", desc: "Automated assessment of portfolios to intelligently route loan qualification.", icon: Banknote, color: "text-green-400" }]
  },
  healthcare: {
    id: "healthcare", title: "Healthcare Operations", icon: HeartPulse, accent: "blue",
    nodes: [{ icon: User, label: "Inquiry" }, { icon: Stethoscope, label: "AI Intake" }, { icon: Server, label: "CRM Sync" }, { icon: Clock, label: "Scheduling" }, { icon: Banknote, label: "Billing" }],
    metrics: [{ label: "Avg Wait Time", start: 12, prefix: "", suffix: "m", step: 0 }, { label: "Intake Processed", start: 450, prefix: "", suffix: "", step: 3 }, { label: "Bed Utilization", start: 87.2, prefix: "", suffix: "%", step: 0 }],
    feedEvents: [{ msg: "Patient intake form parsed by AI", icon: FileText, color: "text-blue-400" }, { msg: "Appointment confirmed via SMS", icon: Smartphone, color: "text-green-400" }, { msg: "Doctor schedule anomaly resolved", icon: Activity, color: "text-emerald-400" }, { msg: "Insurance verification completed", icon: ShieldCheck, color: "text-cyan-400" }],
    tableData: { headers: ["Patient ID", "Name", "Triage Status", "Next Action"], rows: [{ id: "PT-8812", col2: "J. Doe", status: "Awaiting Vitals", action: "Assign Nurse", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "PT-4421", col2: "M. Smith", status: "Cleared", action: "Discharge", color: "text-green-400", bg: "bg-green-400/10" }, { id: "PT-9930", col2: "L. Johnson", status: "Pending Insurance", action: "Verify Data", color: "text-blue-400", bg: "bg-blue-400/10" }] },
    modules: [{ title: "Smart Scheduling", desc: "AI resolves calendar conflicts and automatically routes patients based on urgency.", icon: Clock, color: "text-blue-400" }, { title: "Automated Follow-ups", desc: "Post-visit WhatsApp automation for feedback and medication reminders.", icon: Smartphone, color: "text-emerald-400" }]
  },
  realestate: {
    id: "realestate", title: "Real Estate Infrastructure", icon: Building2, accent: "emerald",
    nodes: [{ icon: User, label: "Lead Gen" }, { icon: Activity, label: "AI Qualify" }, { icon: Users, label: "Broker Assign" }, { icon: Building2, label: "Site Visit" }, { icon: FileText, label: "Offer" }],
    metrics: [{ label: "Leads Qualified", start: 3205, prefix: "", suffix: "", step: 4 }, { label: "Avg Response", start: 45, prefix: "", suffix: "s", step: 0 }, { label: "Site Visits", start: 128, prefix: "", suffix: "", step: 1 }],
    feedEvents: [{ msg: "High-value lead identified", icon: BellRing, color: "text-orange-400" }, { msg: "Site visit confirmed via WhatsApp", icon: Smartphone, color: "text-green-400" }, { msg: "Broker matched using CRM logic", icon: Users, color: "text-emerald-400" }, { msg: "Property portfolio sent to client", icon: Send, color: "text-blue-400" }],
    tableData: { headers: ["Lead ID", "Client", "Lead Score", "AI Action"], rows: [{ id: "LD-552", col2: "A. Singh", status: "Tier 1 - Hot", action: "Broker Call", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "LD-881", col2: "R. Mehta", status: "Nurture", action: "Send Catalog", color: "text-blue-400", bg: "bg-blue-400/10" }, { id: "LD-993", col2: "K. Shah", status: "Site Visit Booked", action: "Send Reminder", color: "text-green-400", bg: "bg-green-400/10" }] },
    modules: [{ title: "Lead Routing", desc: "Algorithmic distribution of leads to brokers based on performance and territory.", icon: Users, color: "text-emerald-400" }, { title: "Portfolio Matching", desc: "AI cross-references client budgets with active inventory in real-time.", icon: Building2, color: "text-cyan-400" }]
  },
  ecommerce: {
    id: "ecommerce", title: "Ecommerce Automation", icon: ShoppingCart, accent: "violet",
    nodes: [{ icon: ShoppingCart, label: "Order Placed" }, { icon: Bot, label: "AI Support" }, { icon: Server, label: "CRM Sync" }, { icon: Package, label: "Fulfillment" }, { icon: CheckCircle2, label: "Resolution" }],
    metrics: [{ label: "Support Deflection", start: 74.2, prefix: "", suffix: "%", step: 0 }, { label: "Orders Processed", start: 15420, prefix: "", suffix: "", step: 12 }, { label: "Resolution Time", start: 2.4, prefix: "", suffix: "m", step: 0 }],
    feedEvents: [{ msg: "Refund processed automatically", icon: Banknote, color: "text-emerald-400" }, { msg: "Customer tracking query resolved", icon: Package, color: "text-violet-400" }, { msg: "Order sync failure mitigated", icon: ShieldCheck, color: "text-orange-400" }, { msg: "Abandoned cart recovered via SMS", icon: Smartphone, color: "text-green-400" }],
    tableData: { headers: ["Ticket ID", "Customer", "Intent", "Resolution Status"], rows: [{ id: "TK-102", col2: "E. Clark", status: "Tracking Update", action: "AI Resolved", color: "text-green-400", bg: "bg-green-400/10" }, { id: "TK-443", col2: "S. Lee", status: "Refund Request", action: "Human Escalation", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "TK-591", col2: "M. Davis", status: "Product Query", action: "AI Resolved", color: "text-green-400", bg: "bg-green-400/10" }] },
    modules: [{ title: "Intent Recognition", desc: "AI categorizes tickets instantly, deflecting WISMO (Where is my order) queries.", icon: Bot, color: "text-violet-400" }, { title: "WhatsApp Commerce", desc: "End-to-end purchasing and support deployed directly inside WhatsApp.", icon: Smartphone, color: "text-emerald-400" }]
  },
  manufacturing: {
    id: "manufacturing", title: "Manufacturing Intelligence", icon: Zap, accent: "orange",
    nodes: [{ icon: FileText, label: "Input Request" }, { icon: Server, label: "Workflow Engine" }, { icon: HardHat, label: "Approval" }, { icon: Settings, label: "Production" }, { icon: BarChart3, label: "Reporting" }],
    metrics: [{ label: "Approval Latency", start: 1.2, prefix: "", suffix: "h", step: 0 }, { label: "Active Workflows", start: 84, prefix: "", suffix: "", step: 1 }, { label: "Uptime", start: 99.9, prefix: "", suffix: "%", step: 0 }],
    feedEvents: [{ msg: "Supply chain approval routed", icon: CheckCircle2, color: "text-green-400" }, { msg: "Inventory anomaly flagged", icon: BellRing, color: "text-orange-400" }, { msg: "Machine status synced to ERP", icon: Server, color: "text-blue-400" }, { msg: "QA report generated", icon: FileText, color: "text-emerald-400" }],
    tableData: { headers: ["Batch ID", "Facility", "Status", "Workflow State"], rows: [{ id: "BCH-001", col2: "Plant A", status: "In Production", action: "Monitoring", color: "text-green-400", bg: "bg-green-400/10" }, { id: "BCH-042", col2: "Plant B", status: "Awaiting Parts", action: "Vendor Alert", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "BCH-105", col2: "Plant C", status: "QA Review", action: "Pending Approval", color: "text-blue-400", bg: "bg-blue-400/10" }] },
    modules: [{ title: "Supply Chain Routing", desc: "Automated coordination between vendors, ERPs, and floor managers.", icon: Server, color: "text-orange-400" }, { title: "Predictive QA", desc: "AI flags historical patterns in production to preempt QA failures.", icon: ShieldCheck, color: "text-cyan-400" }]
  },
  education: {
    id: "education", title: "Educational Systems", icon: GraduationCap, accent: "cyan",
    nodes: [{ icon: User, label: "Inquiry" }, { icon: Bot, label: "AI Assistant" }, { icon: FileText, label: "Admission" }, { icon: Users, label: "Enrollment" }, { icon: MessageCircle, label: "Comms" }],
    metrics: [{ label: "Admission Speed", start: 24, prefix: "", suffix: "h", step: 0 }, { label: "Queries Answered", start: 8402, prefix: "", suffix: "", step: 8 }, { label: "Conversion Rate", start: 18.4, prefix: "", suffix: "%", step: 0 }],
    feedEvents: [{ msg: "Student documents verified via AI", icon: ShieldCheck, color: "text-green-400" }, { msg: "Fee reminder sent via WhatsApp", icon: Smartphone, color: "text-blue-400" }, { msg: "Course inquiry routed to counselor", icon: Users, color: "text-emerald-400" }, { msg: "Application anomaly flagged", icon: BellRing, color: "text-orange-400" }],
    tableData: { headers: ["Applicant ID", "Program", "Status", "AI Action"], rows: [{ id: "APP-402", col2: "CS-101", status: "Pending Docs", action: "Send Reminder", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "APP-881", col2: "MBA", status: "Interview Set", action: "Sync Calendar", color: "text-blue-400", bg: "bg-blue-400/10" }, { id: "APP-992", col2: "Design", status: "Admitted", action: "Trigger Onboarding", color: "text-green-400", bg: "bg-green-400/10" }] },
    modules: [{ title: "Automated Admissions", desc: "End-to-end processing of applications, document parsing, and fee routing.", icon: FileText, color: "text-cyan-400" }, { title: "Student Support AI", desc: "24/7 conversational bots answering syllabus and facility questions.", icon: Bot, color: "text-emerald-400" }]
  },
  agencies: {
    id: "agencies", title: "Agencies & Service Ops", icon: Briefcase, accent: "violet",
    nodes: [{ icon: FileText, label: "Request" }, { icon: Server, label: "AI Routing" }, { icon: Settings, label: "Task Sync" }, { icon: Activity, label: "Delivery" }, { icon: BarChart3, label: "Reporting" }],
    metrics: [{ label: "Tasks Automated", start: 450, prefix: "", suffix: "", step: 4 }, { label: "Client Visibility", start: 100, prefix: "", suffix: "%", step: 0 }, { label: "Onboarding Time", start: 1.5, prefix: "", suffix: "h", step: 0 }],
    feedEvents: [{ msg: "Client onboarding workflow complete", icon: CheckCircle2, color: "text-green-400" }, { msg: "Monthly report generated by AI", icon: FileText, color: "text-blue-400" }, { msg: "Task synced with Slack", icon: Server, color: "text-violet-400" }, { msg: "Invoice sent to billing contact", icon: Banknote, color: "text-emerald-400" }],
    tableData: { headers: ["Client ID", "Project", "Status", "Next Action"], rows: [{ id: "CLI-01", col2: "Brand Redesign", status: "In Progress", action: "None", color: "text-green-400", bg: "bg-green-400/10" }, { id: "CLI-05", col2: "SEO Retainer", status: "Awaiting Copy", action: "Automated Ping", color: "text-orange-400", bg: "bg-orange-400/10" }, { id: "CLI-12", col2: "Web Build", status: "QA Ready", action: "Route to Tester", color: "text-blue-400", bg: "bg-blue-400/10" }] },
    modules: [{ title: "Client Portals", desc: "Dynamic dashboards pulling live project status from disparate task managers.", icon: LayoutDashboard, color: "text-violet-400" }, { title: "Automated Reporting", desc: "Data aggregation pipelines that compile and send reports without human input.", icon: BarChart3, color: "text-cyan-400" }]
  }
};

export default function DynamicIndustryShowcase({ activeIndustryId }: { activeIndustryId: string }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  
  const data = INDUSTRY_DATA[activeIndustryId] || INDUSTRY_DATA.financial;
  
  // Live Metrics State
  const [m1, setM1] = useState(data.metrics[0].start);
  const [m2, setM2] = useState(data.metrics[1].start);

  // Live Activity Feed State
  const [feed, setFeed] = useState(data.feedEvents.map((e: any, i: number) => ({ id: i, time: i === 0 ? "Just now" : `${i}m ago`, ...e })));

  useEffect(() => {
    setMounted(true);
    // Reset state when industry changes
    setM1(data.metrics[0].start);
    setM2(data.metrics[1].start);
    setFeed(data.feedEvents.map((e: any, i: number) => ({ id: Date.now() + i, time: i === 0 ? "Just now" : `${i}m ago`, ...e })));
    
    const metricInterval = setInterval(() => {
      setM1((prev: number) => prev + data.metrics[0].step);
      setM2((prev: number) => prev + data.metrics[1].step);
    }, 4000);

    const feedInterval = setInterval(() => {
      const randomEvent = data.feedEvents[Math.floor(Math.random() * data.feedEvents.length)];
      setFeed((prev: any) => {
        const newFeed = [{ id: Date.now(), time: "Just now", ...randomEvent }, ...prev];
        return newFeed.slice(0, 5);
      });
    }, 8000);

    return () => {
      clearInterval(metricInterval);
      clearInterval(feedInterval);
    };
  }, [activeIndustryId, data]);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      key={activeIndustryId} // Force remount animation on industry change
      className="w-full bg-[#030303] rounded-xl border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.05)] flex flex-col md:flex-row h-[800px] font-sans"
    >
      
      {/* ---------------- LEFT SIDEBAR (Navigation) ---------------- */}
      <div className="w-full md:w-64 bg-[#080808] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full animate-pulse ${data.accent === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Command Center</h3>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">{data.title}</p>
        </div>
        
        <div className="p-3 space-y-1">
          {["Overview", "Intelligence", "Communications", "Analytics", "Infrastructure"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-white/10 text-white border border-white/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {tab === "Overview" && <LayoutDashboard className="w-4 h-4" />}
              {tab === "Intelligence" && <Server className="w-4 h-4" />}
              {tab === "Communications" && <Smartphone className="w-4 h-4" />}
              {tab === "Analytics" && <BarChart3 className="w-4 h-4" />}
              {tab === "Infrastructure" && <Settings className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Intelligence Telemetry Rail */}
        <div className="p-5 flex-1 flex flex-col justify-end gap-4 opacity-80">
          <div className="space-y-3">
            {[
              { label: "AI PIPELINE HEALTH", value: "99.98%", color: "text-emerald-400", bg: "bg-emerald-500" },
              { label: "GLOBAL LATENCY", value: "42ms", color: "text-cyan-400", bg: "bg-cyan-500" },
              { label: "EDGE ROUTING", value: "STABLE", color: "text-emerald-400", bg: "bg-emerald-500" },
              { label: "NODE SYNC", value: "ACTIVE", color: "text-cyan-400", bg: "bg-cyan-500" }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-end border-b border-white/[0.03] pb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-1 h-1 rounded-full animate-pulse ${stat.bg} shadow-[0_0_8px_currentColor]`} style={{ color: stat.bg.replace('bg-', '') }} />
                  <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">{stat.label}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 h-10 relative flex items-end justify-between opacity-20">
             {[...Array(20)].map((_, i) => (
               <motion.div
                 key={i}
                 className="w-1 bg-cyan-400 rounded-t-sm"
                 animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                 transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
               />
             ))}
          </div>
        </div>

        <div className="p-5 border-t border-white/5 bg-[#050505]">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2">
            <Lock className="w-3 h-3" /> Encrypted Processing
          </div>
        </div>
      </div>

      {/* ---------------- CENTER CONSOLE (The Engine) ---------------- */}
      <div className="flex-1 flex flex-col bg-[#020202] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 pointer-events-none" />

        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 relative z-10 bg-black/40 backdrop-blur-md">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{data.metrics[0].label}</p>
            <p className="text-2xl font-mono text-white flex items-center gap-2">
              {data.metrics[0].prefix}{m1.toLocaleString()}{data.metrics[0].suffix} <span className="text-xs text-green-400 font-sans animate-pulse">+</span>
            </p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 blur-xl rounded-full ${data.accent === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10'}`} />
            <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${data.accent === 'emerald' ? 'text-emerald-500' : 'text-cyan-500'}`}>{data.metrics[1].label}</p>
            <p className={`text-2xl font-mono ${data.accent === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{data.metrics[1].prefix}{m2.toLocaleString()}{data.metrics[1].suffix}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{data.metrics[2].label}</p>
            <p className="text-2xl font-mono text-white">{data.metrics[2].prefix}{data.metrics[2].start}{data.metrics[2].suffix}</p>
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
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Live AI Orchestration Pipeline</h2>
                  
                  {/* Animated Workflow Visualizer */}
                  <div className="relative py-12 px-6 bg-[#050505] border border-white/5 rounded-xl mt-6">
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
                      {data.nodes.map((node: any, i: number) => (
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
                  {data.modules.map((mod: any, i: number) => (
                    <div key={i} className="bg-[#080808] border border-white/5 p-5 rounded-xl">
                      <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <mod.icon className={`w-4 h-4 ${mod.color}`} /> {mod.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "Intelligence" && (
              <motion.div
                key="intelligence"
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
                        {data.tableData.headers.map((h: string, i: number) => (
                          <th key={i} className="p-4 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {data.tableData.rows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="p-4 font-mono text-xs">{row.id}</td>
                          <td className="p-4">{row.col2}</td>
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

            {activeTab !== "Overview" && activeTab !== "Intelligence" && (
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
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050505] to-transparent z-10" />
          
          <div className="space-y-3 relative z-0">
            <AnimatePresence>
              {feed.map((event: any) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
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

    </motion.div>
  );
}
