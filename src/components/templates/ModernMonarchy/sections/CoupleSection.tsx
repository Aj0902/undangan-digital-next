'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function CoupleSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  
  const brideImg = getMedia(media, 'gallery_1');
  const groomImg = getMedia(media, 'gallery_2');

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A] border-b border-[#E5E4E2]/10 py-32">
      
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-stone-800 -translate-x-1/2" />

      <div className="text-center mb-24 relative z-10 w-full flex justify-center">
         <div className="bg-[#0A0A0A] px-8 py-2">
            <h2 className="font-mono text-[8px] uppercase tracking-[0.6em] text-[#E5E4E2] font-bold">The Dynasty</h2>
         </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative z-10 w-full">
         
         {/* Bride Portrait Block */}
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-center px-4 md:px-16"
         >
            <div className="w-full max-w-sm aspect-[3/4] overflow-hidden mb-12 relative group">
               {brideImg ? (
                  <img src={brideImg} alt="The Bride" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-1000" />
               ) : (
                  <div className="w-full h-full bg-stone-900 flex items-center justify-center font-mono text-[8px] uppercase tracking-widest text-[#E5E4E2]/20">Subject A</div>
               )}
            </div>

            <div className="text-center">
               <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-4 border-b border-stone-800 pb-2">The Daughter</p>
               <h3 className="font-heading text-4xl text-[#E5E4E2] lowercase tracking-tighter mb-4">
                  {d.bride_full_name || d.bride_name}
               </h3>
               <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-600">
                  {d.bride_parents || 'Unknown Patron'}
               </p>
            </div>
         </motion.div>

         {/* Groom Portrait Block */}
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            className="w-full md:w-1/2 flex flex-col items-center px-4 md:px-16 mt-24 md:mt-0 md:pt-32"
         >
            <div className="text-center mb-12 order-2 md:order-1 mt-12 md:mt-0">
               <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-4 border-b border-stone-800 pb-2">The Son</p>
               <h3 className="font-heading text-4xl text-[#E5E4E2] lowercase tracking-tighter mb-4">
                  {d.groom_full_name || d.groom_name}
               </h3>
               <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-600">
                  {d.groom_parents || 'Unknown Patron'}
               </p>
            </div>

            <div className="w-full max-w-sm aspect-[3/4] overflow-hidden order-1 md:order-2 relative group">
               {groomImg ? (
                  <img src={groomImg} alt="The Groom" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:brightness-100 transition-all duration-1000" />
               ) : (
                  <div className="w-full h-full bg-stone-900 flex items-center justify-center font-mono text-[8px] uppercase tracking-widest text-[#E5E4E2]/20">Subject B</div>
               )}
            </div>
         </motion.div>

      </div>
    </section>
  );
}
