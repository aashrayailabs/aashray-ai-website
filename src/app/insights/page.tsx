"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { insightsData } from "@/lib/insights-data";

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI Infrastructure", "Workflow Intelligence", "Case Studies"];

  const filteredInsights = activeCategory === "All" 
    ? insightsData 
    : insightsData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020202] pt-32 md:pt-40 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-[#020202] to-[#020202] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-[1.1]"
          >
            Aashray AI Labs <span className="text-gray-400">Insights</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed font-medium"
          >
            Technical briefings, architectural decisions, and operational case studies from the Aashray AI Labs engineering team.
          </motion.p>
        </div>

        {/* Filter System */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap gap-2 md:gap-3 mb-12 md:mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-500 border ${
                activeCategory === category 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredInsights.map((insight, _index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                key={insight.id}
              >
                <Link href={`/insights/${insight.slug}`} className="group block h-full">
                  <div className="h-full bg-[#050505] border border-white/[0.05] rounded-[2rem] p-8 md:p-10 hover:border-white/20 hover:bg-[#0a0a0a] transition-all duration-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors duration-500">
                          {insight.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-gray-200 transition-colors duration-500">
                        {insight.title}
                      </h2>
                      <p className="text-base text-gray-400 leading-relaxed font-medium mb-8">
                        {insight.summary}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {insight.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {insight.readTime}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
