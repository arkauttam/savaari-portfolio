import React from "react";
import { motion } from "framer-motion";

export function Ring({ pct, color, size = 52 }: { pct: number; color: string; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle 
        cx={size / 2} cy={size / 2} r={r} fill="none" 
        className="stroke-border/30" strokeWidth={4} 
      />
      <motion.circle 
        cx={size / 2} cy={size / 2} r={r} fill="none" 
        stroke={color} strokeWidth={4} strokeLinecap="round" 
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }} 
      />
    </svg>
  );
}