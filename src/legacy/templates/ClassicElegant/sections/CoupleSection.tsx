'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

interface CoupleSectionProps {
  data: Client;
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { client_details: d, client_media: media } = data;
  
  const brideImg = getMedia(media, 'gallery_1');
  const groomImg = getMedia(media, 'gallery_2');

  return (
    <section className="relative py-24 px-8 bg-cream overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] -rotate-90 pointer-events-none">
        <img src="/assets/template-classic/gold-divider.png" alt="" className="w-[500px]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-32 relative z-10">
        
        {/* Teks Pengantar Wajib */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
           className="text-center max-w-2xl mx-auto -mb-16"
        >
          <p className="font-heading text-lg md:text-xl text-primary font-light italic leading-relaxed opacity-80">
            &ldquo;Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir pada pernikahan kami:&rdquo;
          </p>
          <div className="h-[1px] w-16 bg-gold/50 mx-auto mt-8" />
        </motion.div>

        {/* Mempelai Wanita (Bride) */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.2 }}
            className="relative w-64 h-80 md:w-80 md:h-[480px] shrink-0"
          >
             {/* Frame Ornaments */}
             <img src="/assets/template-classic/gold-corner.png" alt="" className="absolute -top-4 -left-4 w-16 mix-blend-multiply z-20" />
             <img src="/assets/template-classic/gold-corner.png" alt="" className="absolute -bottom-4 -right-4 w-16 mix-blend-multiply rotate-180 z-20" />
             
             <div className="w-full h-full border-[10px] border-white shadow-xl overflow-hidden bg-slate-50">
               {brideImg ? (
                 <img src={brideImg} alt={d.bride_full_name || d.bride_name} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-xs font-body uppercase tracking-widest text-primary/30 p-8 text-center italic">
                    Bride Portrait Placeholder
                 </div>
               )}
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <h3 className="font-heading text-5xl md:text-6xl text-primary font-light mb-6 tracking-tight">
              {d.bride_full_name || d.bride_name}
            </h3>
            <div className="h-[1px] w-12 bg-gold/40 mb-6" />
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-primary/60 mb-2">
              Putri tercinta dari
            </p>
            <p className="font-heading text-xl md:text-2xl text-primary italic font-light opacity-90 leading-relaxed max-w-sm">
              {d.bride_parents || 'Bpk. & Ibu Nama Orang Tua'}
            </p>
          </motion.div>
        </div>

        {/* Separator Symbol */}
        <div className="flex justify-center items-center gap-8 py-4 opacity-30">
          <div className="h-[1px] flex-1 bg-gold/20" />
          <span className="font-heading text-6xl text-gold italic">&amp;</span>
          <div className="h-[1px] flex-1 bg-gold/20" />
        </div>

        {/* Mempelai Pria (Groom) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.2 }}
            className="relative w-64 h-80 md:w-80 md:h-[480px] shrink-0"
          >
             {/* Frame Ornaments */}
             <img src="/assets/template-classic/gold-corner.png" alt="" className="absolute -top-4 -right-4 w-16 mix-blend-multiply rotate-90 z-20" />
             <img src="/assets/template-classic/gold-corner.png" alt="" className="absolute -bottom-4 -left-4 w-16 mix-blend-multiply -rotate-90 z-20" />
             
             <div className="w-full h-full border-[10px] border-white shadow-xl overflow-hidden bg-slate-50">
               {groomImg ? (
                 <img src={groomImg} alt={d.groom_full_name || d.groom_name} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-xs font-body uppercase tracking-widest text-primary/30 p-8 text-center italic">
                    Groom Portrait Placeholder
                 </div>
               )}
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center md:text-right flex flex-col items-center md:items-end"
          >
            <h3 className="font-heading text-5xl md:text-6xl text-primary font-light mb-6 tracking-tight">
              {d.groom_full_name || d.groom_name}
            </h3>
            <div className="h-[1px] w-12 bg-gold/40 mb-6" />
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-primary/60 mb-2">
              Putra tercinta dari
            </p>
            <p className="font-heading text-xl md:text-2xl text-primary italic font-light opacity-90 leading-relaxed max-w-sm">
              {d.groom_parents || 'Bpk. & Ibu Nama Orang Tua'}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
