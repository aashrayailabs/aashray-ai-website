"use client";

import { motion } from "framer-motion";
import { FileText, ShieldAlert, Gavel, Scale, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-950/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Gavel className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Regulatory &amp; Legal Framework</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Operational Terms <br /> &amp; <span className="text-gray-500">Service Boundaries</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-medium">
            Review the structural parameters, simulation disclaimers, and human-in-the-loop operational bounds governing our systems.
          </p>
        </div>

        {/* Content body */}
        <div className="space-y-12 bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              1. Software Provision &amp; Service Scope
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium mb-4 text-justify">
              Aashray AI Labs is an enterprise software systems designer. We build operational AI software, deterministic agentic architectures, and automated data pipelines. We do not act as licensed financial advisors, medical practitioners, insurers, or legal consultancies.
            </p>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              Our products, platforms, and services are technical building blocks. Any specific operational deployment of our software inside commercial, financial, or medical operations remains the sole responsibility of the customer organization, which must maintain independent regulatory clearance to conduct its business functions.
            </p>
          </section>

          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              2. Simulation &amp; Metrics Disclaimer
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              All dashboard simulations, runtime execution logs, topology representations, and workflow charts shown across our marketing pages, including the `/dashboard` and `/governance` demos, are **simulated software visualizations**. 
            </p>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium mt-3 text-justify">
              These representations demonstrate architectural capabilities and system logic configurations rather than reflecting active, live corporate database integrations or real customer contracts, unless explicitly marked as direct case study telemetry.
            </p>
          </section>

          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              3. Human-in-the-Loop Oversight Requirements
            </h2>
            <div className="p-4 rounded-2xl bg-cyan-950/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold leading-relaxed mb-4">
              [WARNING] Autonomous AI workflows are probabilistic in classification. Aashray AI Labs mandates that all enterprise software installations enforce human-in-the-loop validation barriers.
            </div>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              Specifically, any automated action involving financial settlement, contract execution, patient diagnosis routing, or compliance override exceeding pre-set organizational risk boundaries **must** require physical authentication and validation by a human controller. Aashray AI Labs disclaims all liability for downstream business outcomes in instances where client systems are configured to bypass human audit gates.
            </p>
          </section>

          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              4. System Dependencies &amp; Latency SLAs
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              Automated workflow execution rates and latency metrics (e.g. 42ms node speeds) depend directly on the performance and availability of the client's internal host databases, API speed thresholds, local server performance, and external LLM base model vendor uptime. Aashray AI Labs does not guarantee specific latency levels in instances where external dependency delays or third-party outages occur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              5. Governing Law and Operations Jurisdiction
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              These operational terms and all software licenses issued by Aashray AI Labs are governed and construed under the laws applicable in **Hyderabad, Telangana, India**. Any legal action or dispute arising from the use of our software infrastructure remains subject to the exclusive jurisdiction of the competent courts located in Hyderabad, Telangana.
            </p>
          </section>

        </div>

        {/* Footer actions */}
        <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact" className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors">
            Contact Operations Counsel
          </Link>
          <Link href="/governance" className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-colors">
            Inspect Governance Controls
          </Link>
        </div>

      </div>
    </div>
  );
}
