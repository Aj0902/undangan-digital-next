// ✂️ ========================================================
// 📂 FILE TUJUAN: components/VFX.tsx
// ⚠️ KETERANGAN: Client Component (Framer Motion)
// ========================================================
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export const GoldenDust = () => {
  const [dots] = useState(() =>
    [...Array(25)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 5,
    })),
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            backgroundColor: "#F3E5AB",
            boxShadow: `0 0 12px #D4AF37`,
          }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -50, 0], x: [0, 20, 0] }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
