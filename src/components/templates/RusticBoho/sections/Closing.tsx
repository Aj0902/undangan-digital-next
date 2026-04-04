'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full py-40 px-8 md:px-16 bg-[#FDFBF7] overflow-hidden text-center flex flex-col items-center justify-center">
      
      {/* Decorative Wax Seal Illustration */}
      <motion.div
         initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
         whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 1.5, ease: "easeOut" }}
         className="w-24 h-24 bg-[#D4A373] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#BC8A5F] mb-12 relative"
      >
         <span className="font-heading text-4xl text-white italic transform -rotate-12 translate-x-1 translate-y-1">
            &amp;
         </span>
         <div className="absolute inset-0 border-2 border-white/20 rounded-full scale-90" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-xl w-full"
      >
        <h2 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter lowercase leading-none mb-12">
           Terima Kasih
        </h2>
        
        <p className="font-body text-sm text-stone-500 leading-relaxed max-w-sm mx-auto mb-16 italic font-light">
           Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami berdua.
        </p>
        
        <p className="text-[10px] tracking-[0.4em] font-bold text-stone-400 mb-12 uppercase italic">
           Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
        </p>

        <div className="flex flex-col items-center gap-4 py-8 border-t border-[#D4A373]/10">
           <span className="text-[10px] tracking-[0.4em] text-[#D4A373] uppercase font-bold italic mb-2">Our Sincere Love,</span>
           <h3 className="font-heading text-6xl md:text-8xl text-stone-900 tracking-tighter lowercase">
              {d.bride_name} <span className="font-light text-stone-300">&amp;</span> {d.groom_name}
           </h3>
        </div>

        <div className="mt-24">
           <p className="font-mono text-[8px] uppercase tracking-[1em] text-stone-300 font-bold italic">
              — RUSTIC MMXXVI —
           </p>
        </div>
      </motion.div>

      {/* Finishing Touch: Vertical Side Decoration */}
      <div className="absolute bottom-12 left-10 hidden md:block opacity-20 pointer-events-none">
         <span className="font-mono text-[8px] uppercase tracking-[0.6em] text-stone-400 vertical-text font-bold rotate-180">
            NATURAL • ORGANIC • ETERNAL • RUSTIC
         </span>
      </div>
    </section>
  );
}
