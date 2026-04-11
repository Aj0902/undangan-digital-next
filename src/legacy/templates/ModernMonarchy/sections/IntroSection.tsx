'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  if (!d.prologue_text) return null;

  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center bg-[#0A0A0A] py-32 px-12 md:px-24 border-b border-[#E5E4E2]/10">
      
      <div className="max-w-3xl w-full text-center relative z-10 flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="relative"
        >
           <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-8 font-bold">The Royal Address</p>
           
           <div className="font-heading text-3xl md:text-4xl text-[#E5E4E2] leading-relaxed text-balance font-light">
              {d.prologue_text}
           </div>
           
           <div className="mt-16 w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center mx-auto">
              <div className="w-1 h-1 rounded-full bg-[#E5E4E2]/30" />
           </div>
        </motion.div>
      </div>

    </section>
  );
}
