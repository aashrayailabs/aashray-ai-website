"use client";

import { motion } from "framer-motion";
import { EyeOff, ShieldCheck, Database, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-950/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Operational Security Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Data Privacy &amp; <span className="text-gray-500">Residency Framework</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-medium">
            Designed for secure multi-agent systems, our data governance policies ensure tenant isolation and prevent model training exposure.
          </p>
        </div>

        {/* Content body */}
        <div className="space-y-12 bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              1. Data Sovereignty &amp; Stateless Processing
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium mb-4 text-justify">
              At Aashray AI Labs, we operate on a secure-by-default architecture. All data payloads passing through the MitraAI ecosystem are processed **state-lessly in-memory**. We do not retain, cache, or permanently store transactional payload texts on our infrastructure after workflow execution has completed. 
            </p>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              Most importantly, **your proprietary data is never used to train, fine-tune, or adapt third-party base models**. Token usage is bounded by strict corporate APIs that enforce stateless agreements, ensuring your enterprise knowledge base remains entirely yours.
            </p>
          </section>

          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              2. Data Sanitization &amp; PII Redaction
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium mb-4 text-justify">
              Before data reaches any LLM processing nodes, it passes through our automated **PII Sanitization Gate**. This ingress component automatically parses unstructured data (such as emails, claim forms, and PDF contracts) to identify and redact sensitive identifiers, including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold text-gray-400 pl-4 mb-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Personally Identifiable Information (PII)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Financial Account Numbers &amp; Routing Codes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Protected Health Information (PHI)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" /> Client Passwords &amp; Cryptographic Secrets
              </li>
            </ul>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              The sanitized output is mapped to a temporary key token during transaction execution, and the original variables are restored only at the local client egress filter.
            </p>
          </section>

          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              3. Tenant Isolation
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              Multi-tenant environments are partitioned at the database, access token, and execution levels. When hosting workflow services, each client organization is allocated an isolated workspace. API keys are generated under cryptographic separation protocols, ensuring that workflows in one workspace are physically incapable of traversing or accessing execution memories in adjacent workspaces.
            </p>
          </section>

          <section className="border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              4. Security Audits &amp; Log Visibility
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              Every operation executed by an autonomous agent creates an audit block. These blocks contain transaction metadata (timestamp, node parameters, model version, validation state) and are cryptographically signed. Client administrators can review, query, and export these logs for regulatory auditing purposes at any time, maintaining absolute visibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              5. Regional Data Operations
            </h2>
            <p className="text-sm text-gray-400 leading-[1.8] font-medium text-justify">
              All software engineering, core system architecture design, and administrative operations are conducted from our headquarters in **Hyderabad, Telangana, India**. For clients requiring specific regional hosting, Aashray AI Labs supports private VPC deployments on AWS, Google Cloud, or Azure subnets hosted in local country zones to satisfy sovereign residency criteria.
            </p>
          </section>

        </div>

        {/* Footer actions */}
        <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact" className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-gray-200 transition-colors">
            Contact Data Protection Officer
          </Link>
          <Link href="/security" className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-colors">
            Review Security Protocols
          </Link>
        </div>

      </div>
    </div>
  );
}
