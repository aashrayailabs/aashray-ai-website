import { ArrowRight, Workflow } from "lucide-react";
import Link from "next/link";

export default function WorkflowSystems() {
  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 container mx-auto">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <Workflow className="w-12 h-12 text-white/80 mx-auto mb-8" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-8 tracking-tighter leading-[1.1] text-white">
          Workflow <br className="hidden md:block" /> <span className="text-white">Systems</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-medium">
          Connect siloed applications into a unified, intelligent pipeline. Our workflow systems automatically process data, route approvals, and eliminate manual data entry.
        </p>
      </div>
      
      <div className="flex justify-center mt-12">
        <Link href="/contact" className="group px-8 md:px-10 py-4 md:py-5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-500 flex items-center shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          Automate Workflows <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
}
