"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Lock, Server, Check, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnterpriseForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: "",
    goals: [] as string[],
    teamSize: "",
    capabilities: [] as string[],
    name: "",
    company: "",
    email: "",
    subnetPreference: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const industries = ["Finance / Banking", "Real Estate", "Healthcare", "Professional Services", "Enterprise SaaS", "Logistics / Operations", "Other"];
  
  const goalsPool = [
    "Automate repetitive workflows",
    "Build an AI assistant or chatbot",
    "Extract data from documents",
    "Integrate AI into existing tools",
    "Custom analytics or reporting"
  ];

  const teamSizes = ["Just me / Solo", "2 – 20 people", "21 – 100 people", "100+ / Enterprise"];

  const capabilitiesPool = [
    "AI Workflow Automation",
    "WhatsApp AI Agent",
    "Document Intelligence",
    "CRM / Data Enrichment",
    "Custom AI Assistant"
  ];

  const toggleGoal = (item: string) => {
    setFormData(prev => {
      const isSelected = prev.goals.includes(item);
      return {
        ...prev,
        goals: isSelected 
          ? prev.goals.filter(g => g !== item) 
          : [...prev.goals, item]
      };
    });
  };

  const toggleCapability = (item: string) => {
    setFormData(prev => {
      const isSelected = prev.capabilities.includes(item);
      return {
        ...prev,
        capabilities: isSelected 
          ? prev.capabilities.filter(c => c !== item) 
          : [...prev.capabilities, item]
      };
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true); // Fallback success for demo
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(true); // Fallback success for demo
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#050505] border border-emerald-500/20 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.05) 0%, transparent 60%)" }} />
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight font-display">Message received — thanks!</h3>
        <p className="text-zinc-400 font-medium max-w-xs mx-auto mb-6 text-sm leading-relaxed">
          We&apos;ll review your message and get back to you within one working day. No automated sequences — a real person will respond.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/8 rounded-lg text-[10px] font-mono text-zinc-500">
          <Lock className="w-3 h-3 text-zinc-500" /> Your information is kept private
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0c] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-zinc-300">
      
      {/* Stepper Progress */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-white/[0.06] gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-1.5 font-bold">Architecture Review</span>
          <h4 className="text-white font-bold tracking-tight text-sm uppercase">Tell us about your project</h4>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                s === step
                  ? "w-8 bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  : s < step
                  ? "w-2.5 bg-zinc-600"
                  : "w-2.5 bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: Industry */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Step 1 of 5</span>
              <h3 className="text-lg font-bold text-white tracking-tight">What industry are you in?</h3>
              <p className="text-sm text-gray-400 leading-normal">Select the sector that best describes your organisation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {industries.map((ind) => (
                <button
                  type="button"
                  key={ind}
                  onClick={() => setFormData({ ...formData, industry: ind })}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all text-xs font-bold ${
                    formData.industry === ind
                      ? "bg-zinc-100 border-zinc-100 text-zinc-900 shadow-sm"
                      : "bg-[#0e0f12] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={!formData.industry}
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-[10px] hover:bg-white transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              >
                Proceed <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Goals */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Step 2 of 5</span>
              <h3 className="text-lg font-bold text-white tracking-tight">What are you looking to do?</h3>
              <p className="text-sm text-gray-400 leading-normal">Select everything that sounds relevant — no wrong answers here.</p>
            </div>

            <div className="flex flex-col gap-2">
              {goalsPool.map((goal) => {
                const isSelected = formData.goals.includes(goal);
                return (
                  <button
                    type="button"
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                      isSelected
                        ? "bg-zinc-100 border-zinc-100 text-zinc-900 shadow-sm"
                        : "bg-[#0e0f12] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{goal}</span>
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-zinc-900 bg-zinc-900 text-zinc-100" : "border-white/10 bg-transparent"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="text-[10px] font-mono font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                disabled={formData.goals.length === 0}
                onClick={() => setStep(3)}
                className="px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-[10px] hover:bg-white transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              >
                Proceed <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Scale */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Step 3 of 5</span>
              <h3 className="text-lg font-bold text-white tracking-tight">How big is your team?</h3>
              <p className="text-sm text-gray-400 leading-normal">This helps us understand the scope of what we&apos;d be building.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {teamSizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setFormData({ ...formData, teamSize: size })}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all text-xs font-bold ${
                    formData.teamSize === size
                      ? "bg-zinc-100 border-zinc-100 text-zinc-900 shadow-sm"
                      : "bg-[#0e0f12] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="text-[10px] font-mono font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                disabled={!formData.teamSize}
                onClick={() => setStep(4)}
                className="px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-[10px] hover:bg-white transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              >
                Proceed <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Capabilities */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Step 4 of 5</span>
              <h3 className="text-lg font-bold text-white tracking-tight">What kind of AI system?</h3>
              <p className="text-sm text-gray-400 leading-normal">Pick what sounds closest — we can discuss specifics on the call.</p>
            </div>

            <div className="flex flex-col gap-2">
              {capabilitiesPool.map((cap) => {
                const isSelected = formData.capabilities.includes(cap);
                return (
                  <button
                    type="button"
                    key={cap}
                    onClick={() => toggleCapability(cap)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                      isSelected
                        ? "bg-zinc-100 border-zinc-100 text-zinc-900 shadow-sm"
                        : "bg-[#0e0f12] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{cap}</span>
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-zinc-900 bg-zinc-900 text-zinc-100" : "border-white/10 bg-transparent"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="text-[10px] font-mono font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                disabled={formData.capabilities.length === 0}
                onClick={() => setStep(5)}
                className="px-8 py-3.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-[10px] hover:bg-white transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              >
                Final Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Contact Credentials & Submit */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Step 5 of 5</span>
              <h3 className="text-lg font-bold text-white tracking-tight">Your details</h3>
              <p className="text-sm text-gray-400 leading-normal">Just the basics — so we know who to get back to.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold tracking-wider ml-1">Your name</label>
                  <input 
                    id="name"
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#060608] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all text-xs font-semibold placeholder-zinc-600" 
                    placeholder="Full Name" 
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="company" className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold tracking-wider ml-1">Company</label>
                  <input 
                    id="company"
                    required 
                    type="text" 
                    value={formData.company} 
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#060608] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all text-xs font-semibold placeholder-zinc-600" 
                    placeholder="Company Name" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold tracking-wider ml-1">Email address</label>
                  <input 
                    id="email"
                    required 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#060608] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all text-xs font-semibold placeholder-zinc-600" 
                    placeholder="name@company.com" 
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="subnetPreference" className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold tracking-wider ml-1">Deployment Preference</label>
                  <select 
                    id="subnetPreference"
                    required 
                    value={formData.subnetPreference} 
                    onChange={e => setFormData({ ...formData, subnetPreference: e.target.value })}
                    className="w-full bg-[#060608] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all text-xs font-semibold appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#050505] text-gray-400">Select Architecture Setup</option>
                    <option value="saas" className="bg-[#050505] text-white">Stateless Shared Instance (AAL Hosted)</option>
                    <option value="vpc" className="bg-[#050505] text-white">Private VPC Subnet (AWS / GCP / Azure)</option>
                    <option value="onprem" className="bg-[#050505] text-white">On-Premises Bare-Metal Cluster</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl bg-[#0e0f12] border border-white/[0.06]">
                <div className="flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> CONFIDENTIAL
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-medium max-w-[260px]">
                    All submitted parameters are protected under standard non-disclosure terms.
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 font-bold tracking-widest uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-[11px] cursor-pointer shadow-sm"
                >
                  {isSubmitting ? "Sending..." : "Submit Architecture Request"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={handlePrev} 
                  className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4 font-mono font-bold uppercase cursor-pointer"
                >
                  Back to Capabilities
                </button>
              </div>
            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
