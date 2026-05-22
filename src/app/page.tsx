"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bot, Workflow, BarChart3, ShieldCheck, Zap, Globe, Briefcase, Users, HeartPulse, Building2, Landmark, ShoppingCart, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import CommandCenterHero from "@/components/CommandCenterHero";
import DynamicCenterpiece from "@/components/DynamicCenterpiece";
import GlobalNetworkMap from "@/components/GlobalNetworkMap";
import LightweightIndustryCard from "@/components/LightweightIndustryCard";

export default function Home() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hero Section */}
      <CommandCenterHero />

      {/* SECTION 2 & 5 — UNIFIED MISSION CONTROL (Dynamic Centerpiece + Industry Cards) */}
      <section className="relative z-20 pb-12 md:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Dynamic Morphing Centerpiece */}
          <div className="mb-6 md:mb-8">
            <DynamicCenterpiece activeIndustry={activeIndustry} />
          </div>
          
          {/* Industry Selection Control Panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { id: 'healthcare', title: 'Healthcare Systems', icon: HeartPulse },
              { id: 'realestate', title: 'Real Estate Infra', icon: Building2 },
              { id: 'financial', title: 'Financial Intelligence', icon: Landmark },
              { id: 'ecommerce', title: 'Ecommerce Routing', icon: ShoppingCart },
              { id: 'education', title: 'Educational Tech', icon: GraduationCap },
              { id: 'manufacturing', title: 'Manufacturing Ops', icon: Zap },
              { id: 'agencies', title: 'Agency Operations', icon: Briefcase },
              { id: 'global', title: 'Global Deployment', icon: Globe }
            ].map((industry, i) => (
              <LightweightIndustryCard 
                key={industry.id}
                id={industry.id}
                title={industry.title}
                Icon={industry.icon}
                delay={i * 0.05}
                onHover={setActiveIndustry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 — PLATFORM AUTHORITY TELEMETRY */}
      <section className="relative z-20 pb-24 md:pb-40 px-4 sm:px-6">
        <motion.div style={{ y: y2 }} className="container mx-auto max-w-6xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden bg-[#020202]/80 border border-white/[0.03] shadow-[0_0_80px_rgba(6,182,212,0.02)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 to-transparent pointer-events-none" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10 relative z-10">
              {[
                { label: "Active AI Agents", value: "2,408" },
                { label: "Global Workflows", value: "84,912" },
                { label: "Countries Active", value: "14" },
                { label: "Avg Response", value: "42ms" },
                { label: "Availability", value: "99.9%" },
                { label: "API Throughput", value: "4M/s" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col relative group">
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 group-hover:text-cyan-400 transition-colors duration-500">{item.label}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                    {item.value}
                    {i % 2 === 0 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — PLATFORM CAPABILITIES */}
      <section className="py-20 md:py-32 lg:py-40 relative bg-[#000000]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-16 md:mb-24 lg:w-2/3"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tighter leading-[1.1]">Operational <span className="text-white">Intelligence</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-medium tracking-tight leading-relaxed">
              We build operational AI systems that integrate seamlessly into your business. No hype, just scalable infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Workflow Optimization", desc: "End-to-end automation of manual business processes, connecting siloed applications securely.", icon: Workflow },
              { title: "AI Operations", desc: "Deploy intelligent agents across infrastructure to handle routing, scheduling, and processing 24/7.", icon: Bot },
              { title: "Operational Visibility", desc: "Real-time telemetry and algorithmic assessment of business metrics, anomalies, and lead quality.", icon: BarChart3 },
              { title: "Infrastructure Routing", desc: "Edge-deployed event processors that securely route API payloads across your enterprise stack.", icon: Zap },
              { title: "Autonomous Coordination", desc: "Algorithmic distribution of tasks, broker assignments, and supply-chain approvals without human input.", icon: Globe },
              { title: "Live Intelligence", desc: "Continuous metadata extraction and AI processing of documents, policies, and customer inquiries.", icon: ShieldCheck }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative p-8 md:p-10 rounded-3xl md:rounded-[2rem] bg-[#030303] border border-white/[0.03] hover:border-cyan-500/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(6,182,212,0.05)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] flex items-center justify-center mb-8 border border-white/[0.03] group-hover:border-cyan-500/30 transition-all duration-700 relative z-10">
                  <service.icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight leading-tight relative z-10">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium relative z-10">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT CAPABILITY SECTION / TRUST LAYER */}
      <section className="py-24 relative bg-[#020202] border-t border-white/[0.03] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/5 via-[#020202] to-[#020202] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-[10px] md:text-xs text-cyan-500/80 font-mono tracking-widest uppercase mb-2">PROPRIETARY SYSTEMS</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter">Enterprise Infrastructure Stack</h2>
            </div>
            
            {/* Live Infrastructure Status */}
            <div className="flex gap-6 md:gap-10 opacity-60 flex-wrap">
              {[
                { label: "REGIONS", value: "14" },
                { label: "UPTIME", value: "99.998%" },
                { label: "LATENCY", value: "42ms" },
                { label: "AGENTS", value: "2,408" },
                { label: "EXECUTIONS", value: "84,912" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col md:text-right">
                  <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mb-1">{stat.label}</span>
                  <span className="text-sm md:text-base text-gray-300 font-mono font-bold tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Cognitive Reasoning Layer", desc: "Advanced inference orchestration" },
              { name: "Multi-Agent Intelligence Mesh", desc: "Distributed AI coordination systems" },
              { name: "Semantic Memory Infrastructure", desc: "Persistent contextual retrieval architecture" },
              { name: "Workflow Orchestration Engine", desc: "Automated operational execution pipelines" },
              { name: "Realtime Communication Fabric", desc: "Cross-channel messaging infrastructure" },
              { name: "Distributed Edge Network", desc: "Low-latency global routing layer" },
              { name: "Enterprise Operational Sync", desc: "Internal system interoperability" }
            ].map((tech) => (
              <div key={tech.name} className="group relative p-5 md:p-6 rounded-2xl bg-[#050505] border border-white/[0.03] hover:border-cyan-500/20 transition-all duration-700 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.05)] hover:-translate-y-1">
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="text-[8px] font-mono text-cyan-500/0 group-hover:text-cyan-500/50 uppercase tracking-widest transition-colors duration-500">SECURE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/80 group-hover:animate-pulse transition-colors duration-500" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-300 group-hover:text-white tracking-tight mb-2 transition-colors duration-500">{tech.name}</h3>
                <p className="text-[9px] md:text-[10px] text-gray-600 group-hover:text-gray-400 font-mono tracking-widest uppercase transition-colors duration-500">{tech.desc}</p>
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/0 group-hover:via-cyan-500/20 group-hover:to-cyan-500/0 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Map */}
      <GlobalNetworkMap />

      {/* Trust Section */}
      <section className="py-20 md:py-32 lg:py-40 relative bg-[#020202]">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-[1.1]">Enterprise Infrastructure. <br className="hidden sm:block"/><span className="text-gray-500">Zero Compromise.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">We engineer robust, scalable AI systems designed for operational longevity and strict data privacy.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Bank-Grade Security", desc: "SOC2 compliant infrastructure with end-to-end encryption and isolated operational environments.", icon: ShieldCheck },
              { title: "Sub-Millisecond Latency", desc: "Edge-deployed workflow execution ensuring instantaneous operational responses globally.", icon: Zap },
              { title: "Global Scale", desc: "Multi-region redundancy across enterprise cloud providers for uninterrupted service.", icon: Globe },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-[#050505] p-8 md:p-10 rounded-3xl md:rounded-[2rem] border border-white/[0.03] hover:border-white/10 transition-colors duration-700 group"
              >
                <div className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/[0.02] flex items-center justify-center mb-6 md:mb-8 border border-white/[0.03] group-hover:border-white/10 group-hover:bg-white/5 transition-all duration-700">
                  <feature.icon className="w-6 md:w-7 h-6 md:h-7 text-white/60 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 tracking-tight leading-tight text-white/90 group-hover:text-white transition-colors duration-500">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Founder Philosophy */}
      <section className="py-24 md:py-32 relative bg-[#020202] border-t border-white/[0.03]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="md:w-1/3 shrink-0">
              <div className="flex flex-col items-start">
                <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 shadow-xl bg-black">
                  <img
                    src="/founder.jpg"
                    alt="Akula Naveenkumar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  Akula Naveenkumar
                </h3>

                <p className="text-gray-400 text-sm">
                  Founder & Lead Architect
                </p>

                <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-gray-500">
                  Operational AI Infrastructure
                </p>
              </div>
            </div>
            <div className="md:w-2/3">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-relaxed font-medium tracking-tighter mb-8 border-l-2 border-cyan-500/30 pl-6 py-2">
                &quot;We design enterprise-grade AI systems that simplify workflows, improve operational visibility, and support scalable business automation.&quot;
              </blockquote>
              <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed">
                Aashray AI Labs develops operational AI infrastructure focused on intelligent automation, scalable workflows, enterprise visibility, and practical AI systems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 relative overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/5 via-[#020202] to-[#020202] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-6 text-white tracking-tighter leading-[1.1]">Ready to orchestrate?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto tracking-tight font-medium px-4 leading-relaxed">
            Schedule a technical consultation to discuss your operational bottlenecks and map out a deterministic AI architecture.
          </p>
          <Link
            href="/contact"
            className="group inline-flex w-full sm:w-auto justify-center px-8 md:px-10 py-4 md:py-5 rounded-full bg-white text-black font-semibold text-base md:text-lg hover:bg-gray-200 transition-all duration-500 items-center shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          >
            Start the Conversation 
            <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
