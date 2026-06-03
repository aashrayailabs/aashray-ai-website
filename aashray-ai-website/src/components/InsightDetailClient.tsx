"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Link2, MessageSquare } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import ReactMarkdown from "react-markdown";
import { Insight } from "@/lib/insights-data";

export default function InsightDetailClient({ article: initialArticle }: { article: Insight }) {
  const [article, setArticle] = useState<Insight>(initialArticle);

  useEffect(() => {
    const saved = localStorage.getItem("aal_insights");
    if (saved) {
      try {
        const insightsList = JSON.parse(saved) as Insight[];
        const found = insightsList.find((i: Insight) => i.slug === initialArticle.slug);
        if (found) {
          setArticle(found);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [initialArticle.slug]);
  return (
    <div className="min-h-screen bg-[#020202] relative selection:bg-white/20 selection:text-white">
      <ReadingProgress />
      
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none h-[50vh]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-32 relative z-10">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <Link href="/insights" className="inline-flex items-center text-gray-500 hover:text-white font-medium transition-colors duration-300 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Main Reading Column */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex-1 max-w-3xl"
          >
            {/* Article Header */}
            <header className="mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border border-white/10 px-4 py-1.5 rounded-full">
                {article.category}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-10">
                {article.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-medium">
                {article.summary}
              </p>
            </header>

            {/* Article Content - Styled for maximum readability */}
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-headings:mt-12 prose-headings:mb-6
              prose-h2:text-3xl prose-h3:text-2xl
              prose-p:leading-[1.8] prose-p:text-gray-300 prose-p:mb-10
              prose-a:text-white prose-a:underline-offset-4 prose-a:decoration-white/30 hover:prose-a:decoration-white transition-all
              prose-li:text-gray-300 prose-li:leading-[1.8]
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:pl-6 prose-blockquote:text-gray-400 prose-blockquote:font-medium prose-blockquote:italic
            ">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </motion.article>

          {/* Sticky Sidebar */}
          <motion.aside 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block w-72 shrink-0"
          >
            <div className="sticky top-32 space-y-12">
              
              {/* Metadata */}
              <div className="p-6 rounded-2xl bg-[#050505] border border-white/5 shadow-2xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-white/5 pb-4">Briefing Details</h4>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Author</p>
                    <p className="text-sm text-white font-semibold">{article.author}</p>
                    <p className="text-xs text-gray-400">{article.authorRole}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Published</p>
                    <p className="flex items-center text-sm text-white font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" /> {article.date}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Reading Time</p>
                    <p className="flex items-center text-sm text-white font-medium">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" /> {article.readTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 px-2">Share Insight</h4>
                <div className="flex items-center gap-3">
                  <button className="p-3 rounded-full bg-[#050505] border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-3 rounded-full bg-[#050505] border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300">
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button className="p-3 rounded-full bg-[#050505] border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </motion.aside>
        </div>

      </div>
    </div>
  );
}
