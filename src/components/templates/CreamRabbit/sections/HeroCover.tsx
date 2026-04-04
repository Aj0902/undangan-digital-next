'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function HeroSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#FFF5F5] py-24 px-8 overflow-hidden">
      
      {/* Decorative Floating Clouds/Pills */}
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-32 left-8 md:top-40 md:left-24 w-32 h-12 bg-[#FCD5CE]/60 rounded-full blur-[2px]" />
      <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-40 right-10 md:bottom-52 md:right-32 w-24 h-10 bg-[#FFE5D9]/60 rounded-full blur-[1px]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
         
         <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="mb-12 relative"
         >
            <div className="w-[280px] h-[360px] md:w-[320px] md:h-[420px] rounded-[60px] md:rounded-[80px] border-[6px] border-white bg-white p-2 overflow-hidden shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="w-full h-full rounded-[45px] md:rounded-[65px] overflow-hidden bg-[#FFE5D9]">
                  {coverUrl ? (
                     <img src={coverUrl} alt="Hero Visual" className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center font-bold text-[#FFB5A7] text-[10px] uppercase tracking-widest">Portrait</div>
                  )}
               </div>
            </div>
            {/* Cute Sticker */}
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="absolute -top-6 -left-6 bg-[#F28482] text-white py-3 px-6 rounded-full shadow-lg border-2 border-white transform -rotate-12 cursor-pointer"
            >
               <span className="font-heading text-xl italic font-bold">love</span>
            </motion.div>
         </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-white mb-6 shadow-sm"
         >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FFB5A7] font-extrabold">
               The Sweetest Day Of
            </p>
         </motion.div>

         <div className="mb-12 flex flex-col items-center">
            <motion.h1
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
               className="font-heading text-7xl md:text-9xl text-[#4A4E69] tracking-tighter leading-none lowercase"
            >
               {d.bride_name}
            </motion.h1>
            
            <motion.div
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="my-2 font-heading text-5xl md:text-6xl text-[#FFB5A7] italic"
            >
               &amp;
            </motion.div>

            <motion.h1
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
               className="font-heading text-7xl md:text-9xl text-[#4A4E69] tracking-tighter leading-none lowercase"
            >
               {d.groom_name}
            </motion.h1>
         </div>

         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
            className="flex items-center gap-6 px-10 py-5 bg-white rounded-full shadow-[0_8px_0_#FFE5D9] border-2 border-white"
         >
            <p className="font-mono text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#4A4E69]">
               {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleDateString('id-ID', {
                 month: 'short', 
                 year: 'numeric'
               }) : 'MMXXVI'}
            </p>
         </motion.div>
      </div>
    </section>
  );
}
