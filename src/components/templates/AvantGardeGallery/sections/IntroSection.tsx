'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  if (!d.prologue_text) return null;

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center bg-stone-100 py-32 px-12 md:px-24">
      
      {/* Absolute Typographic Background Noise */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-5 overflow-hidden">
         <span className="font-heading text-[15rem] md:text-[25rem] text-stone-900 leading-none whitespace-nowrap">
            CURATOR'S NOTE
         </span>
      </div>

      <div className="max-w-3xl w-full relative z-10 flex flex-col md:flex-row gap-12 md:gap-24 items-start">
        
        {/* Curatorial Plaque */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 0.8 }}
           className="w-full md:w-1/3 flex flex-col border-t-2 border-stone-900 pt-6"
        >
           <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-400 mb-2">Exhibition Context</p>
           <h3 className="font-heading text-2xl text-stone-900 lowercase italic">The Prelude</h3>
           
           <div className="mt-8">
              <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: "2rem" }}
                 viewport={{ once: false, amount: 0.2 }}
                 transition={{ duration: 1 }}
                 className="h-1 bg-rose-600"
              />
           </div>
        </motion.div>
        
        {/* The Note */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.5, delay: 0.2 }}
           className="w-full md:w-2/3"
        >
          <div className="font-heading text-3xl md:text-5xl text-stone-900 leading-[1.2] text-balance font-light">
             {d.prologue_text}
          </div>
          
          <div className="mt-16 text-right">
             <span className="font-heading text-4xl text-rose-600 italic -rotate-6 inline-block opacity-80 mix-blend-multiply">
                Sincerely.
             </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
