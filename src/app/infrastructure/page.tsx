"use client";

import { useState } from "react";
import { Server, Database, Lock, ShieldCheck, Zap, Cpu, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InfrastructurePage() {
  const [activeDeployment, setActiveDeployment] = useState<"vpc" | "onprem" | "saas">("vpc");

  const deploymentSpecs = {
    vpc: {
      title: "Private VPC Cloud Subnets",
      desc: "Deploy MitraAI compute nodes inside your organization's own AWS, Google Cloud, or Microsoft Azure Virtual Private Clouds. Data residency is completely local to your subnets.",
      parameters: [
        { name: "Isolation Boundary", value: "Locked Security Groups (0 ingress)" },
        { name: "Outbound Routing", value: "Secure NAT Gateway Proxies" },
        { name: "Ledger Storage", value: "Encrypted PostgreSQL DB Subnets" }
      ]
    },
    onprem: {
      title: "On-Premises Bare-Metal Clusters",
      desc: "For highly regulated industries requiring absolute physical isolation, Aashray AI Labs supports deployments on local bare-metal server configurations running isolated model weights.",
      parameters: [
        { name: "Hardware Specs", value: "NVIDIA H100 / A100 server arrays" },
        { name: "Data Security", value: "Zero external network connections" },
        { name: "Uptime Sync", value: "Local containerized rule engines" }
      ]
    },
    saas: {
      title: "SaaS Shared Tenant Instance",
      desc: "A stateless cloud platform hosted by Aashray AI Labs. payloads are processed state-lessly in-memory under strict JWT tokens, with zero persistence or model training loops.",
      parameters: [
        { name: "Data Storage", value: "Stateless (In-Memory Processing)" },
        { name: "PII Security", value: "Token masked prior to API routing" },
        { name: "Encryption Standard", value: "TLS 1.3 transit / AES-256 state" }
      ]
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#faf9f6] text-zinc-700 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.015] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 bg-teal-50/50 mb-6 font-semibold">
            <Server className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[10px] font-mono text-teal-800 tracking-wider uppercase font-semibold">Deployment Infrastructure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6">
            Enterprise AI <br /> <span className="text-zinc-500">Deployment Architecture</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-medium">
            Bank-grade, edge-deployed infrastructure designed to isolate, process, and secure multi-agent workflows across your subnets.
          </p>
        </div>

        {/* Deployment selector tab grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(deploymentSpecs).map(([key, spec]) => (
              <div
                key={key}
                onClick={() => setActiveDeployment(key as "vpc" | "onprem" | "saas")}
                className={`p-6 rounded-3xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  activeDeployment === key
                    ? "bg-white border-zinc-300 shadow-[0_4px_20px_rgba(24,24,27,0.05)]"
                    : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100"
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                    {key === "vpc" && <Network className="w-5 h-5 text-teal-700" />}
                    {key === "onprem" && <Server className="w-5 h-5 text-teal-700" />}
                    {key === "saas" && <Zap className="w-5 h-5 text-teal-700" />}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-800 mb-2 tracking-tight">{spec.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-semibold mb-6 text-justify">{spec.desc}</p>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-400">Deployment Type</span>
                  <span className="text-teal-700 font-bold uppercase">{key}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed specifications based on active selector */}
        <section className="mb-20">
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-xl relative overflow-hidden">
            <h3 className="text-xs font-mono text-teal-700 tracking-widest uppercase mb-6 font-semibold">Node Specs &amp; Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">{deploymentSpecs[activeDeployment].title} Spec</h4>
                <p className="text-xs sm:text-sm text-zinc-500 leading-[1.8] font-semibold text-justify mb-6">
                  Our systems engineering team works directly with client IT administrators to deploy, configure, and audit the software. The installation is fully containerized using Docker/Kubernetes configurations.
                </p>
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-[10px] text-zinc-500 leading-relaxed">
                  [DISCLAIMER] Specific deployment speeds, sub-nets configurations, and model API setups are subject to customer infrastructure parameters.
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {deploymentSpecs[activeDeployment].parameters.map((param, i) => (
                  <div key={i} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex justify-between items-center">
                    <span className="text-zinc-500 font-semibold">{param.name}</span>
                    <span className="text-zinc-900 font-bold">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure components */}
        <section className="mb-20">
          <h3 className="text-xs font-mono text-teal-700 tracking-widest uppercase mb-4 font-semibold">Platform Security Guardrails</h3>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-12">Built-in Security Mechanics</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <Lock className="w-5 h-5 text-teal-700" />
              </div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3 tracking-tight">Stateless API Ingress</h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">
                Incoming payloads are decrypted and normalized in temporary memory. Any variables matching private data are tokenized before calling the orchestration nodes.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <Cpu className="w-5 h-5 text-teal-700" />
              </div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3 tracking-tight">Isolated Execution Subnets</h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">
                Worker agents run inside isolated subnet boundaries, ensuring that execution anomalies or logic loops in one model subnet cannot impact neighboring tasks.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-6">
                <Database className="w-5 h-5 text-teal-700" />
              </div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3 tracking-tight">Immutable Ledger Logging</h4>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">
                Every transaction result, validation signature, and human override command writes an encrypted ledger entry on a local database schema.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border-t border-zinc-200">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-4 font-display">Initialize Infrastructure Onboarding</h2>
          <p className="text-sm text-zinc-500 font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Partner with Aashray AI Labs to build deterministic AI systems and intelligent workflow automation for your enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-full text-center shadow-md animate-none"
            >
              Consult Engineering
            </Link>
            <Link 
              href="/platforms" 
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-200 hover:border-zinc-350 bg-white text-zinc-700 transition-colors rounded-full text-center"
            >
              Explore MitraAI OS Platforms
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
