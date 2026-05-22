/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { LinkIcon as LinkedinIcon, Mail, MessageCircle } from "lucide-react";

export default function Footer() {

  return (
    <footer className="bg-[#020202] pt-20 md:pt-24 pb-12 border-t border-white/[0.03] relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-8 mb-20 md:mb-24">
          
          {/* Brand & Description */}
          <div className="col-span-1 lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-8 group inline-flex">
              <div className="w-10 h-10 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-500 overflow-hidden shadow-lg shadow-black/50">
                <img src="/logo-mark-white.svg" alt="Aashray AI Labs Logo" className="w-6 h-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-white/95">
                Aashray AI Labs
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium mb-8">
              Global boutique AI infrastructure studio. We engineer deterministic AI systems and workflow intelligence for modern enterprises.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-6 tracking-wide">Core Services</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium tracking-tight">
              <li><Link href="/ai-agents" className="hover:text-white transition-colors">AI Agents</Link></li>
              <li><Link href="/workflow-systems" className="hover:text-white transition-colors">Workflow Automation</Link></li>
              <li><Link href="/ai-products" className="hover:text-white transition-colors">CRM Intelligence</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">WhatsApp AI Systems</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Intelligent Operations</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium tracking-tight">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Global Presence */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-6 tracking-wide">Global Presence</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium tracking-tight">
              <li>India</li>
              <li>United States</li>
              <li>Canada</li>
              <li>Australia</li>
              <li>UAE</li>
              <li>Singapore</li>
              <li>UK</li>
            </ul>
          </div>
        </div>

        {/* Bottom / Social / Legal */}
        <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-600 font-medium tracking-wide">
            © 2026 Aashray AI Labs. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="https://wa.me/8096712222" className="text-gray-600 hover:text-white transition-colors">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:contact@aashrayailabs.com" className="text-gray-600 hover:text-white transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Legal & Compliance Safety System */}
        <div className="mt-16 pt-8 border-t border-white/[0.03]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-[10px] leading-relaxed text-gray-600 font-medium tracking-wide">
            <div className="md:col-span-8 space-y-4">
              <p>
                Technology concepts and infrastructure representations displayed on this platform are illustrative operational examples intended for enterprise consulting and systems architecture discussions.
              </p>
              <p>
                Aashray AI Labs provides workflow automation, infrastructure consulting, and operational AI system design tailored to organizational requirements.
              </p>
              <p>
                Third-party platforms, integrations, APIs, and infrastructure references remain the property of their respective owners. No affiliation, endorsement, partnership, or certification is implied. Services are subject to applicable laws and regulations within relevant jurisdictions, including India and international operating regions.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col items-start md:items-end gap-2 text-[9px] uppercase tracking-widest text-gray-700">
              <span>LEGAL COMPLIANCE: INDIA / GLOBAL</span>
              <span>INFRASTRUCTURE POLICY: V.24</span>
              <span>SYSTEM ARCHITECTURE REVIEW: 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
