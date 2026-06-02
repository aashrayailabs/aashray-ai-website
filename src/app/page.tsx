"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, Cpu, Lock, Activity, ShieldCheck, Database, 
  Zap, Terminal, Globe, Server, Users, Landmark, MessageSquare, ClipboardList 
} from "lucide-react";
import Link from "next/link";
import CommandCenterHero from "@/components/CommandCenterHero";
import GlobalNetworkMap from "@/components/GlobalNetworkMap";
import OperationalRuntimeDiagram from "@/components/OperationalRuntimeDiagram";
import EnterpriseForm from "@/components/EnterpriseForm";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-[#faf9f6] text-zinc-700">
      
      {/* 1. Hero Section */}
      <CommandCenterHero />

      {/* 2. Operational Deployment Overview */}
      <GlobalNetworkMap />

      {/* 3. Operational AI Runtime (New Diagram Section) */}
      <OperationalRuntimeDiagram />

      {/* 4. Core Solutions Overview */}
      <section className="section-light py-24 md:py-32 border-b border-zinc-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
          <div className="max-w-3xl mb-16 md:mb-20">
            <p className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-widest uppercase mb-3">Core Solutions</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6 font-display">
              Ecosystem Platforms
            </h2>
            <p className="text-base sm:text-lg text-zinc-650 leading-relaxed font-medium">
              Operational AI infrastructure and workflow automation systems built for financial operations, advisors, and enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "MitraAI OS",
                desc: "Enterprise orchestration runtime for governed AI operations. Focuses on workflow execution, routing, governance, and infrastructure reliability.",
                href: "/platforms#mitra-ai-os",
                icon: Cpu
              },
              {
                title: "Workflow Runtime",
                desc: "Stateful, backpressure-aware execution engine optimized for high-throughput webhook ingestion and zero-packet-loss pipelines.",
                href: "/infrastructure",
                icon: Server
              },
              {
                title: "Multi-Agent Systems",
                desc: "Cooperative, specialized agent networks communicating through structured JSON protocols to automate complex back-office workflows.",
                href: "/platforms#multi-agent-systems",
                icon: Users
              },
              {
                title: "Operational AI Engine",
                desc: "Model-agnostic backend routing middleware enforcing strict validation rules and security guardrails on client prompts.",
                href: "/platforms#operational-ai-engine",
                icon: Zap
              }
            ].map((sol, i) => {
              const Icon = sol.icon;
              return (
                <div
                  key={i}
                  className="border border-zinc-200 bg-white rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-zinc-350 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-zinc-500" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950 mb-3 tracking-tight">{sol.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-medium mb-8 text-justify">
                      {sol.desc}
                    </p>
                  </div>
                  <Link 
                    href={sol.href} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-850 tracking-tight transition-colors font-sans"
                  >
                    View technical specifications <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Enterprise Trust Indicators */}
      <section className="section-cream py-20 md:py-24 border-b border-zinc-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-3">Enterprise Governance</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 font-display">
              Institutional Trust Layers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Audit Logs", desc: "Immutable signed ledger database recording every process state transfer.", icon: Terminal },
              { title: "Human Review Gates", desc: "Configurable supervisor override screens halting low-confidence runs.", icon: Users },
              { title: "Role-Based Access", desc: "Strict administrative subnets limiting configuration edits.", icon: Lock },
              { title: "Workflow Visibility", desc: "Active transaction trace tracking providing clear SLA audits.", icon: Activity },
              { title: "Deployment Controls", desc: "Model-agnostic sandboxing isolating variables inside VPC borders.", icon: Server },
              { title: "Encryption Layers", desc: "TLS 1.3 transit encryption and AES-256 state database keys.", icon: ShieldCheck },
              { title: "Governance Monitoring", desc: "Structured validation schemas checking prompts and JSON outputs.", icon: Zap },
              { title: "VPC Subnet Isolation", desc: "Logically isolated tenant partitions protecting secure databases.", icon: Globe }
            ].map((trust, i) => {
              const TrustIcon = trust.icon;
              return (
                <div key={i} className="border border-zinc-200 bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:border-zinc-350 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
                    <TrustIcon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 mb-1">{trust.title}</h4>
                    <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">{trust.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Selected Use Cases & Enterprise Capabilities */}
      <section className="section-light py-24 md:py-32 border-b border-zinc-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
          <div className="max-w-3xl mb-16 md:mb-20">
            <p className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-widest uppercase mb-3">Enterprise Deployments</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6 font-display">
              Selected Use Cases
            </h2>
            <p className="text-base sm:text-lg text-zinc-650 leading-relaxed font-medium">
              Realistic, high-fidelity back-office automations running on the Aashray AI Labs runtime.
            </p>
          </div>

          {/* Primary Operations Automation Card */}
          <div className="mb-8 p-8 md:p-10 border border-zinc-200 bg-white rounded-3xl hover:border-zinc-350 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <span className="text-[9px] text-teal-800 font-mono tracking-wider uppercase bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
                ADVISOR &amp; OPERATIONS AUTOMATION
              </span>
              <span className="text-[9px] text-zinc-450 font-mono tracking-wider">Confidentiality Assured</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-zinc-950 mb-3 tracking-tight">
              Intelligent Financial Workflow Operations
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-medium mb-8 max-w-4xl text-justify">
              AI-assisted operational infrastructure for advisors and back-office teams handling customer engagement, premium reminders, maturity tracking, policy servicing, workflow routing, and office automation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-150 font-mono text-[10px] leading-relaxed">
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-1 font-bold">SYSTEM INPUT</span>
                <span className="text-zinc-700 font-semibold">CRM Records + Policy Data + Customer Events + WhatsApp Activity</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-1 font-bold">PIPELINE</span>
                <span className="text-zinc-700 font-semibold">Reminder Engine → Workflow Orchestration → Advisor Notifications → Customer Engagement</span>
              </div>
              <div>
                <span className="text-zinc-400 uppercase tracking-widest block mb-1 font-bold">GOVERNANCE GATE</span>
                <span className="text-emerald-700 font-bold">Human Approval + Audit Logging + Role-Based Controls</span>
              </div>
            </div>
          </div>

          {/* Grid of supporting realistic enterprise cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Policy Servicing Automation",
                desc: "Handles premium reminders, lapse tracking, maturity workflows, and advisor follow-up systems.",
                icon: Landmark
              },
              {
                title: "Customer Engagement Operations",
                desc: "Automates WhatsApp engagement, onboarding workflows, and customer communication pipelines.",
                icon: MessageSquare
              },
              {
                title: "Office Workflow Orchestration",
                desc: "Routes servicing tasks, approvals, document verification, and advisor coordination across operational teams.",
                icon: ClipboardList
              },
              {
                title: "AI-Assisted Advisor CRM",
                desc: "Tracks policy lifecycle events, customer engagement history, and productivity workflows.",
                icon: Users
              }
            ].map((card, i) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={i}
                  className="border border-zinc-200 bg-white rounded-3xl p-6 sm:p-8 flex items-start gap-5 hover:border-zinc-350 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
                    <CardIcon className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Founder Philosophy */}
      <section className="section-cream py-24 md:py-32 border-b border-zinc-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Portrait */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative aspect-[3/4] w-full max-w-[200px] rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-md mb-4 shrink-0">
                <img
                  src="/founder.jpg"
                  alt="Akula Naveenkumar"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h3 className="text-sm font-bold text-zinc-950 tracking-tight">Akula Naveenkumar</h3>
              <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest mt-1 font-semibold">
                Founder &amp; Systems Architect
              </p>
            </div>
            
            {/* Right Philosophy Content */}
            <div className="md:col-span-8 space-y-5">
              <p className="text-[10px] text-zinc-550 font-mono tracking-widest uppercase font-bold">FOUNDER PHILOSOPHY</p>
              <blockquote className="text-lg sm:text-xl md:text-2xl text-zinc-900 font-semibold leading-relaxed italic text-justify md:text-left">
                &ldquo;We design enterprise-grade AI systems that simplify workflows, improve operational visibility, and support scalable business automation.&rdquo;
              </blockquote>
              <div className="w-10 h-0.5 bg-zinc-350 rounded-full" />
              <p className="text-xs text-zinc-500 leading-relaxed text-justify md:text-left font-medium">
                Aashray AI Labs develops operational AI infrastructure focused on workflow automation, governance systems, and enterprise process orchestration.
              </p>
              <p className="text-xs font-bold text-zinc-800 tracking-tight font-sans pt-2">
                — Akula Naveenkumar, Founder &amp; Systems Architect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Architecture Review CTA (Onboarding Form) */}
      <section id="consultation" className="section-dark py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0f] to-[#020202] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Information and Trust */}
            <div className="lg:col-span-5 text-left">
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-3">PROCUREMENT READY</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tighter mb-6 leading-tight font-display">
                Schedule an Architecture Review
              </h2>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-10 text-justify">
                Request a dedicated technical onboarding review with our systems engineering team to design, audit, or scope your custom model-agnostic AI pipelines under strict confidentiality protocols.
              </p>
              
              <div className="space-y-6 pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <Lock className="w-4.5 h-4.5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Confidentiality Assured</h4>
                    <p className="text-[11px] text-zinc-550 font-semibold mt-1">All shared process diagrams, workflow rules, and data payloads are protected under standard non-disclosure terms.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <Server className="w-4.5 h-4.5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">VPC / Private Deployments</h4>
                    <p className="text-[11px] text-zinc-555 font-semibold mt-1">Our orchestrators deploy natively inside AWS GovCloud, Google VPC, or local bare-metal clusters.</p>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Right side: Onboarding Flow Wizard */}
            <div className="lg:col-span-7 w-full">
              <EnterpriseForm />
            </div>
  
          </div>
        </div>
      </section>

      {/* Expandable Legal Disclaimer details block */}
      <section className="bg-[#020202] py-8 border-t border-white/5 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl text-center">
          <details className="group cursor-pointer select-none">
            <summary className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase list-none focus:outline-none flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-open:bg-cyan-500 transition-colors" />
              Disclaimer &amp; Legal Notices (Expand)
            </summary>
            <div className="mt-4 px-6 py-5 rounded-2xl bg-[#0a0a0a] border border-white/[0.04] text-[9px] text-zinc-555 leading-relaxed space-y-3 font-medium text-justify max-w-4xl mx-auto">
              <p>Aashray AI Labs provides AI software systems, workflow automation infrastructure, and enterprise operational tools. All platform representations, metrics, deployment visuals, and infrastructure simulations shown across this website are for demonstration, research, or illustrative purposes unless explicitly stated otherwise. Service availability may vary based on deployment scope, integrations, regulatory requirements, and client infrastructure environments.</p>
              <p>All third-party trademarks, integrations, and platform references belong to their respective owners. No affiliation, endorsement, or certification is implied.</p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
