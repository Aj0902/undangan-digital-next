'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden text-center flex flex-col items-center justify-center">
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="max-w-2xl w-full relative z-10 flex flex-col items-center"
      >
        <div className="w-px h-32 bg-gradient-to-b from-stone-800 to-transparent mb-16" />
        
        <h2 className="font-heading text-6xl md:text-8xl text-[#E5E4E2] tracking-widest uppercase leading-none mb-4 opacity-50 mix-blend-overlay">
           Eternity
        </h2>
        
        <p className="font-mono text-[8px] uppercase tracking-[0.5em] text-stone-600 mb-24">
           The Unification Has Been Declared.
        </p>
        
        <div className="flex flex-col items-center gap-4 py-12 relative w-full">
           <div className="absolute top-0 w-1/2 h-px bg-stone-800" />
           <div className="absolute bottom-0 w-1/2 h-px bg-stone-800" />
           
           <h3 className="font-heading text-3xl md:text-4xl text-[#E5E4E2] tracking-tighter lowercase italic">
              {d.bride_name} <span className="font-light mx-4 text-stone-700">&amp;</span> {d.groom_name}
           </h3>
        </div>

        <div className="mt-32">
           <p className="font-mono text-[8px] uppercase tracking-[0.6em] text-stone-700">
              End of Document.
           </p>
        </div>
      </motion.div>
    </section>
  );
}
