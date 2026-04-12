'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import { Heart } from 'lucide-react';

export default function CoupleSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  
  const brideImg = getMedia(media, 'gallery_1');
  const groomImg = getMedia(media, 'gallery_2');

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        
        {/* Bride Section */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="flex flex-col items-center text-center"
        >
           {/* Card Frame Style */}
           <div className="w-[280px] h-[420px] md:w-[320px] md:h-[480px] relative mb-12 p-4 bg-[#F7EFE1] border border-stone-100 shadow-2xl rounded-tr-[120px] rounded-bl-[120px] rotate-[-2deg]">
              <div className="w-full h-full overflow-hidden bg-stone-300 rounded-tr-[110px] rounded-bl-[110px]">
                 {brideImg ? (
                   <img src={brideImg} alt="Bride" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%] hover:grayscale-0 hover:scale-105 transition-all duration-1000" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center italic text-stone-300 text-[10px] uppercase tracking-widest font-light">Portrait Placeholder</div>
                 )}
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#D4A373] shadow-md border border-stone-100">
                 <Heart size={20} />
              </div>
           </div>
           
           <h3 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter lowercase leading-[0.8] mb-6">
              {d.bride_full_name || d.bride_name}
           </h3>
           <div className="w-12 h-px bg-[#D4A373] mb-6" />
           <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-bold italic mb-2">Putri Tercinta Dari</p>
           <p className="font-heading text-3xl text-stone-900 font-light italic px-4 leading-normal lowercase">
              {d.bride_parents}
           </p>
        </motion.div>

        {/* Groom Section */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
           className="flex flex-col items-center text-center"
        >
           {/* Card Frame Style */}
           <div className="w-[280px] h-[420px] md:w-[320px] md:h-[480px] relative mb-12 p-4 bg-[#F7EFE1] border border-stone-100 shadow-2xl rounded-tl-[120px] rounded-br-[120px] rotate-[2deg]">
              <div className="w-full h-full overflow-hidden bg-stone-300 rounded-tl-[110px] rounded-br-[110px]">
                 {groomImg ? (
                   <img src={groomImg} alt="Groom" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%] hover:grayscale-0 hover:scale-105 transition-all duration-1000" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center italic text-stone-300 text-[10px] uppercase tracking-widest font-light">Portrait Placeholder</div>
                 )}
              </div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#D4A373] shadow-md border border-stone-100 font-heading italic text-xl">
                 &amp;
              </div>
           </div>
           
           <h3 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter lowercase leading-[0.8] mb-6">
              {d.groom_full_name || d.groom_name}
           </h3>
           <div className="w-12 h-px bg-[#D4A373] mb-6" />
           <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-bold italic mb-2">Putra Tercinta Dari</p>
           <p className="font-heading text-3xl text-stone-900 font-light italic px-4 leading-normal lowercase">
              {d.groom_parents}
           </p>
        </motion.div>

      </div>
    </section>
  );
}
