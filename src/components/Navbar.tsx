 
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Cpu, Server, Layers, Database, Landmark, Shield, Network, MessageSquare, CheckSquare, FileText, Lock, Activity, Zap, Terminal, Info, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<any>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const menuConfig: Record<string, { label: string; items: DropdownItem[] }> = {
    platform: {
      label: "Platform",
      items: [
        { title: "Aashray AI OS", desc: "Enterprise orchestration runtime for governed AI operations.", href: "/platforms#aashray-ai-os", icon: Layers },
        { title: "Workflow Runtime", desc: "Stateful backpressure-aware execution engine.", href: "/infrastructure#workflow-runtime", icon: Cpu },
        { title: "Multi-Agent Systems", desc: "Cooperative, specialized agent topologies.", href: "/platforms#multi-agent-systems", icon: Users },
        { title: "Operational AI Engine", desc: "Model-agnostic backend inference and routing.", href: "/platforms#operational-ai-engine", icon: Zap }
      ]
    },
    solutions: {
      label: "Solutions",
      items: [
        { title: "Advisor Operations", desc: "Intelligent workflow orchestration for client management and automation.", href: "/industries#advisor", icon: Users },
        { title: "Financial Services Automation", desc: "High-fidelity bank ledger and reconciliation operations.", href: "/industries#financial", icon: Landmark },
        { title: "Customer Workflow Systems", desc: "Intelligent routing and support escalation queues.", href: "/industries#customer", icon: MessageSquare },
        { title: "Enterprise Automation", desc: "End-to-end back-office corporate process pipelines.", href: "/industries#enterprise", icon: Network }
      ]
    },
    infrastructure: {
      label: "Infrastructure",
      items: [
        { title: "Deployment Topology", desc: "Private VPC GovCloud and bare-metal specs.", href: "/infrastructure", icon: Server },
        { title: "Security Systems", desc: "TLS 1.3 encryption and isolated compartment gates.", href: "/security", icon: Lock },
        { title: "Governance Layers", desc: "Redaction of PII and audit-trail constraint models.", href: "/governance", icon: CheckSquare },
        { title: "Audit Infrastructure", desc: "Immutable signed ledger databases.", href: "/trust-center", icon: Database }
      ]
    },
    research: {
      label: "Research",
      items: [
        { title: "Operational AI", desc: "Systems blueprints and latency profiles.", href: "/research#operational-ai", icon: Activity },
        { title: "Workflow Reliability", desc: "Retries, mitigation loops, and queue caching.", href: "/status", icon: Cpu },
        { title: "Governance Models", desc: "Verification metrics and risk guardrails.", href: "/research#governance-models", icon: Lock },
        { title: "Architecture Systems", desc: "Formal systems specifications and research.", href: "/research", icon: Terminal }
      ]
    },
    company: {
      label: "Company",
      items: [
        { title: "About", desc: "Core technology studio background.", href: "/about", icon: Info },
        { title: "Founder Philosophy", desc: "Founder Akula Naveenkumar's systems vision.", href: "/about#philosophy", icon: Cpu },
        { title: "Contact", desc: "Secure communication pathways.", href: "/contact", icon: MessageSquare },
        { title: "Architecture Review", desc: "Direct systems engineer review queues.", href: "/contact#review", icon: Server }
      ]
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isOpen
          ? "bg-[#020202] border-white/5 py-4"
          : scrolled
          ? "glass-nav py-4 border-white/5 h-[76px]"
          : "bg-transparent py-5 border-transparent h-[76px]"
      } flex items-center`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center w-full">
        {/* TEXT-ONLY BRANDING - Increased size by 20% */}
        <Link href="/" className="flex flex-col items-start justify-center group shrink-0 select-none">
          <span className="text-[18px] sm:text-[19px] font-extrabold tracking-[0.06em] text-white group-hover:text-zinc-150 transition-colors duration-300 font-display uppercase leading-none">
            AASHRAY AI LABS
          </span>
          <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.04em] text-zinc-400 mt-[6px] group-hover:text-zinc-355 transition-colors duration-300 font-mono uppercase leading-none">
            Operational AI Infrastructure
          </span>
        </Link>

        {/* Desktop Nav - Mega Menu Trigger */}
        <nav 
          className="hidden xl:flex items-center space-x-2"
          onMouseLeave={handleMouseLeave}
        >
          {Object.keys(menuConfig).map((key) => {
            const menu = menuConfig[key];
            const isActive = activeDropdown === key;
            return (
              <div 
                key={key} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
              >
                <button
                  type="button"
                  className={`px-4 py-2 text-[13px] font-bold tracking-tight transition-colors duration-300 flex items-center gap-1 cursor-pointer ${
                    isActive ? "text-white animate-pulse" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {menu.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "rotate-180 text-cyan-405" : "text-zinc-500"}`} />
                </button>

                {/* MEGA DROPDOWN PANEL (Desktop) */}
                <AnimatePresence>
                  {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] max-w-[calc(100vw-40px)] mega-dropdown-panel rounded-2xl p-5 z-50 overflow-hidden shadow-2xl"
                      >
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {menu.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start gap-3 p-2 rounded-xl border border-transparent mega-dropdown-item group/item"
                            >
                              <div className="w-8.5 h-8.5 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center shrink-0 group-hover/item:border-cyan-500/20 group-hover/item:bg-cyan-950/20 transition-all duration-300">
                                <Icon className="w-4 h-4 text-zinc-400 group-hover/item:text-cyan-400 transition-colors duration-300" />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1 transition-colors duration-300 group-hover/item:text-cyan-400">
                                  {item.title}
                                  <ArrowRight className="w-3 h-3 text-cyan-400/0 -translate-x-1 group-hover/item:text-cyan-400 group-hover/item:translate-x-0 transition-all duration-300" />
                                </span>
                                <span className="text-[10px] text-zinc-400 leading-normal font-medium max-w-[210px]">
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="pl-6 border-l border-white/10 flex items-center">
            <Link
              href="/contact"
              className="px-5 py-2 text-[11px] font-bold tracking-wider uppercase rounded-lg bg-[#ffffff] text-black hover:bg-gray-200 transition-colors duration-500 shadow-md font-sans"
            >
              Architecture Review
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-gray-300 hover:text-white transition-colors p-2 -mr-2 z-55 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#020202] z-45 xl:hidden flex flex-col justify-between pt-24 pb-12 px-6 overflow-y-auto"
          >
            {/* Accordion Menu Links */}
            <div className="flex flex-col space-y-4 my-auto max-w-md mx-auto w-full">
              {Object.keys(menuConfig).map((key) => {
                const menu = menuConfig[key];
                return (
                  <div key={key} className="border-b border-zinc-900/50 pb-2">
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2 font-bold pl-1">
                      {menu.label}
                    </p>
                    <div className="flex flex-col space-y-1.5 pl-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-300 tracking-tight"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Anchored CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: "easeOut" }}
              className="pt-8 border-t border-zinc-900 flex flex-col items-center justify-center max-w-md mx-auto w-full"
            >
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-4">
                Enterprise Inquiries
              </p>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-[280px] py-3 text-center text-xs font-bold tracking-wider uppercase rounded-md bg-white text-zinc-950 hover:bg-zinc-100 active:bg-zinc-200 transition-colors shadow-sm font-sans"
              >
                Schedule Architecture Review
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
