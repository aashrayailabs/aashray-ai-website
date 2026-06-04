"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, Calendar, ArrowRight, Library, FileText, CheckCircle2 } from "lucide-react";
import { publications, Publication } from "@/lib/publications";

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Systems Architecture", "Security & Privacy", "Workflow Intelligence"];

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
      pub.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || pub.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#020202] text-gray-150">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-center opacity-[0.02] pointer-events-none" />
 
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6 font-semibold">
            <Library className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Research & Knowledge</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 font-display">
            Systems Architecture <br /> &amp; <span className="text-gray-500">Governance Blueprints</span>
          </h1>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed">
            Technical research publications, engineering design principles, and operational AI governance frameworks authored by Aashray AI Labs.
          </p>
        </div>
 
        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-6 border-b border-white/10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    : "bg-transparent text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
 
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-400" />
            </span>
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-all font-semibold shadow-sm"
            />
          </div>
        </div>
 
        {/* Publications Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPublications.map((pub, index) => {
                const isFirst = index === 0 && searchQuery === "" && selectedCategory === "All";
                return (
                  <motion.article
                    key={pub.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group flex flex-col justify-between p-8 rounded-3xl bg-[#050505] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 shadow-lg ${
                      isFirst ? "md:col-span-2 md:flex-row gap-8 items-stretch" : ""
                    }`}
                  >
                    <div className={`flex flex-col justify-between ${isFirst ? "md:w-3/5" : "w-full"}`}>
                      <div>
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[11px] font-mono text-zinc-400">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/5 text-cyan-400 font-bold uppercase tracking-wider border border-cyan-500/10">
                            {pub.category}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3" />
                            {pub.date}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            {pub.readTime}
                          </span>
                        </div>
 
                        {/* Title */}
                        <h2 className={`font-bold tracking-tight text-white mb-4 group-hover:text-cyan-400 transition-colors duration-500 ${
                          isFirst ? "text-2xl md:text-3xl" : "text-xl"
                        }`}>
                          <Link href={`/research/${pub.slug}`}>
                            {pub.title}
                          </Link>
                        </h2>
 
                        {/* Summary */}
                        <p className="text-sm text-zinc-400 leading-relaxed font-semibold mb-6 text-justify">
                          {pub.excerpt}
                        </p>
                      </div>
 
                      {/* Read Link */}
                      <div>
                        <Link 
                          href={`/research/${pub.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-1 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-all"
                        >
                          Access Publication
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
 
                    {isFirst && (
                      <div className="hidden md:flex md:w-2/5 flex-col justify-between p-6 rounded-2xl bg-[#080808] border border-white/5 relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full" />
                        
                        <div>
                          <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase mb-3 font-bold">Core Takeaways</p>
                          <ul className="space-y-3">
                            {pub.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-semibold leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-550 shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-4 border-t border-white/10 mt-4 text-[10px] text-zinc-500 font-mono">
                          Publication Reference: AAL-2026-OPS-01
                        </div>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-[#050505]"
            >
              <FileText className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No publications found</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto font-medium">
                No articles match your search parameters. Try choosing a different category or clearing the search.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-6 px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-md"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
