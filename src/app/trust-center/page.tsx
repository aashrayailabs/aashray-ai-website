"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Database, Lock, Activity, FileText, ArrowRight, Gavel, CheckCircle2, AlertTriangle, ShieldCheck, Scale } from "lucide-react";
import Link from "next/link";

export default function TrustCenterPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-950/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Enterprise Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Enterprise <span className="text-gray-500">Trust Center</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            The foundation of Aashray AI Labs' systems compliance. Access our security blueprints, operational governance parameters, privacy standards, and live system status.
          </p>
        </div>

        {/* Pillars Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "Security Architecture",
              desc: "Explore details regarding private VPC subnet topologies, AES-256 state encryption, zero model storage, and egress payload safety scanning.",
              href: "/security",
              icon: Lock,
              badge: "Stateless VPC"
            },
            {
              title: "System Governance",
              desc: "Inspect how we bind AI execution paths using programmatic rules engines and automated human-in-the-loop authorization gates.",
              href: "/governance",
              icon: Eye,
              badge: "SOP-Enforced"
            },
            {
              title: "Platform Status",
              desc: "Review live heartbeats, API routing status, network scheduler latencies, worker nodes state, and incident history registers.",
              href: "/status",
              icon: Activity,
              badge: "Uptime Live"
            },
            {
              title: "Data Privacy",
              desc: "Read our commitments on stateless processing logs, in-memory execution boundaries, and automated PII database redaction.",
              href: "/privacy",
              icon: Database,
              badge: "PII Scrubbed"
            },
            {
              title: "Terms & Legal Boundaries",
              desc: "Review informational simulation disclaimers, human validation requirements in production environments, and regulatory jurisdictions.",
              href: "/legal",
              icon: Gavel,
              badge: " Hyderabad Jurisdiction"
            },
            {
              title: "Ecosystem Dashboard",
              desc: "Access the multi-tenant Command Center mockup displaying interactive workflow topologies and log stream tracers.",
              href: "/dashboard",
              icon: Shield,
              badge: "SaaS Console"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group p-8 rounded-3xl bg-[#050505] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 border border-white/5 bg-[#080808] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">{item.desc}</p>
              </div>

              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white border-b border-white/10 pb-1 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all w-fit"
              >
                Access Portal
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Detailed Core Trust Principles */}
        <section className="mb-20">
          <h3 className="text-xs font-mono text-cyan-500 tracking-widest uppercase mb-4 font-semibold">Trust &amp; Governance Framework</h3>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-12">Core Operational Standards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Principle 1: Human-in-the-Loop */}
            <div className="p-8 rounded-3xl bg-[#050505] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">Human Oversight Philosophy</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-[1.8] font-medium text-justify">
                We believe that true operational safety lies in collaborative oversight. The MitraAI orchestration engine is built to handle cognitive classification and high-speed data routing, but critical action execution nodes (e.g., executing fund transfers, updating regulatory records, finalized leasing contracts) **always require a manual signature**. When transaction thresholds are breached, the workflow suspends, and is routed to a human operator queue.
              </p>
            </div>

            {/* Principle 2: Limitations Disclosure */}
            <div className="p-8 rounded-3xl bg-[#050505] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">AI Limitations Disclosure</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-[1.8] font-medium text-justify">
                Large language models are probabilistic processors. They can suffer from context window degradation, token latency, and cognitive hallucinations. Aashray AI Labs mitigates these boundaries programmatically: we wrap LLM classifications inside **syntactic schema validators (Pydantic / JSON schema)** and code-defined Finite State Machines. AI is never allowed to dictate its own state transitions.
              </p>
            </div>

            {/* Principle 3: Privacy-by-design */}
            <div className="p-8 rounded-3xl bg-[#050505] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">Privacy-by-Design Approach</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-[1.8] font-medium text-justify">
                Enterprise data privacy is non-negotiable. Incoming documents pass through local, containerized sanitization gates that scrub PII variables before routing. All data payloads are processed stateless-ly in transient memory. We enforce a strict **zero-retention policy**, ensuring customer data is never logged, cached, or used for model training loops.
              </p>
            </div>

            {/* Principle 4: Deployment transparency */}
            <div className="p-8 rounded-3xl bg-[#050505] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">Deployment &amp; Model Transparency</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-[1.8] font-medium text-justify">
                Our system is model-agnostic. We provide deployment blueprints enabling the MitraAI engine to host within your own AWS/GCP private subnets. This guarantees that your data stays inside your corporate network boundaries. Our agnostic architecture lets you hot-swap model endpoints in real-time, preventing platform lock-in and vendor dependencies.
              </p>
            </div>

          </div>
        </section>

        {/* Security Posture Summary Checklist */}
        <section className="p-8 md:p-12 rounded-3xl bg-[#050505] border border-white/5 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.01] blur-2xl rounded-full" />
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-xl font-bold text-white tracking-tight">Security Posture &amp; Compliance Engineering Design</h2>
            <p className="text-xs text-gray-400 font-medium mt-1">Our systems are engineered from the ground up to support institutional compliance principles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-medium text-xs text-gray-400">
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Designed for SOC 2 Type II compliance framework guidelines.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Supports GDPR and regional data compliance processing agreements.</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Stateless in-memory processing guarantees zero data leakage.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>API rate limiting and DDoS protection shields all subnets.</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Encrypted using TLS 1.3 in transit and AES-256 at rest.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Cryptographically signed decision trail logs stored locally.</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
