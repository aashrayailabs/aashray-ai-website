/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "AI Agents", href: "/ai-agents" },
    { name: "Workflow Systems", href: "/workflow-systems" },
    { name: "Ecosystem", href: "/ai-products" },
    { name: "Industries", href: "/industries" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? "glass-nav py-4 border-white/5" : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-9 h-9 rounded-md bg-[#030303] border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-700 overflow-hidden shadow-lg shadow-black/80">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <img src="/logo-mark-white.svg" alt="Aashray AI Labs Logo" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity duration-700 relative z-10" />
          </div>
          <div className="flex flex-col justify-center pl-0.5">
            <span className="text-[16px] font-bold tracking-tight text-white/95 group-hover:text-white transition-colors duration-700">
              Aashray AI Labs
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-gray-500 font-medium mt-[1px] group-hover:text-gray-400 transition-colors duration-700">
              Enterprise AI Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <div className="pl-6 border-l border-white/10 flex items-center">
            <Link
              href="/contact"
              className="px-6 py-2.5 text-[13px] font-medium rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-500"
            >
              Consultation
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass-nav border-t border-white/5 overflow-hidden md:hidden"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-white/5">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3.5 text-center text-sm font-medium rounded-xl bg-white text-black hover:bg-gray-100 transition-colors"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
