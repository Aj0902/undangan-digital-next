'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function CoupleSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  
  const brideImg = getMedia(media, 'gallery_1');
  const groomImg = getMedia(media, 'gallery_2');

  return (
    <section className="relative w-full py-24 px-8 md:px-16 bg-white overflow-hidden border-b border-stone-200">
      
      {/* Editorial Decorative Masthead */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-stone-200 flex items-center justify-between px-12 bg-stone-50">
        <span className="text-[8px] uppercase tracking-[0.5em] text-stone-400">The Feature</span>
        <span className="text-[8px] uppercase tracking-[0.5em] text-stone-900 border-x border-stone-200 px-6 h-full flex items-center">The Protagonists</span>
        <span className="text-[8px] uppercase tracking-[0.5em] text-stone-400">Issue 01</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-24">
        
        {/* Bride Section */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.2 }}
           className="flex flex-col items-center text-center"
        >
           <div className="w-full aspect-[3/4] mb-12 relative overflow-hidden bg-stone-100 border border-stone-200 group">
              {brideImg ? (
                <img src={brideImg} alt="Bride" className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
              ) : (
                <div className="w-full h-full flex items-center justify-center italic text-stone-300 text-[10px] uppercase tracking-widest font-light">Portrait Placeholder</div>
              )}
              {/* Photo Caption Style */}
              <div className="absolute bottom-4 left-4 p-2 bg-white/50 backdrop-blur-sm shadow-sm border border-stone-100">
                 <span className="text-[8px] uppercase tracking-[0.4em] font-medium text-stone-900">Protagonist No. 01</span>
              </div>
           </div>
           
           <h3 className="font-heading text-5xl md:text-6xl text-stone-900 tracking-tighter leading-none mb-6">
              {d.bride_full_name || d.bride_name}
           </h3>
           <div className="w-12 h-px bg-stone-900 mb-6" />
           <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-light italic mb-2">Putri Tercinta Dari</p>
           <p className="font-heading text-2xl text-stone-900 font-light italic px-4 leading-normal">
              {d.bride_parents || 'Bpk. & Ibu Nama Orang Tua'}
           </p>
        </motion.div>

        {/* Groom Section */}
        <motion.div 
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.2 }}
           className="flex flex-col items-center text-center"
        >
           <div className="w-full aspect-[3/4] mb-12 relative overflow-hidden bg-stone-100 border border-stone-200 group">
              {groomImg ? (
                <img src={groomImg} alt="Groom" className="w-full h-full object-cover filter grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
              ) : (
                <div className="w-full h-full flex items-center justify-center italic text-stone-300 text-[10px] uppercase tracking-widest font-light">Portrait Placeholder</div>
              )}
               {/* Photo Caption Style */}
               <div className="absolute bottom-4 right-4 p-2 bg-white/50 backdrop-blur-sm shadow-sm border border-stone-100">
                 <span className="text-[8px] uppercase tracking-[0.4em] font-medium text-stone-900">Protagonist No. 02</span>
              </div>
           </div>
           
           <h3 className="font-heading text-5xl md:text-6xl text-stone-900 tracking-tighter leading-none mb-6">
              {d.groom_full_name || d.groom_name}
           </h3>
           <div className="w-12 h-px bg-stone-900 mb-6" />
           <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-light italic mb-2">Putra Tercinta Dari</p>
           <p className="font-heading text-2xl text-stone-900 font-light italic px-4 leading-normal">
              {d.groom_parents || 'Bpk. & Ibu Nama Orang Tua'}
           </p>
        </motion.div>

      </div>
    </section>
  );
}
