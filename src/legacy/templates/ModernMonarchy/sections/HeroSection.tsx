'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function HeroSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden border-b border-[#E5E4E2]/10">
      
      {/* Background Image with Deep Cinema Contrast */}
      <div className="absolute inset-0 w-full h-full">
         <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.6 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="w-full h-full bg-stone-900"
         >
            {coverUrl ? (
               <img src={coverUrl} alt="The Sovereign" className="w-full h-full object-cover filter contrast-125 saturate-50 brightness-50 object-center" />
            ) : (
               <div className="w-full h-full bg-stone-900" />
            )}
         </motion.div>
         {/* Heavy Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]" />
         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-8 h-full pt-32 pb-16 justify-between min-h-screen">
         
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center"
         >
            <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-[#E5E4E2]/70 mb-4">
               The Unification
            </p>
         </motion.div>

         <div className="text-center w-full">
            <motion.h1
               initial={{ opacity: 0, filter: "blur(10px)" }}
               whileInView={{ opacity: 1, filter: "blur(0px)" }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
               className="font-heading text-6xl md:text-9xl lg:text-[10rem] text-[#E5E4E2] tracking-tighter leading-none"
            >
               {d.bride_name}
            </motion.h1>
            
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 2, delay: 0.5 }}
               className="my-4 font-body text-xl md:text-3xl text-[#E5E4E2]/40 font-light italic"
            >
               &amp;
            </motion.div>

            <motion.h1
               initial={{ opacity: 0, filter: "blur(10px)" }}
               whileInView={{ opacity: 1, filter: "blur(0px)" }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
               className="font-heading text-6xl md:text-9xl lg:text-[10rem] text-[#E5E4E2] tracking-tighter leading-none"
            >
               {d.groom_name}
            </motion.h1>
         </div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            className="border-t border-[#E5E4E2]/20 pt-8 w-full max-w-xs text-center"
         >
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">
               {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleDateString('id-ID', {
                 year: 'numeric'
               }) : 'MMXXVI'}
            </p>
         </motion.div>

      </div>
    </section>
  );
}
