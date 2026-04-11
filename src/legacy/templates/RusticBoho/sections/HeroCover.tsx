'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function HeroSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] py-24 px-8 overflow-hidden">
      
      {/* Editorial Decorative Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-[#D4A373]/10 rounded-full select-none pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
         
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12 relative"
         >
            <div className="w-[280px] h-[400px] md:w-[350px] md:h-[500px] rounded-t-full border-2 border-[#D4A373]/30 p-3 overflow-hidden shadow-2xl relative">
               <div className="w-full h-full rounded-t-full overflow-hidden bg-stone-100">
                  {coverUrl ? (
                     <img src={coverUrl} alt="Hero Visual" className="w-full h-full object-cover scale-110 sepia-[0.2]" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center italic text-stone-400">Portrait Image</div>
                  )}
               </div>
            </div>
            {/* Soft Floating Leaf/Flower Placeholder Icon */}
            <div className="absolute -bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg border border-stone-100 italic font-heading text-xs text-[#D4A373]">
               Save the Date
            </div>
         </motion.div>

         <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5 }}
            className="text-[10px] md:text-sm uppercase tracking-[0.4em] text-[#D4A373] mb-8 font-semibold"
         >
            The Wedding Celebration Of
         </motion.p>

         <div className="mb-12">
            <motion.h1
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1 }}
               className="font-heading text-7xl md:text-9xl text-stone-900 tracking-tighter leading-none lowercase"
            >
               {d.bride_name}
            </motion.h1>
            
            <motion.div
               initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
               whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ delay: 0.3, duration: 1 }}
               className="my-4 font-heading text-5xl md:text-6xl text-[#D4A373]/40 italic"
            >
               &amp;
            </motion.div>

            <motion.h1
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1 }}
               className="font-heading text-7xl md:text-9xl text-stone-900 tracking-tighter leading-none lowercase"
            >
               {d.groom_name}
            </motion.h1>
         </div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center gap-4"
         >
            <div className="w-12 h-px bg-[#D4A373]" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
               {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleDateString('id-ID', {
                 day: '2-digit', 
                 month: 'long', 
                 year: 'numeric'
               }) : 'MMXXVI'}
            </p>
            <div className="w-12 h-px bg-[#D4A373]" />
         </motion.div>
      </div>

      {/* Decorative vertical label */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:block">
         <span className="font-mono text-[8px] uppercase tracking-[0.6em] text-stone-300 vertical-text font-bold rotate-180">
            NATURAL • ORGANIC • ETERNAL
         </span>
      </div>
    </section>
  );
}
