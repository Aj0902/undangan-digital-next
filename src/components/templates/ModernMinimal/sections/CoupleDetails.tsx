'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ClientDetails } from '@/types/client';
import { getMedia } from '@/types/client';

interface CoupleDetailsProps {
  details: ClientDetails;
  media?: any[];
}

export default function CoupleDetails({ details, media = [] }: CoupleDetailsProps) {
  const brideImg = getMedia(media, 'gallery_1');
  const groomImg = getMedia(media, 'gallery_2');

  return (
    <section className="relative bg-slate-900 border-t border-slate-800 overflow-hidden text-white">
      {/* Brutalist Grid Lines */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block" />

      {/* Intro Text */}
      <div className="border-b border-slate-800 p-8 md:p-16 lg:px-24">
         <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="font-sans text-xl md:text-3xl max-w-4xl text-slate-300 leading-tight font-light"
         >
           "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir pada pernikahan kami:"
         </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Bride */}
        <div className="p-8 md:p-16 border-b md:border-b-0 border-slate-800 group cursor-default">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: false, amount: 0.2 }}
             className="w-full aspect-[3/4] relative overflow-hidden bg-slate-800 mb-8 border border-slate-700"
           >
              {brideImg ? (
                <img src={brideImg} alt="Bride" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              ) : (
                <div className="w-full h-full flex justify-center items-center font-sans tracking-widest text-xs uppercase text-slate-500">Bride Placeholder</div>
              )}
           </motion.div>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.2 }}
           >
             <h3 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">{details.bride_full_name || details.bride_name}</h3>
             <p className="font-sans text-sm tracking-[0.2em] font-bold uppercase text-slate-400 mb-1">Putri Dari</p>
             <p className="font-sans text-lg text-slate-300">{details.bride_parents || 'Bpk. & Ibu Nama Orang Tua'}</p>
           </motion.div>
        </div>

        {/* Groom */}
        <div className="p-8 md:p-16 group cursor-default">
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: false, amount: 0.2 }}
             className="w-full aspect-[3/4] relative overflow-hidden bg-slate-800 mb-8 border border-slate-700"
           >
              {groomImg ? (
                <img src={groomImg} alt="Groom" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              ) : (
                <div className="w-full h-full flex justify-center items-center font-sans tracking-widest text-xs uppercase text-slate-500">Groom Placeholder</div>
              )}
           </motion.div>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.2 }}
           >
             <h3 className="font-sans font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">{details.groom_full_name || details.groom_name}</h3>
             <p className="font-sans text-sm tracking-[0.2em] font-bold uppercase text-slate-400 mb-1">Putra Dari</p>
             <p className="font-sans text-lg text-slate-300">{details.groom_parents || 'Bpk. & Ibu Nama Orang Tua'}</p>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
