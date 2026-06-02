"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  // Delay render to avoid layout shift on first paint
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18 }}
            className="px-4 py-2.5 rounded-xl border border-white/8 shadow-xl"
            style={{
              background: "rgba(8,10,15,0.95)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-xs font-semibold text-white whitespace-nowrap">Chat with us</p>
            <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
              Usually replies within hours
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href="https://wa.me/918096712222"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #16a34a, #15803d)",
          boxShadow: "0 4px 20px rgba(22,163,74,0.25), 0 2px 8px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* WhatsApp icon — inline SVG for crispness */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M11.5 2C6.262 2 2 6.262 2 11.5c0 1.832.498 3.546 1.365 5.014L2 22l5.664-1.344A9.459 9.459 0 0011.5 21c5.238 0 9.5-4.262 9.5-9.5S16.738 2 11.5 2zm0 17.25a7.73 7.73 0 01-3.957-1.085l-.283-.168-2.943.698.741-2.87-.185-.295A7.705 7.705 0 013.75 11.5c0-4.273 3.477-7.75 7.75-7.75s7.75 3.477 7.75 7.75-3.477 7.75-7.75 7.75z" />
        </svg>
      </motion.a>
    </div>
  );
}
