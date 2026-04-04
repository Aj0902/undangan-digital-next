'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  if (!d.prologue_text) return null;

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#FDFBF7] py-32 px-12 md:px-24 border-b border-[#D4A373]/10">
      
      {/* Editorial Decorative Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[20rem] text-[#D4A373]/5 select-none pointer-events-none z-0 rotate-12">
         B
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-16 italic"
        >
          Special Letter From Us
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 2 }}
           className="relative"
        >
          <div className="font-heading text-4xl md:text-6xl text-stone-900 leading-[1.3] mb-12 text-balance font-light relative">
             <span className="text-[#D4A373] text-7xl md:text-9xl float-left mr-4 leading-[0.8] mt-2 italic font-heading">
                &ldquo;
             </span>
             {d.prologue_text}
             <span className="text-[#D4A373] text-7xl md:text-9xl ml-2 leading-[0.8] italic font-heading">
                &rdquo;
             </span>
          </div>
          
          <div className="flex flex-col items-center gap-6 mt-20">
            <div className="w-16 h-px bg-[#D4A373]/30" />
            <span className="font-heading text-3xl text-[#D4A373] italic lowercase tracking-tight">
               with sincere love
            </span>
            <div className="w-16 h-px bg-[#D4A373]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
