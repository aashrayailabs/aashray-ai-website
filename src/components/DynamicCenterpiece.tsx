"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function DynamicCenterpiece({ activeIndustry }: { activeIndustry: string | null }) {
  const current = activeIndustry || "global";

  // Different topology path arrays based on industry
  const topologies: Record<string, { paths: string[], nodes: { cx: string, cy: string, r: string }[], label: string }> = {
    global: {
      label: "GLOBAL ORCHESTRATION",
      paths: [
        "M 20 50 Q 50 10 80 50",
        "M 15 60 Q 40 80 85 40",
        "M 10 30 Q 60 40 90 70"
      ],
      nodes: [
        { cx: "20%", cy: "50%", r: "2" },
        { cx: "80%", cy: "50%", r: "2" },
        { cx: "40%", cy: "80%", r: "3" },
        { cx: "60%", cy: "40%", r: "2" },
      ]
    },
    financial: {
      label: "FINANCIAL SERVICES SYSTEMS",
      paths: [
        "M 10 90 Q 30 70 50 50 T 90 10",
        "M 10 10 Q 30 30 50 50 T 90 90"
      ],
      nodes: [
        { cx: "50%", cy: "50%", r: "4" },
        { cx: "30%", cy: "70%", r: "2" },
        { cx: "70%", cy: "30%", r: "2" },
      ]
    },
    insurance: {
      label: "INSURANCE CLAIMS PIPELINE",
      paths: [
        "M 10 50 C 30 20, 40 80, 60 50 S 80 20, 90 50",
        "M 15 30 L 85 70"
      ],
      nodes: [
        { cx: "30%", cy: "38%", r: "3" },
        { cx: "60%", cy: "50%", r: "2" },
        { cx: "80%", cy: "38%", r: "2" },
      ]
    },
    healthcare: {
      label: "HEALTHCARE PATIENT ROUTING",
      paths: [
        "M 10 50 L 30 50 L 35 30 L 45 70 L 50 50 L 90 50",
        "M 20 60 Q 50 60 80 60"
      ],
      nodes: [
        { cx: "35%", cy: "30%", r: "2" },
        { cx: "45%", cy: "70%", r: "2" },
      ]
    },
    realestate: {
      label: "REAL ESTATE LEAD ROUTING",
      paths: [
        "M 10 20 L 50 50 L 90 20",
        "M 10 80 L 50 50 L 90 80",
        "M 50 20 L 50 80"
      ],
      nodes: [
        { cx: "50%", cy: "50%", r: "4" },
        { cx: "50%", cy: "20%", r: "2" },
        { cx: "50%", cy: "80%", r: "2" },
      ]
    },
    enterprise: {
      label: "ENTERPRISE OPERATIONS SYNC",
      paths: [
        "M 10 20 L 30 20 L 30 80 L 50 80 L 50 20 L 70 20 L 70 80 L 90 80"
      ],
      nodes: [
        { cx: "30%", cy: "20%", r: "2" },
        { cx: "30%", cy: "80%", r: "2" },
        { cx: "50%", cy: "80%", r: "2" },
        { cx: "50%", cy: "20%", r: "2" },
      ]
    },
    ecommerce: {
      label: "ECOMMERCE INTENT GATEWAY",
      paths: [
        "M 20 50 L 80 50",
        "M 50 20 L 50 80",
        "M 30 30 L 70 70",
        "M 30 70 L 70 30"
      ],
      nodes: [
        { cx: "50%", cy: "50%", r: "3" },
        { cx: "20%", cy: "50%", r: "2" },
        { cx: "80%", cy: "50%", r: "2" },
        { cx: "50%", cy: "20%", r: "2" },
        { cx: "50%", cy: "80%", r: "2" },
      ]
    },
    services: {
      label: "SERVICE WORKSPACE SYSTEM",
      paths: [
        "M 50 50 L 20 20",
        "M 50 50 L 80 20",
        "M 50 50 L 20 80",
        "M 50 50 L 80 80"
      ],
      nodes: [
        { cx: "50%", cy: "50%", r: "4" },
        { cx: "20%", cy: "20%", r: "2" },
        { cx: "80%", cy: "20%", r: "2" },
        { cx: "20%", cy: "80%", r: "2" },
        { cx: "80%", cy: "80%", r: "2" },
      ]
    },
    operational: {
      label: "OPERATIONAL TEAM TELEMETRY",
      paths: [
        "M 10 50 Q 30 20 50 50 T 90 50"
      ],
      nodes: [
        { cx: "30%", cy: "35%", r: "2" },
        { cx: "70%", cy: "65%", r: "2" },
        { cx: "50%", cy: "50%", r: "3" },
      ]
    }
  };

  const data = topologies[current] || topologies.global;

  return (
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px] bg-[#020202] rounded-3xl border border-white/[0.03] overflow-hidden flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.02)]">
      {/* Cinematic Ambient Glow & Deep Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#020202]/80 to-[#020202] pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,1)] pointer-events-none" />
      
      {/* Low opacity topology grid with ambient pulse */}
      <motion.div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center mix-blend-screen pointer-events-none"
        initial={{ opacity: 0.02 }}
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating telemetry particles (Inertia-like movement) - Disabled on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.25] hidden md:block">
         {[...Array(20)].map((_, i) => {
            const xVal = ((i * 29) % 100);
            const yVal = ((i * 53) % 100);
            const animateY1 = ((i * 71) % 100);
            const animateY2 = ((i * 13) % 100);
            const durationVal = 8 + ((i * 3) % 8);
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full blur-[1px]"
                initial={{ x: `${xVal}%`, y: `${yVal}%`, opacity: 0 }}
                animate={{ 
                  y: [`${animateY1}%`, `${animateY2}%`],
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ duration: durationVal, repeat: Infinity, ease: "easeInOut" }}
              />
            );
         })}
      </div>

      {/* State Morphing Topology */}
      <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.g
            key={current}
            initial={{ opacity: 0, filter: "blur(4px)", scale: 0.97 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)", scale: 1.03 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.paths.map((path, i) => (
              <g key={`path-${i}`}>
                <path 
                  d={path}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  transform="scale(10, 6)"
                />
                <motion.path 
                  d={path}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  transform="scale(10, 6)"
                  initial={{ strokeDasharray: "0, 1000", opacity: 0 }}
                  animate={{ strokeDasharray: ["0, 1000", "1000, 0"], opacity: [0, 0.85, 0] }}
                  transition={{ duration: 4 + ((i * 13) % 3), repeat: Infinity, ease: [0.25, 0.1, 0.25, 1], delay: ((i * 7) % 2) }}
                />
              </g>
            ))}
            {data.nodes.map((node, i) => (
              <g key={`node-${i}`}>
                <circle cx={node.cx} cy={node.cy} r={node.r} fill="#06b6d4" opacity="0.25" />
                <circle cx={node.cx} cy={node.cy} r="1.5" fill="#fff" opacity="0.6" />
              </g>
            ))}
          </motion.g>
        </AnimatePresence>
      </svg>

      {/* Glassmorphism Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent pointer-events-none" />

      {/* Left Top Label */}
      <div className="absolute top-8 left-8 z-10">
         <AnimatePresence mode="wait">
           <motion.div
             key={current}
             initial={{ opacity: 0, x: -10, filter: "blur(2px)" }}
             animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
             exit={{ opacity: 0, x: 10, filter: "blur(2px)" }}
             transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
             className="flex items-center gap-2"
           >
             <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/80 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
             <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">{data.label}</span>
           </motion.div>
         </AnimatePresence>
      </div>

      {/* Right Bottom Label */}
      <div className="absolute bottom-8 right-8 text-right hidden md:block z-10">
         <div className="text-[9px] text-gray-500/80 font-mono tracking-widest uppercase mb-1">SYSTEM STATUS</div>
         <div className="text-[11px] font-bold text-white/80 font-mono">NOMINAL - ROUTING ACTIVE</div>
      </div>
    </div>
  );
}
