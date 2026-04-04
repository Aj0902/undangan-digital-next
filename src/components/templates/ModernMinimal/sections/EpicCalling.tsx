'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function EpicCalling({ data }: { data: Client }) {
  const { client_media: media } = data;
  const imageUrl = getMedia(media, 'image_1');

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white border-b border-slate-200">
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:border-r border-slate-200">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400 mb-8"
        >
          An Invitation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="font-sans font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-slate-900 uppercase mb-12"
        >
          The <br/> Wedding <br/> <span className="text-slate-300">Of</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-base md:text-lg leading-relaxed text-slate-600 max-w-md"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </motion.p>
      </div>

      <div className="relative border-t md:border-t-0 border-slate-200 p-8 md:p-16 flex items-center justify-center bg-slate-50">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
           className="w-full h-full min-h-[50vh] relative border border-slate-900 overflow-hidden"
        >
           {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="The Wedding Of" 
                className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
           ) : (
              <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 font-sans tracking-widest text-xs uppercase text-center p-4">
                 MISSING IMAGE_1
              </div>
           )}
           {/* Decorative crop marks */}
           <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-900" />
           <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-900" />
        </motion.div>
      </div>
    </section>
  );
}
