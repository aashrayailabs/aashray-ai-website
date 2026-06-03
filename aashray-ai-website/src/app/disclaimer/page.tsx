import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Disclaimer | Aashray AI Labs",
  description: "Read the legal disclaimer and operational limitations notice for Aashray AI Labs enterprise platforms, systems architecture consulting, and AI systems.",
  alternates: {
    canonical: "https://aashrayailabs.com/disclaimer",
  },
};

export default function Disclaimer() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden bg-[#020202]">
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[350px] bg-cyan-950/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="border-b border-white/5 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase font-semibold">
              Liability Safeguards
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
            Legal Disclaimer
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Notice of Scope, Limitations, & Technical Boundaries
          </p>
        </div>

        {/* Core Notice Card */}
        <div className="card-graphite p-6 sm:p-8 rounded-2xl mb-10 border border-cyan-500/10">
          <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3">Informational Purpose Notice</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            This platform contains operational representations, system schematics, conceptual models, and technical descriptions of AI infrastructure engineered by Aashray AI Labs. All materials are presented for informational, educational, and enterprise evaluation purposes only. They do not constitute binding engineering specifications or contractual warranties.
          </p>
        </div>

        {/* Disclaimer Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="card-graphite p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">01</span>
              No Guarantee of Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Aashray AI Labs does not guarantee specific business outcomes, cost-benefit targets, operational efficiency margins, revenue increases, or regulatory compliance scores. The successful deployment of automated pipelines and AI state engines depends on client infrastructure readiness, data purity, model updates, system tuning, and corporate process structures. Any case studies or benchmark estimations are illustrative and do not constitute projections of future results.
            </p>
          </div>

          {/* Section 2 */}
          <div className="card-graphite p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">02</span>
              No Financial, Legal, or Regulatory Advice
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              We design governed AI architectures, but we do not provide corporate legal counsel, financial auditing, tax strategies, or statutory compliance advice. Enterprise clients remain solely responsible for consulting with qualified legal advisors and risk officers to verify that their automated workflows, data routing configurations, and prompt logs conform to local jurisdiction regulations (such as SEBI/RBI guidelines, GDPR, HIPAA, or local labor laws).
            </p>
          </div>

          {/* Section 3 */}
          <div className="card-graphite p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">03</span>
              AI Inherent Limitations & Hallucinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Our infrastructure employs Large Language Models (LLMs) and neural networks. Clients acknowledge that generative AI systems are subject to inherent probabilistic limitations, including hallucinations, unexpected formatting errors, bias, and context window truncation. While we implement content guardrails and human override queues, the client is responsible for reviewing and verifying AI outputs before committing high-stakes automated decisions.
            </p>
          </div>

          {/* Section 4 */}
          <div className="card-graphite p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">04</span>
              Third-Party Dependencies & API Gateway Risks
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Our state-machine orchestrators rely on third-party application programming interfaces (APIs), hosted model gateways, cloud infrastructure services (AWS, GCP), and messaging brokers (such as WhatsApp/Meta Business APIs). Aashray AI Labs is not liable for operational downtime, data packet loss, routing errors, latency spikes, or API access revocations caused by third-party services or external gateway updates.
            </p>
          </div>

          {/* Section 5 */}
          <div className="card-graphite p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">05</span>
              Consultation & Advisory Limitation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Engineering advice, sandbox code fragments, and workflow schematics provided during design review sessions or procurement discussions are advisory in nature. Aashray AI Labs is not responsible for errors, bugs, security vulnerabilities, or configuration oversights introduced by the client's internal engineering team when implementing these recommendations in live deployment environments.
            </p>
          </div>

          {/* Section 6 */}
          <div className="card-graphite p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-500 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">06</span>
              No Partnership Implication
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Mention of corporate systems, software integrations, model providers (such as OpenAI or Anthropic), or developer platforms does not imply affiliation, endorsement, sponsorship, joint venture, or formal partnership with Aashray AI Labs. All registered trademarks and API names remain the property of their respective corporate owners.
            </p>
          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.01] border border-white/[0.03] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Legal Operations</h4>
              <p className="text-[10px] text-slate-500 font-mono font-medium">legal@aashrayailabs.com</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center px-6 py-3 rounded-md bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-all duration-300"
          >
            Submit Legal Request
            <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
