import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function Resources() {
  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <FileText className="w-16 h-16 text-white mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Technical <span className="text-gradient">Resources</span></h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Access our library of technical documentation, architectural whitepapers, and implementation guides for deploying AI infrastructure.
        </p>
      </div>
      
      <div className="flex justify-center mt-12">
        <Link href="/contact" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 flex items-center">
          Contact Engineering <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
