"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server, Key, EyeOff, Database, CheckCircle2, Network, FileKey2 } from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#faf9f6] text-zinc-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.015] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 bg-teal-50/50 mb-6 font-semibold">
            <Shield className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[10px] font-mono text-teal-800 tracking-wider uppercase font-semibold">Security Architecture</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 mb-6 font-display">
            Secure-by-Design <br /> <span className="text-zinc-500">AI Infrastructure</span>
          </h1>
          <p className="text-lg text-zinc-600 font-medium leading-relaxed">
            Enterprise-grade data isolation, stateless processing pipelines, and cryptographic auditing built to safeguard proprietary workflows.
          </p>
        </div>

        {/* Dynamic VPC Pipeline Diagram (Dark Console style for premium technical contrast) */}
        <section className="mb-20">
          <div className="p-6 md:p-12 rounded-3xl bg-[#0c0d0f] border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Isolated VPC Data Flow Schematic</h2>
                <p className="text-sm text-zinc-400 font-medium mt-1">Trace how proprietary enterprise data moves through our zero-leakage security boundaries.</p>
              </div>
              <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-semibold tracking-wider uppercase">
                Zero-Leakage Active
              </div>
            </div>

            {/* SVG Interactive Architecture Map */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-end p-6">
              
              {/* SVG Network Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 350" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="securePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="30%" stopColor="#06b6d4" />
                    <stop offset="70%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <path d="M 120 175 H 880" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <path d="M 310 175 V 275 H 690 V 175" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Animated secure data path pulses */}
                <motion.path 
                  d="M 120 175 H 880" 
                  fill="none" 
                  stroke="url(#securePulse)" 
                  strokeWidth="2"
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: ["0 1000", "1000 0"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                <motion.path 
                  d="M 310 175 V 275 H 690 V 175" 
                  fill="none" 
                  stroke="url(#securePulse)" 
                  strokeWidth="2"
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: ["0 1000", "1000 0"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                />
              </svg>

              {/* Dynamic Overlay Elements */}
              <div className="absolute inset-0 flex justify-between items-center px-6 md:px-12 pb-16">
                
                {/* Node 1: Ingestion */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-lg relative mb-2">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full border-2 border-black animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">1. TLS Ingest</span>
                </div>

                {/* Node 2: Sanitization Gate */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg mb-2 relative">
                    <EyeOff className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">2. PII Sanitizer</span>
                </div>

                {/* Node 3: Private LLM / Execution */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-neutral-900 border border-cyan-500/20 flex items-center justify-center shadow-xl shadow-cyan-500/5 mb-2 relative">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <div className="absolute inset-0 border border-cyan-500/30 rounded-xl animate-ping opacity-25" />
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">3. Isolated Compute</span>
                </div>

                {/* Node 4: Cryptographic Logger */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#080808] border border-white/10 flex items-center justify-center shadow-lg mb-2">
                    <FileKey2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">4. Ledger Hash</span>
                </div>

                {/* Node 5: Safe Delivery */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-lg mb-2 relative">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">5. Egress Output</span>
                </div>

              </div>

              {/* Status details panel inside visualizer */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500 w-full">
                <div className="flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Subnet: 10.140.0.0/20</span>
                </div>
                <div>Encryption: AES-256-GCM</div>
                <div>Routing: Deterministic State Engine</div>
              </div>

            </div>

          </div>
        </section>

        {/* Security Posture Matrix */}
        <section className="mb-20">
          <h3 className="text-xs font-mono text-teal-700 tracking-widest uppercase mb-4 font-semibold">Operational Security Blueprint</h3>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-12 font-display">Security Posture Matrix</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                  <EyeOff className="w-5 h-5 text-teal-700" />
                </div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2 tracking-tight">Data Isolation &amp; Sovereignty</h4>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-semibold mb-6">
                  Customer data is processed state-lessly. We do not persist training loops or store customer payloads. Private deployments can be initialized within the client's own AWS/GCP VPCs to guarantee complete data residency.
                </p>
              </div>
              <ul className="space-y-3 font-semibold text-xs text-zinc-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> In-memory processing, stateless models.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Support for on-premise &amp; private VPC setups.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Zero model training on tenant payload logs.
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                  <Key className="w-5 h-5 text-teal-700" />
                </div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2 tracking-tight">Access Control &amp; RBAC</h4>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-semibold mb-6">
                  Strict authorization boundaries partition model executions. Agents authenticate via temporary, scoped JWTs. No agent has access to modify infrastructure states without validated programmatic overrides or human key clearance.
                </p>
              </div>
              <ul className="space-y-3 font-semibold text-xs text-zinc-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> JWT-based agent authorization keys.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Scoped API routes preventing lateral access.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> OpenID Connect (OIDC) integration ready.
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                  <Database className="w-5 h-5 text-teal-700" />
                </div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2 tracking-tight">Cryptographic Trail Log</h4>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-semibold mb-6">
                  Every decision matrix, LLM payload hash, and API command is cataloged. By using cryptographically signed transaction ledgers, the security system produces auditable traces that satisfy regulatory frameworks.
                </p>
              </div>
              <ul className="space-y-3 font-semibold text-xs text-zinc-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Signed JSON ledger records for auditing.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Event hashes stored securely for external systems verification.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Automated compliance formatting outputs.
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                  <Server className="w-5 h-5 text-teal-700" />
                </div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2 tracking-tight">Egress and Data Leak Guard</h4>
                <p className="text-xs sm:text-sm text-zinc-550 leading-relaxed font-semibold mb-6">
                  Outbound traffic undergoes syntactic data scanning. If a processing node attempts to export structured database values, PII markers, or raw credentials, the egress firewall blocks the operation and triggers an immediate rollback event.
                </p>
              </div>
              <ul className="space-y-3 font-semibold text-xs text-zinc-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Regular expression &amp; model-based PII scans.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Active egress payload size &amp; structure filters.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" /> Automated system block on syntax drift anomalies.
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border-t border-zinc-200">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-4 font-display">Review Security Specifications</h2>
          <p className="text-sm text-zinc-500 font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Consult our engineering team for private deployment playbooks and architecture customization guidelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-full text-center shadow-md cursor-pointer"
            >
              Consult Engineering
            </Link>
            <Link 
              href="/research" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-200 hover:border-zinc-350 bg-white text-zinc-700 transition-colors rounded-full text-center"
            >
              Read Security Whitepapers
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
