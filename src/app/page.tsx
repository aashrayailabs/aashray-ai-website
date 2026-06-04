"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Bot,
  BarChart3,
  FlaskConical,
  ChevronRight,
  Workflow,
  Shield,
  Cpu,
  Globe,
  Mail,
  FileText,
  Clock,
} from "lucide-react";

// ─── Reusable fade-up animation wrapper ───────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Gradient text component ──────────────────────────────────────────────────
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(135deg, #06B6D4 0%, #818CF8 50%, #3B82F6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

// ─── Animated workflow node ───────────────────────────────────────────────────
function WorkflowNode({
  icon: Icon,
  label,
  sublabel,
  active,
  color,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel: string;
  active: boolean;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`relative flex flex-col items-center gap-2 group cursor-default`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
          active
            ? "border-cyan-500/50 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
            : "border-white/8 hover:border-white/20"
        }`}
        style={{
          background: active
            ? "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.1))"
            : "rgba(255,255,255,0.02)",
        }}
      >
        <Icon
          className={`w-6 h-6 transition-colors duration-300 ${
            active ? color : "text-zinc-500 group-hover:text-zinc-300"
          }`}
        />
        {active && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      <div className="text-center">
        <p
          className={`text-xs font-semibold tracking-tight transition-colors ${
            active ? "text-white" : "text-zinc-400"
          }`}
        >
          {label}
        </p>
        <p className="text-[10px] text-zinc-600 font-medium mt-0.5">{sublabel}</p>
      </div>
    </motion.div>
  );
}

// ─── Research card ────────────────────────────────────────────────────────────
function ResearchCard({
  category,
  title,
  excerpt,
  date,
  readTime,
  slug,
  delay,
}: {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  delay: number;
}) {
  return (
    <FadeUp delay={delay}>
      <Link
        href={`/research/${slug}`}
        className="group flex flex-col h-full p-7 rounded-2xl border border-white/5 bg-[#0d0f14] hover:border-cyan-500/20 hover:bg-[#0f1218] transition-all duration-500"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-2.5 py-1 rounded-md">
            {category}
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-cyan-50 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed flex-1 font-medium">{excerpt}</p>
        <div className="flex items-center gap-4 mt-5 pt-5 border-t border-white/5 text-[11px] text-zinc-600 font-mono font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
          <span>{date}</span>
        </div>
      </Link>
    </FadeUp>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [heroLine, setHeroLine] = useState("Design and deployment of secure AI workflows, operational automation systems, governance infrastructure, and multi-agent architectures for organizations moving beyond experimentation.");
  const [heroTitle, setHeroTitle] = useState(<>We build <GradientText>operational</GradientText> AI systems <br className="hidden sm:block" />businesses can actually <GradientText>rely on</GradientText>.</>);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const { createClient } = await import("@/utils/supabase/client");
        const supabaseClient = createClient();
        if (!supabaseClient) return; // No env vars - skip CMS fetch during SSG
        
        const { data } = await supabaseClient.from('cms_content').select('*').eq('section', 'homepage');
        if (data) {
          const titleRow = data.find(r => r.key_name === 'hero_title');
          const subRow = data.find(r => r.key_name === 'hero_subtitle');
          if (titleRow && titleRow.value.text) {
             setHeroTitle(<>{titleRow.value.text}</>);
          }
          if (subRow && subRow.value.text) {
              setHeroLine(subRow.value.text.replace(/AI HOLDING COMPANY • HYDERABAD, INDIA/g, "").trim());
          }
        }
      } catch (e) {
        // CMS fetch is non-critical - silently fail and use static defaults
        console.warn('[CMS] Failed to fetch homepage content:', e);
      }
    };
    fetchCMS();
  }, []);

  // Typewriter effect for subheadline
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= heroLine.length) {
        setTypedText(heroLine.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  // Cycle through workflow steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((s) => (s + 1) % 5);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const featureCards = [
    {
      icon: Zap,
      title: "AI Workflow Automation",
      description:
        "End-to-end intelligent workflows that replace repetitive manual processes. Designed with secure deployment architectures and audit-ready workflow logging for maximum reliability.",
      gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
      border: "hover:border-cyan-500/30",
      glow: "hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)]",
      iconColor: "text-cyan-400",
      tag: "Core Platform",
      href: "/platforms",
    },
    {
      icon: Bot,
      title: "AI Assistants",
      description:
        "Custom conversational agents embedded into your internal systems. Built with governance-aware orchestration and human-reviewed fallback mechanisms to handle escalations intelligently.",
      gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
      border: "hover:border-violet-500/30",
      glow: "hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]",
      iconColor: "text-violet-400",
      tag: "AI Agents",
      href: "/architecture",
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description:
        "Transform raw operational data into structured, actionable signals. AI-powered dashboards deployed with multi-environment capability that surface patterns and anomalies in real time.",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      border: "hover:border-blue-500/30",
      glow: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]",
      iconColor: "text-blue-400",
      tag: "Analytics",
      href: "/dashboard",
    },
    {
      icon: FlaskConical,
      title: "Research & Innovation",
      description:
        "Continuous prototyping of next-generation LLM architectures and systems designs. Open-source models, technical papers, and benchmark metrics for enterprise evaluation.",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      border: "hover:border-emerald-500/30",
      glow: "hover:shadow-[0_8px_40px_rgba(16,185,129,0.12)]",
      iconColor: "text-emerald-400",
      tag: "Labs",
      href: "/research",
    },
  ];

  const workflowSteps = [
    { icon: Globe, label: "Input", sublabel: "Data / Trigger", color: "text-cyan-400" },
    { icon: Shield, label: "Sanitize", sublabel: "PII Gate", color: "text-blue-400" },
    { icon: Cpu, label: "Process", sublabel: "AI Agents", color: "text-violet-400" },
    { icon: Workflow, label: "Route", sublabel: "Logic Engine", color: "text-indigo-400" },
    { icon: Zap, label: "Deliver", sublabel: "Output / API", color: "text-emerald-400" },
  ];

  const howWeWork = [
    {
      step: "01",
      title: "Understand",
      body: "We start with a focused discovery session to map your existing workflows, identify bottlenecks, and define the automation scope.",
    },
    {
      step: "02",
      title: "Architect",
      body: "Our team designs a lightweight, modular AI pipeline — no over-engineering, no bloat. Just the right system for your specific problem.",
    },
    {
      step: "03",
      title: "Build & Test",
      body: "We build in iterative cycles, validating each stage with real data, human-in-the-loop checkpoints, and rigorous edge-case testing.",
    },
    {
      step: "04",
      title: "Deploy & Support",
      body: "We deploy to your infrastructure (cloud or on-prem), provide runbooks, and remain available for ongoing refinement and support.",
    },
  ];

  const researchPosts = [
    {
      category: "AI Infrastructure",
      title: "Building Secure Enterprise AI Systems",
      excerpt:
        "An exploration into reducing conversational latency by shifting orchestration layers from central clouds to specialized regional endpoints.",
      date: "May 12, 2026",
      readTime: "8 min",
      slug: "architecture-of-operational-ai-infrastructure",
    },
    {
      category: "Workflow Governance",
      title: "Why Human Approval Layers Still Matter in AI Operations",
      excerpt:
        "The case for deterministic human gates in AI workflows, and how to design them without sacrificing speed or automation throughput.",
      date: "May 18, 2026",
      readTime: "7 min",
      slug: "why-human-approval-layers-still-matter",
    },
    {
      category: "AI Infrastructure",
      title: "Stateful vs Stateless AI Infrastructure",
      excerpt:
        "Architectural trade-offs when choosing between stateful orchestration engines and stateless serverless AI pipelines at enterprise scale.",
      date: "May 22, 2026",
      readTime: "9 min",
      slug: "stateful-vs-stateless-ai-infrastructure",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#080a0f] text-zinc-300 font-sans">

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">

        {/* Background glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.06) 45%, transparent 75%)",
            }}
          />
          <div
            className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>


        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-5xl mx-auto mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] font-bold tracking-[-0.04em] leading-[1.06] text-white font-display">
            {heroTitle}
          </h1>
        </motion.div>

        {/* Typewriter sub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto min-h-[3rem] sm:min-h-[2rem] font-sans leading-relaxed">
            {typedText}
            <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20"
        >
          <Link
            href="/contact"
            className="group relative px-8 py-4 rounded-xl text-sm font-bold tracking-wide text-white overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
              boxShadow: "0 8px 32px rgba(6,182,212,0.3), 0 2px 8px rgba(59,130,246,0.2)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="/platforms"
            className="group px-8 py-4 rounded-xl text-sm font-bold tracking-wide text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-2"
          >
            Explore the platform
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Hero glass card — mini preview */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full max-w-3xl mx-auto relative"
        >
          <div
            className="rounded-2xl border border-white/8 p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(13,15,20,0.95) 0%, rgba(8,10,15,0.98) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[11px] font-mono text-zinc-600 font-semibold">
                  aashray.runtime · workflow-engine
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE
              </div>
            </div>
            {/* Pipeline steps */}
            <div className="flex items-center justify-between gap-2">
              {workflowSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <WorkflowNode {...step} active={activeWorkflowStep === i} delay={i * 0.1} />
                  {i < workflowSteps.length - 1 && (
                    <div className="flex-1 h-px relative overflow-hidden mx-1">
                      <div className="absolute inset-0 bg-white/5" />
                      <motion.div
                        className="absolute inset-0 origin-left"
                        style={{
                          background: "linear-gradient(90deg, #06B6D4, #3B82F6)",
                        }}
                        animate={{
                          scaleX: activeWorkflowStep > i ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Footer bar */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-600 font-semibold">
              <span>Latency · 14ms avg</span>
              <span>PII Gate · Active</span>
              <span>Audit Log · Signed</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── PLATFORM CARDS ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 border-t border-white/[0.06] relative">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-4">
              What We Build
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white font-display leading-tight">
              From idea to working AI system.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-4 font-medium">
              We design and build practical AI systems — not theoretical demos. Every product we ship runs in production.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featureCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div
                    className={`group relative h-full p-8 rounded-2xl border border-white/6 transition-all duration-500 ${card.border} ${card.glow} overflow-hidden`}
                    style={{ background: "rgba(10,12,18,0.8)" }}
                  >
                    {/* Card gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      {/* Tag */}
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500 mb-5 block">
                        {card.tag}
                      </span>

                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon className={`w-6 h-6 ${card.iconColor}`} />
                        </div>
                      </div>

                      {/* Text */}
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-50 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-medium mb-8">
                        {card.description}
                      </p>

                      {/* Learn more link */}
                      <Link href={card.href} className="inline-flex items-center gap-2">
                        <span
                          className={`text-[11px] font-bold tracking-widest uppercase ${card.iconColor} transition-colors`}
                        >
                          Explore Platform
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 ${card.iconColor} group-hover:translate-x-1 transition-transform duration-300`}
                        />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── AI WORKFLOW VISUALIZATION ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 border-t border-white/[0.06] relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <FadeUp>
              <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-4">
                How It Works
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display leading-tight mb-6">
                Multi-agent pipelines, built for reliability.
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-8 font-medium">
                Every workflow we build runs through a deterministic state machine — no hallucinations, no silent failures. Each step is auditable, each transition is logged.
              </p>
              <div className="space-y-4">
                {[
                  { label: "PII sanitization at the ingress gate", color: "bg-cyan-500" },
                  { label: "Parallel specialized agent execution", color: "bg-blue-500" },
                  { label: "Programmatic rules engine validation", color: "bg-violet-500" },
                  { label: "Human-in-the-loop approval gates", color: "bg-indigo-500" },
                  { label: "Immutable signed audit trail output", color: "bg-emerald-500" },
                ].map((item, i) => (
                  <FadeUp key={i} delay={i * 0.07}>
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color}`} />
                      <span className="text-sm text-zinc-400 font-medium">{item.label}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  View architecture blueprint
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeUp>

            {/* Right: Animated DAG */}
            <FadeUp delay={0.2}>
              <div
                className="relative rounded-2xl border border-white/8 p-6 overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(10,12,18,0.98) 0%, rgba(6,8,14,1) 100%)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Top label */}
                <div className="flex items-center gap-2 mb-6">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                    Orchestration DAG · Live
                  </span>
                </div>

                {/* DAG Visualization */}
                <div className="space-y-3">
                  {[
                    { id: "01", name: "Payload Ingestion", actor: "API Ingress Proxy", status: "TLS Masked", statusColor: "text-cyan-400", barColor: "bg-cyan-500" },
                    { id: "02", name: "PII Scrub Gate", actor: "Sanitization Engine", status: "Tokenized", statusColor: "text-blue-400", barColor: "bg-blue-500" },
                    { id: "03", name: "Data Extraction", actor: "Agent A (Specialized)", status: "Parallel", statusColor: "text-violet-400", barColor: "bg-violet-500" },
                    { id: "04", name: "Rules Validation", actor: "Rules Engine FSM", status: "FSM Passed", statusColor: "text-indigo-400", barColor: "bg-indigo-500" },
                    { id: "05", name: "Ledger Commit", actor: "Database Ledger", status: "Signed + Written", statusColor: "text-emerald-400", barColor: "bg-emerald-500" },
                  ].map((step, i) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.025] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="text-[10px] font-mono text-zinc-600 font-bold w-6 shrink-0">{step.id}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white tracking-tight truncate">{step.name}</p>
                        <p className="text-[10px] text-zinc-600 font-medium">{step.actor}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${step.barColor} opacity-80`} />
                        <span className={`text-[10px] font-mono font-semibold ${step.statusColor}`}>
                          {step.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Latency footer */}
                <div className="flex gap-6 mt-5 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-600 font-semibold">
                  <span>Target latency · 180ms</span>
                  <span>DAG status · Validated</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="container mx-auto max-w-6xl">
          <FadeUp className="max-w-xl mb-16">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-4">
              Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display leading-tight">
              Simple, focused, and transparent.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWork.map((step, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl border border-white/6 bg-[#0a0c12] hover:border-white/12 transition-colors h-full group">
                  {/* Step number */}
                  <div className="mb-5">
                    <span
                      className="text-5xl font-bold font-display"
                      style={{
                        background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.08))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight font-display mb-3 group-hover:text-cyan-50 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESEARCH & INSIGHTS ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 border-t border-white/[0.06] relative overflow-hidden">
        {/* Subtle ambient */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(59,130,246,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto max-w-6xl relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <FadeUp>
              <p className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-4">
                Research & Insights
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white font-display leading-tight">
                Engineering perspectives<br />
                <span className="text-zinc-500">from our lab.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group shrink-0"
              >
                <FileText className="w-4 h-4" />
                View all research
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {researchPosts.map((post, i) => (
              <ResearchCard key={i} {...post} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 border-t border-white/[0.06] relative overflow-hidden">
        {/* CTA background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 120%, rgba(6,182,212,0.08) 0%, transparent 55%)",
          }}
        />
        <div className="container mx-auto max-w-4xl text-center relative">
          <FadeUp>
            <div
              className="relative rounded-3xl border border-white/8 p-12 sm:p-16 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(13,15,22,0.98) 0%, rgba(8,10,16,1) 100%)",
                boxShadow: "0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400">
                    Start a project
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] text-white font-display leading-tight mb-6">
                  Let&apos;s build something{" "}
                  <GradientText>intelligent</GradientText>
                  .
                </h2>

                <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto mb-10 font-medium">
                  Whether you have a clear automation goal or just an idea — we&apos;re happy to explore it together. No hard sell, no fluff.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Link
                    href="/contact"
                    className="group relative px-10 py-4 rounded-xl text-sm font-bold tracking-wide text-white overflow-hidden transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                      boxShadow: "0 8px 32px rgba(6,182,212,0.35), 0 2px 8px rgba(59,130,246,0.25)",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get in touch
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <a
                    href="mailto:contact@aashrayailabs.com"
                    className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    contact@aashrayailabs.com
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
