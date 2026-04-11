'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_media: media } = data;
  const portraitUrl = getMedia(media, 'image_1');

  return (
    <section className="relative w-full py-40 px-8 md:px-16 bg-[#0A0A0A] overflow-hidden border-b border-[#E5E4E2]/10 flex flex-col items-center">
      
      {/* Absolute Rigid Center Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#E5E4E2]/5 -translate-x-1/2 pointer-events-none" />

      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false, amount: 0.2 }}
         transition={{ duration: 1.5, ease: "easeOut" }}
         className="text-center max-w-4xl mx-auto z-10"
      >
         <h2 className="font-heading text-4xl md:text-6xl text-[#E5E4E2] tracking-tighter leading-tight mb-8">
            The Proclamation
         </h2>
         
         <div className="w-12 h-px bg-[#E5E4E2]/50 mx-auto mb-16" />

         <div className="relative">
            {/* Monumental Quotes */}
            <span className="absolute -top-12 -left-8 md:-left-16 font-heading text-8xl text-[#E5E4E2]/10 leading-none select-none">"</span>
            
            <p className="font-body text-base md:text-xl leading-relaxed text-stone-400 font-light tracking-wide text-balance">
               Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.
            </p>
            
            <span className="absolute -bottom-16 -right-8 md:-right-16 font-heading text-8xl text-[#E5E4E2]/10 leading-none select-none rotate-180">"</span>
         </div>
         
         <div className="mt-16 flex flex-col items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold border border-stone-800 px-6 py-2">Ar-Rum : 21</span>
         </div>
      </motion.div>

    </section>
  );
}
