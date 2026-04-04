'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_media: media } = data;
  const imageUrl = getMedia(media, 'image_1');

  return (
    <section className="relative min-h-screen bg-white py-24 px-8 md:px-16 border-b border-stone-200">
      <div className="max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Typography */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-8"
          >
            An Exclusive Feature
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-heading text-6xl md:text-8xl text-stone-900 tracking-tighter leading-none mb-12 uppercase"
          >
            The <br/> Wedding <br/> <span className="italic font-light text-stone-300">Of</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.5 }}
            className="border-t border-stone-200 pt-8"
          >
             <p className="font-body text-sm md:text-base leading-relaxed text-stone-600 max-w-sm italic">
                “Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.”
             </p>
          </motion.div>
        </div>

        {/* Right Side: Editorial Image */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden border border-stone-200 order-1 md:order-2 shadow-2xl"
        >
           {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Editorial Portrait" 
                className="w-full h-full object-cover filter contrast-125 grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
              />
           ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] uppercase tracking-widest font-light">
                 Missing Feature Image
              </div>
           )}
           
           {/* Editorial Overlay */}
           <div className="absolute top-4 left-4 p-4 border border-white/20 bg-black/10 backdrop-blur-sm">
              <span className="text-white text-[8px] uppercase tracking-[0.3em] font-medium">Issue 01 // Cover Story</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
