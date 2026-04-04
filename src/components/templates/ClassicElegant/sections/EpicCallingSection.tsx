'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_media: media } = data;
  const imageUrl = getMedia(media, 'image_1');

  return (
    <section className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-cream overflow-hidden">
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: 'url(/assets/template-classic/paper-texture.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-primary font-heading font-light text-5xl md:text-7xl mb-12 tracking-wide"
        >
          The Wedding Of
        </motion.h1>

        {/* Epic Photograph (Oval/Arch) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
           viewport={{ once: false, amount: 0.2 }}
           className="w-64 h-96 md:w-80 md:h-[30rem] rounded-full overflow-hidden shadow-2xl border-8 border-white mb-12 relative"
        >
           {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="The Wedding Of" 
                className="w-full h-full object-cover"
              />
           ) : (
              <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs text-center p-4">
                 <span className="italic">Skeleton Loading...<br/>(Add image_1 in Admin)</span>
              </div>
           )}
        </motion.div>

        {/* Emotional Text */}
        <motion.p
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
           viewport={{ once: false, amount: 0.2 }}
           className="text-primary font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto opacity-80"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </motion.p>
      </div>
    </section>
  );
}
