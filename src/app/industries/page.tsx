"use client";

import { ArrowRight, Briefcase, HeartPulse, Building2, Zap, GraduationCap, Workflow, Landmark, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DynamicIndustryShowcase from "@/components/DynamicIndustryShowcase";

function IndustriesContent() {
  const searchParams = useSearchParams();
  const target = searchParams.get("target");
  
  const [activeIndustry, setActiveIndustry] = useState("financial");

  useEffect(() => {
    if (target && ["financial", "healthcare", "realestate", "ecommerce", "manufacturing", "education", "agencies"].includes(target)) {
      setActiveIndustry(target);
    }
  }, [target]);

  const setIndustry = (id: string) => {
    setActiveIndustry(id);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 container mx-auto">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <Briefcase className="w-12 h-12 text-white/80 mx-auto mb-8" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-8 tracking-tighter leading-[1.1] text-white">
          Built for <br className="hidden md:block" /> <span className="text-white">Enterprise</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-medium">
          We deploy robust AI infrastructure for Healthcare, Finance, Real Estate, Manufacturing, and Consulting sectors across the globe.
        </p>
      </div>
      
      {/* Flagship Interactive Showcase */}
      <div className="mb-24 md:mb-32">
        <DynamicIndustryShowcase activeIndustryId={activeIndustry} />
      </div>

      <div className="text-center mb-10">
        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Select Operating Environment</h3>
        <div className="w-16 h-1 bg-cyan-500/30 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
        
        {[
          { id: "financial", title: "Financial & Insurance", icon: Landmark },
          { id: "healthcare", title: "Healthcare Operations", icon: HeartPulse },
          { id: "realestate", title: "Real Estate Infra", icon: Building2 },
          { id: "manufacturing", title: "Manufacturing Ops", icon: Zap },
          { id: "ecommerce", title: "Ecommerce Routing", icon: ShoppingCart },
          { id: "education", title: "Educational Systems", icon: GraduationCap },
          { id: "agencies", title: "Agencies & Service Ops", icon: Workflow },
        ].map((ind) => (
          <div 
            key={ind.id}
            onClick={() => setIndustry(ind.id)}
            className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center group ${
              activeIndustry === ind.id 
                ? "bg-[#0a0a0a] border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-105" 
                : "bg-[#030303] border-white/5 hover:border-white/20 hover:bg-[#080808] opacity-60 hover:opacity-100"
            }`}
          >
            <ind.icon className={`w-8 h-8 mb-4 transition-colors duration-500 ${activeIndustry === ind.id ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"}`} />
            <h4 className={`text-sm font-bold tracking-tight transition-colors duration-500 ${activeIndustry === ind.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>{ind.title}</h4>
            {activeIndustry === ind.id && (
              <div className="mt-3 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-emerald-400">Active</span>
              </div>
            )}
          </div>
        ))}

      </div>

      <div className="flex justify-center mt-12">
        <Link href="/contact" className="group px-8 md:px-10 py-4 md:py-5 rounded-md bg-[#0a0a0a] border border-white/10 hover:border-cyan-500/50 text-white font-semibold transition-all duration-500 flex items-center shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          Schedule Architecture Review <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202] text-cyan-400 flex items-center justify-center font-mono">LOADING INFRASTRUCTURE...</div>}>
      <IndustriesContent />
    </Suspense>
  );
}
