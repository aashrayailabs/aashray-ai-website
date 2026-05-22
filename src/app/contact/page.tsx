"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  bottleneck: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          message: data.bottleneck // Map bottleneck to message for the backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setIsSuccess(true);
      reset();
    } catch (_err) {
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 bg-[#020202]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020202] to-[#020202] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center lg:pr-12"
        >
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest text-gray-400 mb-6">
            AASHRAY AI LABS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter leading-[1.05]">
            Technical Architecture <span className="text-gray-500">Review</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 mb-12 leading-relaxed font-medium max-w-lg">
            Schedule a confidential consultation with our engineering team. We will audit your current operational bottlenecks and design a deterministic, globally scalable infrastructure architecture.
          </p>

          <div className="space-y-6 md:space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">48-Hour SLA</h3>
                  <p className="text-sm text-gray-500 font-medium">Our architecture team reviews all submissions and responds with a preliminary assessment within 48 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Strict Confidentiality</h3>
                  <p className="text-sm text-gray-500 font-medium">All submitted operational data and bottleneck descriptions are treated under implicit NDA.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Direct Engineering Access</h3>
                  <p className="text-sm text-gray-500 font-medium">You will bypass generic sales workflows and speak directly with infrastructure architects.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-white/[0.03] flex flex-col sm:flex-row gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Direct Inquiry</p>
                <a href="mailto:contact@aashrayailabs.com" className="flex items-center text-white hover:text-gray-300 transition-colors font-medium">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" /> contact@aashrayailabs.com
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">WhatsApp Channel</p>
                <a href="https://wa.me/8096712222" className="flex items-center text-white hover:text-gray-300 transition-colors font-medium">
                  <MessageCircle className="w-4 h-4 mr-2 text-gray-500" /> +91 8096712222
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Workflow Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="p-8 md:p-10 rounded-3xl bg-[#050505] border border-white/5 shadow-2xl">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Review Requested</h3>
                  <p className="text-gray-400 font-medium">
                    Your infrastructure review request has been logged. Our engineering team will reach out within 48 hours to schedule the consultation.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-sm text-gray-500 hover:text-white font-semibold transition-colors"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Full Name</label>
                      <input 
                        {...register("name", { required: true })}
                        className="w-full bg-[#050505] border border-white/[0.05] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 focus:bg-[#0a0a0a] transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-red-500">Required</span>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Corporate Email</label>
                      <input 
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full bg-[#050505] border border-white/[0.05] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 focus:bg-[#0a0a0a] transition-all"
                        placeholder="john@company.com"
                      />
                      {errors.email && <span className="text-xs text-red-500">Valid email required</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Company / Organization</label>
                    <input 
                      {...register("company", { required: true })}
                      className="w-full bg-[#050505] border border-white/[0.05] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 focus:bg-[#0a0a0a] transition-all"
                      placeholder="Acme Corp"
                    />
                    {errors.company && <span className="text-xs text-red-500">Required</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">Current Operational Bottleneck</label>
                    <p className="text-xs text-gray-500 mb-2">Briefly describe the workflow or system you are looking to automate.</p>
                    <textarea 
                      {...register("bottleneck", { required: true })}
                      rows={5}
                      className="w-full bg-[#050505] border border-white/[0.05] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/30 focus:bg-[#0a0a0a] transition-all resize-none"
                      placeholder="We are currently spending 20 hours a week manually extracting data from PDF invoices..."
                    />
                    {errors.bottleneck && <span className="text-xs text-red-500">Required</span>}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></span>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Request Architecture Review
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-600 font-medium mt-4">
                    By requesting a review, you agree to our standard non-disclosure policy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
