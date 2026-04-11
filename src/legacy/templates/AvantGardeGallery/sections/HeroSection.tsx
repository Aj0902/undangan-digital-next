'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function HeroSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-stone-50 py-24 px-8 md:px-16 overflow-hidden">
      
      {/* Background Abstract Splash */}
      <motion.div 
         initial={{ scale: 0, opacity: 0 }}
         whileInView={{ scale: 1, opacity: 1 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 1.5, ease: "easeOut" }}
         className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600 rounded-full blur-[100px] opacity-20 pointer-events-none mix-blend-multiply"
      />

      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center relative z-10 gap-16 md:gap-24">
         
         {/* Left: Typography (The Plaque) */}
         <div className="w-full md:w-5/12 flex flex-col pt-12 md:pt-0 order-2 md:order-1 relative">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="border-l-2 border-stone-900 pl-6 mb-12"
            >
               <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-400 mb-4">Title</p>
               <h1 className="font-heading text-6xl md:text-8xl text-stone-900 tracking-tighter leading-[0.8] lowercase mb-6">
                  {d.bride_name} <br/>
                  <span className="text-rose-600 italic font-light ml-4">&amp;</span> <br/>
                  {d.groom_name}
               </h1>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ delay: 0.4, duration: 1 }}
               className="bg-white p-6 shadow-sm border border-stone-100 max-w-xs relative group"
            >
               <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-rose-600 group-hover:scale-150 transition-transform" />
               <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-2 pl-4">Year Created</p>
               <p className="font-body text-sm font-light text-stone-900 pl-4">
                  {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleDateString('id-ID', {
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric'
                  }) : 'MMXXVI'}
               </p>
            </motion.div>
         </div>

         {/* Right: The Masterpiece */}
         <div className="w-full md:w-7/12 relative order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div
               initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
               className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] bg-white p-4 shadow-2xl"
            >
               <div className="w-full h-full overflow-hidden bg-stone-200">
                  {coverUrl ? (
                     <img src={coverUrl} alt="Masterpiece" className="w-full h-full object-cover filter contrast-125 grayscale-[30%] hover:grayscale-0 transition-all duration-1000 origin-center" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center font-mono text-[8px] uppercase tracking-widest text-stone-400">Canvas Blank</div>
                  )}
               </div>
               
               {/* Chaotic Scribble Overlay */}
               <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 rotate-[-15deg] pointer-events-none opacity-80 mix-blend-multiply">
                  <span className="font-heading text-8xl md:text-9xl text-rose-600 italic drop-shadow-lg">Love</span>
               </div>
            </motion.div>
         </div>

      </div>
    </section>
  );
}
