"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const RevealText = ({ children, delay = 0, className = "", el = "p" }: { children: React.ReactNode, delay?: number, className?: string, el?: string }) => {
  const Component = (motion as any)[el];
  return (
    <div className="overflow-hidden py-2 -my-2 relative z-20"> 
      <Component
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
        viewport={{ once: false, amount: 0.1 }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
};

export const MotionDiv = ({ children, delay = 0, y = 50, x = 0, scale = 1, className = "" }: { children: React.ReactNode, delay?: number, y?: number, x?: number, scale?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y, x, scale }}
    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    viewport={{ once: false, amount: 0.1 }}
    className={`relative z-20 ${className}`}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, delay = 0, y = 40, x = 0, scale = 1, className = "" }: { children: React.ReactNode, delay?: number, y?: number, x?: number, scale?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y, x, scale }}
    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut", delay }}
    viewport={{ once: false, amount: 0.1 }}
    className={`relative z-20 ${className}`}
  >
    {children}
  </motion.div>
);
