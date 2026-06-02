"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className = "", strength = 20 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = ((clientX - left) / width - 0.5) * strength;
    const y = ((clientY - top) / height - 0.5) * strength;
    
    setPosition({ x, y });
    controls.start({ x, y, transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
