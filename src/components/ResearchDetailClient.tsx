"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, CheckCircle2, ChevronDown, Check, Copy } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import { Publication } from "@/lib/publications";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function ResearchDetailClient({ publication }: { publication: Publication }) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate IDs and Table of Contents dynamically from rendered HTML headings
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll("h2, h3");
    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      // Create ID if not present
      const text = heading.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      
      heading.id = id;
      tocItems.push({
        id,
        text,
        level: heading.tagName === "H2" ? 2 : 3,
      });
    });

    setToc(tocItems);
    // Removed direct setActiveId here to avoid setState in effect
  }, [publication]);

  // Track scroll position to update active TOC item
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when heading is in the upper part of viewport
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToHeading = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-150 relative selection:bg-white/20 selection:text-white pb-32">
      <ReadingProgress />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-950/10 to-transparent pointer-events-none" />
 
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 pt-32 relative z-10">
        
        {/* Back navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/research" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-zinc-450 hover:text-white transition-colors duration-300">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to Research
          </Link>
        </motion.div>
 
        {/* Layout: Main Read Column + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Main Content (8 cols) */}
          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            {/* Header metadata */}
            <header className="mb-12 border-b border-white/10 pb-10">
              <div className="flex items-center gap-3 text-xs font-mono text-white font-semibold mb-4 uppercase tracking-wider">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/5 border border-cyan-500/10 text-cyan-400">
                  {publication.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span>Reference: AAL-2026-OPS</span>
              </div>
 
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                {publication.title}
              </h1>
 
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400 mt-6">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Published: {publication.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Reading time: {publication.readTime}</span>
                </div>
              </div>
            </header>
 
            {/* Key Takeaways Section */}
            <div className="mb-12 p-8 rounded-3xl bg-[#050505] border border-white/5 shadow-lg relative overflow-hidden">
              <h3 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest mb-4">Core Takeaways &amp; Executive Summary</h3>
              <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed">
                {publication.summary}
              </p>
              <ul className="space-y-3.5">
                {publication.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-zinc-450 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
 
            {/* Article Content Rendered */}
            <div 
              ref={contentRef}
              className="prose prose-invert max-w-none 
                prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/10
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-sm sm:prose-p:text-base prose-p:text-zinc-300 prose-p:leading-[1.8] prose-p:mb-8 prose-p:font-normal
                prose-blockquote:border-l-2 prose-blockquote:border-cyan-500 prose-blockquote:bg-[#080808] prose-blockquote:rounded-r-2xl prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:text-zinc-300 prose-blockquote:italic prose-blockquote:my-8
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-sm sm:prose-li:text-base prose-li:text-zinc-300 prose-li:font-normal
              "
              dangerouslySetInnerHTML={{ __html: publication.contentHtml }}
            />
 
            {/* FAQs Section */}
            {publication.faq && publication.faq.length > 0 && (
              <section className="mt-16 pt-12 border-t border-white/10">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {publication.faq.map((faqItem, i) => (
                    <div 
                      key={i} 
                      className="rounded-2xl border border-white/5 bg-[#050505] overflow-hidden transition-all duration-300 shadow-lg"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                      >
                        <span>{faqItem.question}</span>
                        <ChevronDown 
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                            openFaqIndex === i ? "rotate-180 text-cyan-400" : ""
                          }`} 
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaqIndex === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 border-t border-white/5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                              {faqItem.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </motion.article>
 
          {/* RIGHT: Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            
            {/* Table of Contents */}
            {toc.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-6 rounded-3xl bg-[#050505] border border-white/5 shadow-lg"
              >
                <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                  Document Schema
                </h4>
                <nav className="space-y-4">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToHeading(e, item.id)}
                      className={`block text-xs font-semibold leading-relaxed transition-all duration-300 ${
                        activeId === item.id 
                          ? "text-white border-l-2 border-cyan-500 pl-3 -ml-3 font-bold" 
                          : "text-zinc-500 hover:text-zinc-300"
                      } ${item.level === 3 ? "pl-4 text-[11px] font-medium" : ""}`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
 
            {/* Document Verification & Access */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 rounded-3xl bg-[#050505] border border-white/5 shadow-lg space-y-6"
            >
              <div>
                <p className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest mb-3">Author Profile</p>
                <p className="text-sm text-white font-bold">{publication.author}</p>
                <p className="text-[10px] text-zinc-500 font-medium font-mono mt-0.5">Aashray AI Labs Research</p>
              </div>
 
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest mb-3">Data Integrity</p>
                <div className="p-3 rounded-lg bg-[#080808] border border-white/5 font-mono text-[9px] text-zinc-400 break-all leading-relaxed">
                  <span className="text-zinc-500 block mb-1">SHA-256 HASH:</span>
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>
 
              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex gap-2">
                <button 
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 rounded-xl border border-white/5 bg-[#080808] text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  <span>{copied ? "Link Copied" : "Copy Reference"}</span>
                </button>
                
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`px-3 py-2.5 rounded-xl border transition-all flex items-center justify-center ${
                    bookmarked 
                      ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400" 
                      : "border-white/5 bg-[#080808] text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
                  aria-label="Bookmark article"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
 
          </div>
 
        </div>
 
      </div>
    </div>
  );
}
