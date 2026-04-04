'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  if (!d.prologue_text) return null;

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-stone-50 py-32 px-12 md:px-24">
      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-16"
        >
          Letter from the Publisher
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 2 }}
           className="relative"
        >
          <h2 className="font-heading text-3xl md:text-5xl text-stone-900 italic font-light leading-relaxed mb-12 text-balance leading-tight">
            &ldquo;{d.prologue_text}&rdquo;
          </h2>
          
          <div className="flex flex-col items-center gap-6 mt-16">
            <div className="w-12 h-px bg-stone-300" />
            <span className="text-[10px] tracking-[0.3em] text-stone-500 uppercase font-bold italic">
               With Love
            </span>
            <div className="w-12 h-px bg-stone-300" />
          </div>
        </motion.div>
      </div>

      {/* Editorial Decorative Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20rem] text-stone-200/40 select-none pointer-events-none z-0 mix-blend-multiply opacity-20">
         01
      </div>
    </section>
  );
}
