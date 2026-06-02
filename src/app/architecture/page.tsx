"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Cpu, Database, Network, GitFork, ArrowRight, Zap, CheckCircle2, Lock, Layout, Layers, Info } from "lucide-react";
import Link from "next/link";

interface WorkflowStep {
  name: string;
  actor: string;
  status: string;
  latency: string;
}

interface WorkflowData {
  id: string;
  title: string;
  desc: string;
  targetLatency: string;
  steps: WorkflowStep[];
}

export default function ArchitecturePage() {
  const [activeWorkflow, setActiveWorkflow] = useState<string>("insurance");

  const workflows: Record<string, WorkflowData> = {
    insurance: {
      id: "insurance",
      title: "MitraAI Insurance Claims Routing",
      desc: "Autonomously parses claim files, validates against coverage limits, runs parallel fraud metrics, and outputs authorization drafts.",
      targetLatency: "180ms",
      steps: [
        { name: "Payload Ingestion", actor: "API Ingress Proxy", status: "TLS 1.3 Masked", latency: "14ms" },
        { name: "PII Scrub Gate", actor: "Sanitization Parser", status: "Tokenized", latency: "25ms" },
        { name: "Data Extraction", actor: "Specialized Agent A", status: "JSON Structured", latency: "85ms" },
        { name: "Fraud & Limit Audit", actor: "Specialized Agent B", status: "Parallel Checked", latency: "90ms" },
        { name: "SOP Threshold Filter", actor: "Programmatic Rules Engine", status: "FSM Validated", latency: "8ms" },
        { name: "Egress Check & Commit", actor: "Database Ledger", status: "SHA-256 Registered", latency: "28ms" }
      ]
    },
    realty: {
      id: "realty",
      title: "MitraAI Realty Leasing Automation",
      desc: "Receives tenant applications, cross-references background credentials, analyzes custom lease terms, and prepares lease agreements.",
      targetLatency: "250ms",
      steps: [
        { name: "Application Ingress", actor: "API Ingress Proxy", status: "Normalized", latency: "12ms" },
        { name: "ID & Doc Verification", actor: "Extraction Agent", status: "Metadata Matched", latency: "110ms" },
        { name: "Credit Check Sync", actor: "Secure Database Connector", status: "API Query Passed", latency: "65ms" },
        { name: "Custom Clause Check", actor: "Audit Rules Agent", status: "Regex Scanned", latency: "90ms" },
        { name: "Legal Template Render", actor: "SOP Compiler", status: "HTML Compiled", latency: "15ms" },
        { name: "Ledger Commit", actor: "Database Ledger", status: "Signed Block Registered", latency: "30ms" }
      ]
    },
    enterprise: {
      id: "enterprise",
      title: "MitraAI Corporate Invoice Audit",
      desc: "Scans corporate invoices, compares values against Purchase Orders (POs) in CRM, flags threshold breaches, and queues payments.",
      targetLatency: "150ms",
      steps: [
        { name: "Invoice Document Ingest", actor: "API Ingress Proxy", status: "Parsed", latency: "16ms" },
        { name: "Variable Extraction", actor: "Extraction Agent", status: "JSON Serialized", latency: "95ms" },
        { name: "PO Ledger Matching", actor: "CRM DB Matcher", status: "Database Synced", latency: "42ms" },
        { name: "Payment Limit Check", actor: "Programmatic Rules Engine", status: "Auto-Approved", latency: "6ms" },
        { name: "Egress Earmark check", actor: "Egress Gate", status: "Output Verified", latency: "12ms" },
        { name: "Ledger Write", actor: "Database Ledger", status: "SHA-256 Registered", latency: "25ms" }
      ]
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-950/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Systems Blueprint</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Systems Architecture <br /> &amp; <span className="text-gray-500">Orchestration Blueprint</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Model-agnostic orchestration, deterministic state graphs, and VPC isolation boundaries designed for high-throughput enterprise automation.
          </p>
        </div>

        {/* Global Data Flow Schematic */}
        <section className="mb-20">
          <div className="p-6 md:p-10 rounded-3xl bg-[#050505] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
            <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
              <div>
                <h3 className="text-lg font-bold text-white">System Data Pipeline Schematic</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">Trace how payload packets move through the sanitization and verification checkpoints.</p>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/20 px-2.5 py-1 rounded border border-cyan-500/10 font-semibold tracking-wider">
                Active Node Mapping
              </span>
            </div>

            {/* SVG Diagram */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#020202] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-end p-6">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 350" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Draw connecting paths */}
                <path d="M 120 175 C 200 175, 200 175, 280 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 280 175 C 330 175, 330 100, 390 100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 280 175 C 330 175, 330 250, 390 250" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 390 100 C 470 100, 470 175, 520 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 390 250 C 470 250, 470 175, 520 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 520 175 C 600 175, 600 175, 680 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />
                <path d="M 680 175 C 750 175, 750 175, 820 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />

                {/* Animated overlay pulses */}
                <motion.path d="M 120 175 H 280" fill="none" stroke="url(#flowPulse)" strokeWidth="2.5"
                  initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />

                <motion.path d="M 280 175 C 330 175, 330 100, 390 100" fill="none" stroke="url(#flowPulse)" strokeWidth="2.5"
                  initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} />
                  
                <motion.path d="M 280 175 C 330 175, 330 250, 390 250" fill="none" stroke="url(#flowPulse)" strokeWidth="2.5"
                  initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }} />

                <motion.path d="M 390 100 C 470 100, 470 175, 520 175" fill="none" stroke="url(#flowPulse)" strokeWidth="2.5"
                  initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }} />

                <motion.path d="M 520 175 H 680" fill="none" stroke="url(#flowPulse)" strokeWidth="2.5"
                  initial={{ strokeDasharray: "0 500" }} animate={{ strokeDasharray: ["0 500", "500 0"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2.5 }} />
              </svg>

              {/* Node Overlay Items */}
              <div className="absolute inset-0 flex justify-between items-center px-10 pb-16">
                {/* Node 1: Ingestion */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-2">
                    <Server className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 font-bold uppercase tracking-wider">Payload Ingest</span>
                </div>

                {/* Node 2: PII Redaction */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-cyan-500/20 flex items-center justify-center mb-2 relative">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-wider">PII Scrub Gate</span>
                </div>

                {/* Node 3 & 4: Parallel Processing */}
                <div className="flex flex-col gap-16">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-2">
                      <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[8px] font-mono text-gray-500 font-bold uppercase tracking-wider">Agent A: Extract</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-2">
                      <Cpu className="w-5 h-5 text-violet-400" />
                    </div>
                    <span className="text-[8px] font-mono text-gray-500 font-bold uppercase tracking-wider">Agent B: Audit</span>
                  </div>
                </div>

                {/* Node 5: Programmatic rules verification */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-cyan-500/20 flex items-center justify-center mb-2">
                    <GitFork className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-wider">SOP Rules Node</span>
                </div>

                {/* Node 6: Egress scan */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-2">
                    <Network className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 font-bold uppercase tracking-wider">Egress Firewall</span>
                </div>

                {/* Node 7: Database */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-2 relative">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 font-bold uppercase tracking-wider">Ledger Store</span>
                </div>
              </div>

              {/* Status details panel inside visualizer */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500 w-full">
                <div className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Security Subnets: Private VPC</span>
                </div>
                <div>Routing: Programmatic State Machine</div>
                <div>Format: Stateless JSON Schema Payload</div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Agent DAG config selector */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h3 className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-3 font-semibold">Active Workflow Mappings</h3>
              <h2 className="text-3xl font-bold tracking-tight text-white font-mitra">Orchestration DAG Visualizer</h2>
            </div>
            
            {/* Tab Selector */}
            <div className="flex flex-wrap gap-2 bg-[#050505] border border-white/5 p-1 rounded-xl w-full md:w-auto">
              {Object.keys(workflows).map((wId) => (
                <button
                  key={wId}
                  onClick={() => setActiveWorkflow(wId)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeWorkflow === wId 
                      ? "bg-white text-black" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {wId.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#050505] border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/10 bg-cyan-950/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Target latency: {workflows[activeWorkflow].targetLatency}
                </span>
                <h3 className="text-xl font-bold text-white mt-3 tracking-tight">{workflows[activeWorkflow].title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium mt-2 text-justify">
                  {workflows[activeWorkflow].desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 font-mono text-[10px] text-gray-500 space-y-2">
                <div className="flex justify-between">
                  <span>DAG Validation</span>
                  <span className="text-emerald-400">PASSED</span>
                </div>
                <div className="flex justify-between">
                  <span>Loop Mitigation Cap</span>
                  <span className="text-gray-400">Max 3 visits</span>
                </div>
                <div className="flex justify-between">
                  <span>State Persistence</span>
                  <span className="text-gray-400">Redis Transient Mask</span>
                </div>
              </div>
            </div>

            {/* Right steps list (7 cols) */}
            <div className="lg:col-span-7 space-y-3 font-mono text-xs">
              {workflows[activeWorkflow].steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-900 border border-white/5 flex justify-between items-center gap-4 hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-cyan-500 bg-cyan-950/20 border border-cyan-500/10 w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-white font-bold block">{step.name}</span>
                      <span className="text-[9px] text-gray-500 block mt-0.5">Actor: {step.actor}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold block">{step.status}</span>
                    <span className="text-[9px] text-gray-500 block mt-0.5">{step.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment Lifecycle Diagram */}
        <section className="mb-20">
          <h3 className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-4 font-semibold">Operational Stages</h3>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Deployment Lifecycle Diagram</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                name: "VPC Subnet Setup",
                desc: "We provision isolated, containerized subnets inside your cloud (AWS/GCP) to protect databases and compute logic."
              },
              {
                step: "02",
                name: "SOP Schema Definition",
                desc: "Systems engineers model Standard Operating Procedures into Directed Acyclic Graphs (DAGs) and define JSON typing limits."
              },
              {
                step: "03",
                name: "Multi-Agent Run",
                desc: "Orchestration worker nodes dispatch tasks, parsing variables and performing operations under strict rules engine thresholds."
              },
              {
                step: "04",
                name: "Human-in-the-Loop Gate",
                desc: "If any execution breaches safety boundaries or logic loop limits, task execution halts for manual review."
              },
              {
                step: "05",
                name: "Egress Sanitization",
                desc: "The output matches schema rules. Outbound variables undergo syntactic PII filtering before final client delivery."
              },
              {
                step: "06",
                name: "Signed Ledger db Write",
                desc: "State variables are serialized, signed with SHA-256 hashes, and stored on encrypted databases for compliance auditing."
              }
            ].map((lifecycle, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#050505] border border-white/5 hover:border-white/10 transition-colors">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-4">{lifecycle.step}</span>
                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{lifecycle.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium text-justify">{lifecycle.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Specs */}
        <section className="mb-20 p-8 md:p-12 rounded-3xl bg-[#050505] border border-white/5">
          <h3 className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-6 font-semibold">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs text-gray-400">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white">Orchestration Layer</span>
                <span>Next.js 16 / TypeScript Engine</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white">Validation Standards</span>
                <span>Pydantic &amp; JSON Schema Enforcement</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white">Data Cryptography</span>
                <span>AES-256-GCM / TLS 1.3 Routing</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white">Deployment Subnet</span>
                <span>Private AWS / GCP VPC</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white">Audit Trail Logging</span>
                <span>Immutable Signed Ledger DB</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white">Headquarters location</span>
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border-t border-white/5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">Partner with System Architects</h2>
          <p className="text-sm text-gray-400 font-medium max-w-md mx-auto mb-8">
            Consult our engineering team to design custom model-agnostic topologies and VPC configurations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/contact" 
              className="px-6 py-3 text-xs font-semibold rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Consult an Architect
            </Link>
            <Link 
              href="/trust-center" 
              className="px-6 py-3 text-xs font-semibold rounded-full border border-white/10 hover:border-white/20 text-white transition-colors"
            >
              Access Trust Center
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
