'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-white overflow-hidden text-center flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-xl w-full"
      >
        <div className="w-12 h-px bg-stone-300 mx-auto mb-16" />
        
        <h2 className="font-heading text-4xl md:text-6xl text-stone-900 tracking-tighter uppercase mb-12 flex flex-col gap-4">
           <span>The End</span>
           <span className="italic serif text-stone-300 lowercase text-3xl font-light">is just a beginning</span>
        </h2>

        <p className="font-body text-sm text-stone-500 leading-relaxed uppercase tracking-tight mb-16 px-4">
           Lembaran ini hanyalah awal dari cerita kami. Dari lubuk hati terdalam, kami mengucapkan terima kasih atas segala doa yang mengiringi langkah kami.
        </p>

        <div className="flex flex-col items-center gap-2 mb-24">
           <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light">With Love,</span>
           <h3 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter uppercase">
              {d.bride_name} <span className="text-stone-300">&amp;</span> {d.groom_name}
           </h3>
        </div>

        {/* Colophon Credits Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-stone-100 w-full opacity-60">
           <div className="flex flex-col items-center">
              <span className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">Location</span>
              <span className="text-[10px] font-bold text-stone-900 uppercase">{d.akad_venue_name?.split(' ')[0] || 'Bandung'}</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">Issue</span>
              <span className="text-[10px] font-bold text-stone-900 uppercase">Spring &apos;26</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">Publisher</span>
              <span className="text-[10px] font-bold text-stone-900 uppercase">Eternity</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[8px] uppercase tracking-widest text-stone-400 mb-2">Year</span>
              <span className="text-[10px] font-bold text-stone-900 uppercase">MMXXVI</span>
           </div>
        </div>
      </motion.div>

      {/* Decorative vertical text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
         <span className="text-[8px] uppercase tracking-[0.5em] text-stone-200 vertical-text font-bold rotate-180">
            THANK YOU FOR BEING PART OF OUR STORY
         </span>
      </div>
    </section>
  );
}
