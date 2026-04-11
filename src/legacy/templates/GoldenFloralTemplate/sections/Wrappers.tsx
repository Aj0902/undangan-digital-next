
// ✂️ ========================================================
// 📂 FILE TUJUAN: components/Wrappers.tsx
// ⚠️ KETERANGAN: Client Component (Framer Motion)
// ========================================================
"use client";
import { motion } from 'framer-motion';
import React from 'react';

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  el?: React.ElementType;
}

export const RevealText: React.FC<RevealTextProps> = ({ 
  children, 
  delay = 0, 
  className = "", 
  el: Tag = "div" 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    viewport={{ once: false, margin: "-10%" }}
    className={`w-full flex justify-center relative z-20 py-1 ${className}`}
  >
    <Tag className={className}>{children}</Tag>
  </motion.div>
);

interface LuxuryCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({ 
  children, 
  delay = 0, 
  className = "" 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ boxShadow: `0 15px 40px rgba(212, 175, 55, 0.15)`, y: -5 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    viewport={{ once: false, margin: "-10%" }}
    className={`bg-white/80 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group transition-all duration-500 relative flex flex-col items-center text-center ${className}`}
  >
    <div className="relative z-10 w-full flex flex-col items-center">{children}</div>
  </motion.div>
);


