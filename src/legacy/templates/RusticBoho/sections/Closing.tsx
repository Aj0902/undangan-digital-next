'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full py-40 px-8 md:px-16 bg-white overflow-hidden text-center flex flex-col items-center justify-center">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A373]/20 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-2xl w-full"
      >
        <p className="font-body text-sm md:text-base text-stone-500 leading-relaxed italic font-light mb-8">
           "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami. Atas kehadiran dan doa restunya, kami ucapkan terima kasih."
        </p>
        
        <p className="text-[10px] tracking-[0.4em] font-bold text-stone-400 mb-16 uppercase italic">
           Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
        </p>

        <div className="flex flex-col items-center gap-4 py-8 border-t border-[#D4A373]/10">
           <h3 className="font-heading text-6xl md:text-8xl text-stone-900 tracking-tighter lowercase italic">
              {d.bride_name} <span className="font-light text-stone-300">&amp;</span> {d.groom_name}
           </h3>
        </div>

        <div className="mt-24">
           <p className="font-mono text-[8px] uppercase tracking-[1em] text-stone-300 font-bold italic">
              — Viding Engine —
           </p>
        </div>
      </motion.div>
    </section>
  );
}
