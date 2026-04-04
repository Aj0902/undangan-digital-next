'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full min-h-screen bg-stone-900 overflow-hidden text-center flex flex-col items-center justify-center pt-20">
      
      {/* Massive Abstract Background Blur */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.5 }}
         whileInView={{ opacity: 0.2, scale: 1 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 2, ease: "easeOut" }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full bg-rose-600 blur-[150px] mix-blend-screen pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-2xl w-full relative z-10 flex flex-col items-center"
      >
        <div className="w-px h-24 bg-stone-500 mb-12 opacity-50" />
        
        <h2 className="font-heading text-6xl md:text-8xl text-stone-50 tracking-tighter lowercase leading-none mb-12">
           La Fin.
        </h2>
        
        <p className="font-body text-sm text-stone-400 leading-relaxed max-w-sm mx-auto mb-16 italic font-light mix-blend-plus-lighter">
           Kehadiran dan doa restu Anda adalah mahakarya terbesar bagi perjalanan hidup kami yang baru saja dimulai.
        </p>

        <div className="flex flex-col items-center gap-6 py-12 relative w-full">
           <div className="absolute top-0 w-full h-px bg-stone-800" />
           <div className="absolute top-0 w-1/3 h-px bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,1)]" />
           
           <span className="text-[8px] tracking-[0.5em] text-stone-500 uppercase font-mono font-bold mt-8">The Artists</span>
           
           {/* Signatures style */}
           <div className="flex items-end gap-4 mt-4">
              <h3 className="font-heading text-5xl md:text-7xl text-stone-50 tracking-tighter lowercase italic opacity-90">
                 {d.bride_name}
              </h3>
              <span className="text-rose-600 text-3xl italic mx-2 leading-[0] translate-y-[-10px]">&amp;</span>
              <h3 className="font-heading text-5xl md:text-7xl text-stone-50 tracking-tighter lowercase italic opacity-90">
                 {d.groom_name}
              </h3>
           </div>
        </div>

        <div className="mt-24 pb-12">
           <div className="inline-block border border-stone-800 px-8 py-4 bg-stone-900/50 backdrop-blur-sm">
              <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-500 font-bold mix-blend-screen">
                 Avant-Garde Exhibition MMXXVI
              </p>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
