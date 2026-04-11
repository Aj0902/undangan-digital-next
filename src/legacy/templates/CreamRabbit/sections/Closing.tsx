'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full py-40 px-8 md:px-16 bg-white overflow-hidden text-center flex flex-col items-center justify-center -mt-16 z-30 rounded-t-[60px] md:rounded-t-[80px]">
      
      {/* Playful Bouncy Floating Elements */}
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-20 left-10 md:left-24 text-6xl opacity-30">✨</motion.div>
      <motion.div animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-40 right-10 md:right-24 text-6xl opacity-30">🍰</motion.div>
      
      {/* Decorative Cloud Shape Divider */}
      <div className="absolute top-0 inset-x-0 h-10 bg-[#FFB5A7]/10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="inline-block bg-[#FFF5F5] px-6 py-2 rounded-full border-2 border-[#FFE5D9] shadow-sm mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#F28482]">See You Soon!</span>
        </div>

        <h2 className="font-heading text-6xl md:text-8xl text-[#4A4E69] tracking-tighter lowercase leading-none mb-12">
           Terima Kasih
        </h2>
        
        <p className="font-body text-sm md:text-base text-[#4A4E69]/80 leading-relaxed max-w-sm mx-auto mb-16 font-medium bg-[#FFF5F5] p-6 rounded-3xl border-2 border-white shadow-sm">
           Kehadiran dan doa restumu akan membuat hari kebahagiaan kami menjadi semakin manis! Sampai jumpa di hari H ya! 🐰💖
        </p>
        
        <div className="flex flex-col items-center gap-6 py-12 relative">
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute top-0 w-24 h-1 bg-[#FCD5CE] rounded-full" 
           />
           
           <h3 className="font-heading text-5xl md:text-7xl text-[#4A4E69] tracking-tighter lowercase mt-8">
              {d.bride_name} <br/> <span className="text-[#FFB5A7] text-3xl italic mx-4">&amp;</span> <br/> {d.groom_name}
           </h3>
        </div>

        <div className="mt-20">
           <div className="bg-[#FFE5D9] inline-block px-8 py-3 rounded-full border-4 border-white shadow-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F28482] font-extrabold">
                 Sweet🐰Edition
              </p>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
