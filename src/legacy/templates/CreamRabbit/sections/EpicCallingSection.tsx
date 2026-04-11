'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_media: media } = data;
  const portraitUrl = getMedia(media, 'image_1');

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#FCD5CE] overflow-hidden rounded-t-[60px] md:rounded-t-[100px] -mt-10 z-20">
      
      {/* Decorative Wavy Divider (CSS shape alternative) */}
      <div className="absolute top-0 inset-x-0 h-4 bg-white/30 rounded-full blur-[2px]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center max-w-5xl mx-auto mt-12 bg-white/40 p-8 md:p-16 rounded-[50px] md:rounded-[80px] shadow-xl border-4 border-white backdrop-blur-sm">
        
        {/* Left Side: Playful Typography */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
           whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, damping: 15 }}
           className="flex flex-col justify-center text-center md:text-left relative"
        >
           {/* Sticker Accent */}
           <motion.div 
             animate={{ y: [0, -10, 0] }} 
             transition={{ repeat: Infinity, duration: 3 }} 
             className="absolute -top-10 -left-6 bg-[#FFE5D9] text-[#4A4E69] px-4 py-2 rounded-full border-2 border-white rotate-12 shadow-sm font-bold text-[10px] uppercase tracking-widest hidden md:block"
           >
             Yay!
           </motion.div>

           <h2 className="font-heading text-5xl md:text-7xl text-[#4A4E69] tracking-tighter leading-tight mb-8 lowercase">
              We Are <br/> <span className="text-white drop-shadow-md">Getting</span> <br/> Married
           </h2>
           
           <div className="w-16 h-2 bg-white rounded-full mb-8 mx-auto md:mx-0" />
           
           <p className="font-body text-sm md:text-base leading-relaxed text-[#4A4E69] max-w-sm mx-auto md:mx-0 font-medium bg-white/60 p-6 rounded-3xl shadow-sm border border-white">
              Sangat membahagiakan bagi kami jika teman-teman sekalian bisa hadir dan ikut merayakan hari paling manis dalam hidup kami! 🐰💖
           </p>
        </motion.div>

        {/* Right Side: Playful Image Card */}
        <motion.div
           initial={{ opacity: 0, x: 50, rotate: 10 }}
           whileInView={{ opacity: 1, x: 0, rotate: -5 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, damping: 15 }}
           className="relative aspect-square md:aspect-[4/5] w-full bg-white p-4 rounded-[40px] md:rounded-[60px] shadow-2xl border-4 border-white hover:rotate-0 transition-transform duration-500"
        >
           <div className="w-full h-full rounded-[30px] md:rounded-[50px] overflow-hidden bg-[#FFB5A7]">
              {portraitUrl ? (
                 <img 
                   src={portraitUrl} 
                   alt="Portrait Visual" 
                   className="w-full h-full object-cover filter brightness-105 hover:scale-110 transition-all duration-700" 
                 />
              ) : (
                 <div className="w-full h-full flex items-center justify-center font-bold text-white text-[12px] uppercase tracking-widest">
                    Sweet Photo
                 </div>
              )}
           </div>
           
           {/* Floating Bubble Badge */}
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }} 
             transition={{ repeat: Infinity, duration: 2 }} 
             className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#F28482] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-center leading-none"
           >
              <span className="font-heading text-xl italic font-bold">Best<br/>Day</span>
           </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
