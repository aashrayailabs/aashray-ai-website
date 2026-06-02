 
"use client";

import Link from "next/link";
import { Mail, MessageCircle, Globe, Video } from "lucide-react";

export default function Footer() {
  const categories = [
    {
      title: "Platform",
      links: [
        { label: "MitraAI OS", href: "/platforms#mitra-ai-os" },
        { label: "Workflow Runtime", href: "/infrastructure#workflow-runtime" },
        { label: "Multi-Agent Systems", href: "/platforms#multi-agent-systems" },
        { label: "Operational AI Engine", href: "/platforms#operational-ai-engine" }
      ]
    },
    {
      title: "Infrastructure",
      links: [
        { label: "Deployment Topology", href: "/infrastructure" },
        { label: "Stateful Execution", href: "/infrastructure#workflow-runtime" },
        { label: "Subnet Setup", href: "/infrastructure#subnet-setup" },
        { label: "Governance Layer", href: "/governance" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Advisor Operations", href: "/industries#advisor" },
        { label: "Financial Services", href: "/industries#financial" },
        { label: "Customer Workflows", href: "/industries#customer" },
        { label: "Enterprise Automation", href: "/industries#enterprise" }
      ]
    },
    {
      title: "Security",
      links: [
        { label: "Security Systems", href: "/security" },
        { label: "Trust Center", href: "/trust-center" },
        { label: "Identity Control", href: "/security#iam" },
        { label: "Compliance Logs", href: "/governance#compliance" }
      ]
    },
    {
      title: "Research",
      links: [
        { label: "Systems Blueprints", href: "/research" },
        { label: "Latency Profiles", href: "/research#operational-ai" },
        { label: "Governance Models", href: "/research#governance-models" },
        { label: "Systems Status", href: "/status" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Founder Philosophy", href: "/about#philosophy" },
        { label: "Contact", href: "/contact" },
        { label: "Architecture Review", href: "/contact#review" }
      ]
    }
  ];

  return (
    <footer className="bg-[#020202] pt-20 md:pt-24 pb-10 md:pb-12 border-t border-white/[0.06] relative z-20 text-zinc-400 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mb-16 md:mb-20">
          
          {/* Brand & HQ */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group select-none" aria-label="Aashray AI Labs Home">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 shrink-0">
                <defs>
                  <linearGradient id="aashray-antigravity-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  
                  <filter id="floating-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#06b6d4" floodOpacity="0.25"/>
                  </filter>
                </defs>

                <g filter="url(#floating-shadow)">
                  <path d="M 50 12 L 88 58 L 66 58 L 66 78 L 34 78 L 34 58 L 12 58 Z" 
                        fill="url(#aashray-antigravity-gradient)" />
                        
                  <path d="M 50 26 L 74 54 L 58 54 L 58 70 L 42 70 L 42 54 L 26 54 Z" 
                        fill="#0a0e27" />
                </g>
              </svg>
              <span className="text-xl sm:text-2xl font-bold tracking-tighter text-white font-display leading-none group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
                Aashray <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">AI</span>{" "}
                <span className="text-zinc-300 font-semibold tracking-tight">Labs</span>
              </span>
            </Link>
            
            <p className="text-zinc-400 font-medium tracking-tight text-xs leading-relaxed max-w-xs text-justify">
              Secure, high-fidelity AI infrastructure for enterprises. Automating workflows and deploying governed middleware across secure subnet ecosystems.
            </p>
            
            <div className="text-[9.5px] text-zinc-500 font-mono space-y-1 font-semibold">
              <p>Operations HQ: Hyderabad, Telangana, India</p>
              <p>Deployment regions: Global Multi-Region VPC</p>
            </div>
          </div>
          
          {/* Categories Grid */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-3.5">
                <h4 className="text-[9px] font-mono font-bold text-white uppercase tracking-widest leading-none">
                  {cat.title}
                </h4>
                <div className="flex flex-col gap-2">
                  {cat.links.map((link, j) => (
                    <Link 
                      key={j} 
                      href={link.href} 
                      className="text-[11px] text-zinc-400 hover:text-white transition-colors duration-300 font-medium tracking-tight"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-mono font-semibold">
            <a href="mailto:contact@aashrayailabs.com" className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-zinc-500" /> contact@aashrayailabs.com
            </a>
            <a href="https://wa.me/8096712222" className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors">
              <MessageCircle className="w-3.5 h-3.5 text-zinc-500" /> +91 80967 12222
            </a>
          </div>
          
          <div className="flex items-center space-x-6 text-zinc-600">
            <a href="https://www.linkedin.com/company/aashray-ai-labs" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">LinkedIn</span>
            </a>
            <a href="https://aashrayailabs.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Globe size={16} />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Video size={16} />
            </a>
          </div>
        </div>

        {/* Immutable Ledger notice & Legal */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-zinc-500 font-mono font-semibold uppercase tracking-wider">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span>© 2026 Aashray AI Labs. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-zinc-400 transition-colors">Disclaimer</Link>
            <Link href="/security-notice" className="hover:text-zinc-400 transition-colors">Security Notice</Link>
          </div>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Global Infrastructure Operations
          </span>
        </div>

      </div>
    </footer>
  );
}
