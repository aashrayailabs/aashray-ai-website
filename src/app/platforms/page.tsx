"use client";

import { useState } from "react";
import { 
  ShieldCheck, LayoutDashboard, Terminal, Activity, Users, Zap, Database, 
  ArrowRight, CheckCircle2, AlertTriangle, Layers, Info, Check, Play 
} from "lucide-react";
import Link from "next/link";

interface MetricData {
  label: string;
  value: string;
  change: string;
}

interface PlatformDetail {
  id: string;
  name: string;
  sector: string;
  desc: string;
  advisorTask: string;
  advisorStatus: string;
  recommendation: string;
  metrics: MetricData[];
  consoleLogs: string[];
}

export default function PlatformsPage() {
  const [activePlatform, setActivePlatform] = useState<string>("insurance");
  const [hitlActionDone, setHitlActionDone] = useState<string | null>(null);

  const platforms: Record<string, PlatformDetail> = {
    insurance: {
      id: "insurance",
      name: "MitraAI Insurance",
      sector: "Claims & Underwriting",
      desc: "Orchestrates claims ingestion, parallel coverage validation, fraud scanning, and drafts adjustment letters.",
      advisorTask: "Review Auto-Suspended Claim #CLM-891 (Potential deductible discrepancy)",
      advisorStatus: "Awaiting legal signature override",
      recommendation: "Consolidate Extraction Agent prompts to save 12% input tokens.",
      metrics: [
        { label: "Claims turn-around speed", value: "1.4 hours", change: "-84% turnaround time" },
        { label: "Auto-Settlement accuracy", value: "99.8%", change: "+0.15% month-over-month" },
        { label: "Token Savings", value: "24.2%", change: "Optimized model routing" }
      ],
      consoleLogs: [
        "INGEST: Inbound claim form CLM-891 parsed successfully.",
        "FRAUD: Running image anomaly checks on vehicle repair PDF... [OK]",
        "POLICY: Checked deductible limits. Balance deviation: $250.00. [FLAGGED]",
        "GOVERNANCE: Suspended auto-execution. Routed transaction to Advisor Workspace."
      ]
    },
    realty: {
      id: "realty",
      name: "MitraAI Realty",
      sector: "Property Tech & Tenant Ops",
      desc: "Pre-qualifies tenant applications, cross-checks financials, scans contracts for custom clauses, and queues drafts.",
      advisorTask: "Verify Background Report verification mismatch for applicant U-302",
      advisorStatus: "Awaiting background audit approval",
      recommendation: "Switch background audit routing to GPT-4o-Mini to save 32% compute.",
      metrics: [
        { label: "Tenant pre-qualification speed", value: "4 minutes", change: "-92% agent overhead" },
        { label: "Contract verification rate", value: "100%", change: "Zero manual omissions" },
        { label: "System throughput", value: "45.0 req/s", change: "Within SLA limits" }
      ],
      consoleLogs: [
        "INGEST: Lease application tenant_id U-302 serialized.",
        "DATABASE: Synced tenant credit score. Score verified: 720. [OK]",
        "LEGAL: Scanned clause 12. Custom text matches liability flag template. [FLAGGED]",
        "GOVERNANCE: Task suspended. Pushed contract review request to Advisor queue."
      ]
    },
    healthcare: {
      id: "healthcare",
      name: "MitraAI Healthcare",
      sector: "Clinical Operations & Routing",
      desc: "Normalizes patient charts, cross-references diagnostic metadata, and automates administrative scheduling.",
      advisorTask: "Approve Patient Referral routing adjustment (Department override flag)",
      advisorStatus: "Awaiting clinical supervisor signature",
      recommendation: "Enable persistent cache indexing on medical directory nodes.",
      metrics: [
        { label: "Patient routing latency", value: "85ms", change: "-60% triage processing" },
        { label: "Chart normalization accuracy", value: "99.9%", change: "Pydantic validated schemas" },
        { label: "SOP Rule compliance rate", value: "100%", change: "Enforced state constraints" }
      ],
      consoleLogs: [
        "INGEST: Patient medical history chart normalising...",
        "SECURITY: Scrubbed local PII attributes. Mask tags successfully generated. [OK]",
        "ROUTER: Evaluated diagnostic code ICD-10. Mapped to department CARDIOLOGY.",
        "GOVERNANCE: Triggered human-in-the-loop gate for clinical routing confirmation."
      ]
    },
    enterprise: {
      id: "enterprise",
      name: "MitraAI Enterprise",
      sector: "Corporate Automation Ops",
      desc: "Coordinates multi-system integrations, normalizes vendor invoices, and automates bookkeeping reconciliation.",
      advisorTask: "Review Suspended Invoice #INV-402 (Amount $12,500 exceeds auto-payment limits)",
      advisorStatus: "Awaiting director authorization signature",
      recommendation: "Fine-tune extraction schema to reduce manual invoice retries.",
      metrics: [
        { label: "Invoice reconciliation rate", value: "94.5%", change: "+24% autonomous approvals" },
        { label: "Audit trail log integrity", value: "100% Signed", change: "Immutable ledger database" },
        { label: "Average pipeline latency", value: "142ms", change: "SLA threshold: 250ms" }
      ],
      consoleLogs: [
        "INGEST: Vendor invoice INV-402 parsed to structured schema.",
        "DATABASE: Cross-referenced invoice total against purchase order PO-881. [OK]",
        "POLICY: Checked total $12,550.00 against $5,000.00 automatic payout limits. [FLAGGED]",
        "GOVERNANCE: Halted payments. Queue reference forwarded to operations console."
      ]
    }
  };

  const handleHitlResolve = (action: string) => {
    setHitlActionDone(action);
    setTimeout(() => {
      setHitlActionDone(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#faf9f6] text-zinc-700 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.015] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 bg-teal-50/50 mb-6 font-semibold">
            <Layers className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[10px] font-mono text-teal-800 tracking-wider uppercase">Product Ecosystem</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6">
            Ecosystem Platforms <br /> &amp; <span className="text-zinc-500">Workspace Previews</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-650 leading-relaxed font-medium">
            Explore MitraAI's specialized operational platforms. Select a platform to preview its active workspace consoles, timelines, and decision grids.
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.values(platforms).map((plat) => {
            const isActive = activePlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => { setActivePlatform(plat.id); setHitlActionDone(null); }}
                className={`px-6 py-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 min-w-[200px] cursor-pointer ${
                  isActive 
                    ? "bg-white border-zinc-300 shadow-[0_4px_20px_rgba(24,24,27,0.05)]" 
                    : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100"
                }`}
              >
                <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">{plat.sector}</span>
                <span className={`text-sm font-bold mt-1 ${isActive ? "text-teal-700" : "text-zinc-800"}`}>{plat.name}</span>
              </button>
            );
          })}
        </div>

        {/* The SaaS Workspace Preview Board (Dark dashboard contrast style) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0c0d0f] border border-white/5 relative overflow-hidden mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.01] blur-2xl rounded-full" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-white/5 pb-6">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">MitraAI OS Workspace Preview</span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">{platforms[activePlatform].name} Console</h2>
              <p className="text-xs text-zinc-400 font-medium mt-1">{platforms[activePlatform].desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Console Simulator Mode</span>
            </div>
          </div>

          {/* Interactive Workspace Components Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT Column: Advisor Workspace Queue & AI recommendations (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Advisor Workspace Queue Card */}
              <div className="p-6 rounded-2xl bg-[#111215] border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Advisor Workspace Queue</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/20 border border-cyan-500/10 text-[9px] font-mono text-cyan-400 font-bold">1 Alert Awaiting Signature</span>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/5">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">{platforms[activePlatform].advisorTask}</p>
                      <p className="text-[10px] text-zinc-500 font-mono mt-1">Status: {platforms[activePlatform].advisorStatus}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {hitlActionDone ? (
                      <div className="w-full py-2 bg-emerald-950/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono text-center rounded-lg font-bold flex items-center justify-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        OVERRIDE REGISTERED &amp; DISPATCHED
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleHitlResolve("approve")}
                          className="flex-1 py-2 bg-white text-black text-[10px] font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          Sign Override
                        </button>
                        <button
                          onClick={() => handleHitlResolve("reject")}
                          className="flex-1 py-2 border border-white/10 hover:border-white/20 text-white text-[10px] font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Reject &amp; Rollback
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Recommendation Panel */}
              <div className="p-6 rounded-2xl bg-[#111215] border border-white/5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-1">AI Recommendation &amp; Optimization</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {platforms[activePlatform].recommendation} Token cache parameters verify schema matching is fully optimized.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT Column: Operations Console & Analytics (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Operations Console log trace */}
              <div className="p-6 rounded-2xl bg-[#111215] border border-white/5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Operations Console</h3>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500">Live logs</span>
                </div>

                <div className="font-mono text-[9px] text-zinc-400 space-y-2 h-36 overflow-y-auto mb-4 bg-black/50 p-3 rounded-lg border border-white/[0.02]">
                  {platforms[activePlatform].consoleLogs.map((log, idx) => (
                    <div key={idx} className="border-l border-white/10 pl-2 leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.03] text-[9px] font-mono text-zinc-500">
                  Worker Thread: thread_pool_active_12
                </div>
              </div>

            </div>

          </div>

          {/* Operational Metrics Cards (Footer of dashboard preview) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
            {platforms[activePlatform].metrics.map((met, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#111215] border border-white/5">
                <span className="text-[9px] text-zinc-500 font-mono block mb-1 uppercase tracking-wider">{met.label}</span>
                <span className="text-lg font-bold text-white font-mono block">{met.value}</span>
                <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">{met.change}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Global callout for platforms */}
        <section className="text-center py-16 border-t border-zinc-200">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-4 font-display">Initialize Platform Onboarding</h2>
          <p className="text-sm text-zinc-500 font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Consult our product engineering team to set up a private sandbox preview tailored for your business operational bottlenecks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-full text-center shadow-md"
            >
              Consult Product Engineering
            </Link>
            <Link 
              href="/infrastructure" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-200 hover:border-zinc-350 bg-white text-zinc-700 transition-colors rounded-full text-center"
            >
              Read Infrastructure Specifications
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
