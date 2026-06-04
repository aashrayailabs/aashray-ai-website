"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, ShieldCheck, Zap } from "lucide-react";
import EnterpriseForm from "@/components/EnterpriseForm";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 bg-[#020202] text-gray-150">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Information */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded-full text-[9px] font-mono tracking-widest text-cyan-400 mb-6 w-max font-bold">
              AASHRAY AI LABS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter leading-[1.05] font-display">
              Systems Assessment Intake
            </h1>
            <p className="text-sm md:text-base text-zinc-400 mb-12 leading-relaxed font-medium text-justify">
              Initiate a secure systems evaluation with our engineering architects. We analyze your operational workloads to design and deploy deterministic, globally scalable AI infrastructure under strict NDA.
            </p>
 
            <div className="space-y-6 md:space-y-8 mb-12 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shrink-0 shadow-lg">
                  <Clock className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1 tracking-tight text-sm">Deterministic SLAs</h3>
                  <p className="text-xs text-zinc-400 font-semibold leading-relaxed">Our architecture team evaluates technical feasibility parameters and provides a preliminary deployment checklist within 48 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shrink-0 shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1 tracking-tight text-sm">Institutional Security</h3>
                  <p className="text-xs text-zinc-400 font-semibold leading-relaxed">All infrastructure data and bottleneck descriptions are treated securely and governed by strict administrative access protocols.</p>
                </div>
              </div>
 
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center shrink-0 shadow-lg">
                  <Zap className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1 tracking-tight text-sm">Direct Engineering Access</h3>
                  <p className="text-xs text-zinc-400 font-semibold leading-relaxed">Avoid sales bottlenecks. You will interface directly with infrastructure architects and systems designers.</p>
                </div>
              </div>
            </div>
 
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-[9px] text-zinc-550 uppercase tracking-widest font-bold mb-2 font-mono">Secure Direct Inquiry</p>
                <a href="mailto:contact@aashrayailabs.com" className="flex items-center text-zinc-300 hover:text-white transition-colors font-semibold text-xs">
                  <Mail className="w-4 h-4 mr-2 text-cyan-400" /> contact@aashrayailabs.com
                </a>
              </div>
              <div>
                <p className="text-[9px] text-zinc-550 uppercase tracking-widest font-bold mb-2 font-mono">WhatsApp Channel</p>
                <a href="https://wa.me/8096712222" className="flex items-center text-zinc-300 hover:text-white transition-colors font-semibold text-xs">
                  <MessageCircle className="w-4 h-4 mr-2 text-cyan-400" /> +91 80967 12222
                </a>
              </div>
            </div>
          </div>
 
          {/* Right Column - Assessment Intake Form */}
          <div className="lg:col-span-7 w-full">
            <EnterpriseForm />
          </div>
          
        </div>
      </div>
    </div>
  );
}
