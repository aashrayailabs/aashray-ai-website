"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function GlobalScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-blue-500 z-[100] origin-left shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      style={{ scaleX }}
    />
  );
}
