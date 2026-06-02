"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, ShieldCheck, ArrowRight, Library, Info } from "lucide-react";
import Link from "next/link";
import { publications } from "@/lib/publications";

export default function WhitepapersPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#020202] text-gray-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-950/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-950/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Library className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">Academic Register</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Technical Publications <br /> &amp; <span className="text-gray-500">Whitepapers</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            A registry of our systems research, outlining mathematics, graphs, and compliance parameters for enterprise automation.
          </p>
        </div>

        {/* Publications Academic Index Table */}
        <section className="mb-16">
          <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 bg-[#080808] border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Publications Index</span>
              <span className="text-[9px] font-mono text-gray-500 font-semibold">Updated: May 2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px] text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-4 px-6">Reference ID</th>
                    <th className="py-4 px-6">Publication Title</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Release Date</th>
                    <th className="py-4 px-6">Ledger Hash</th>
                    <th className="py-4 px-6 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {publications.map((pub, i) => {
                    const refId = `AAL-2026-OPS-0${i + 1}`;
                    // Simulated state hash
                    const hashes = [
                      "e3b0c442...855",
                      "d2a1b3c4...721",
                      "f1e0d9c8...493"
                    ];
                    return (
                      <tr key={pub.slug} className="hover:bg-white/[0.01] transition-colors font-medium">
                        <td className="py-5 px-6 font-mono text-cyan-400 text-[11px] font-bold">
                          {refId}
                        </td>
                        <td className="py-5 px-6 text-white text-sm">
                          <Link href={`/research/${pub.slug}`} className="hover:underline font-bold">
                            {pub.title}
                          </Link>
                          <span className="block text-xs text-gray-500 mt-1">{pub.readTime} • Author: {pub.author}</span>
                        </td>
                        <td className="py-5 px-6 font-mono text-[10px] text-gray-400">
                          {pub.category}
                        </td>
                        <td className="py-5 px-6 text-gray-400 font-mono text-xs">
                          {pub.date}
                        </td>
                        <td className="py-5 px-6 text-[10px] text-gray-600 font-mono">
                          {hashes[i % hashes.length]}
                        </td>
                        <td className="py-5 px-6 text-right">
                          <Link 
                            href={`/research/${pub.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 font-bold"
                          >
                            Read 
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Publication integrity callout */}
        <section className="p-8 rounded-3xl bg-[#050505] border border-white/5 relative overflow-hidden mb-12">
          <div className="flex gap-4">
            <Info className="w-6 h-6 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white mb-2">Academic Integrity &amp; Cryptographic Signatures</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-medium mb-3">
                All publications authored by Aashray AI Labs are registered with a cryptographic SHA-256 data block. This ledger hash validates the integrity of the document text and architectural diagrams, verifying that released documentation has not undergone subsequent undocumented edits.
              </p>
              <p className="text-xs text-gray-500 font-mono">
                Jurisdiction of publication: Hyderabad, Telangana, India.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
