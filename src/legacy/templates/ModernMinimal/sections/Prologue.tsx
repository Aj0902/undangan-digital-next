'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ClientDetails } from '@/types/client';

interface PrologueProps {
  details: ClientDetails;
}

export default function Prologue({ details }: PrologueProps) {
  if (!details.prologue_text) return null;

  return (
    <section className="relative bg-white py-32 md:py-48 border-b border-slate-200">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
           className="border-l-4 border-slate-900 pl-8 md:pl-16 relative"
        >
          {/* Giant Quote Mark Overlaying */}
          <div className="absolute -top-16 md:-top-24 -left-6 md:-left-12 font-sans font-black text-[120px] md:text-[200px] text-slate-100 leading-none select-none z-0">
            "
          </div>

          <div className="relative z-10">
            <h2 className="font-sans text-3xl md:text-5xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.1] text-balance">
              {details.prologue_text}
            </h2>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-12 h-px bg-slate-400" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Prolog & Doa Restu
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
