'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ClientDetails } from '@/types/client';

interface HeroCoverProps {
  details: ClientDetails;
  coverUrl: string | null;
}

export default function HeroCover({ details, coverUrl }: HeroCoverProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section className="relative min-h-screen bg-slate-100 overflow-hidden text-slate-900 border-b border-slate-900 flex flex-col md:flex-row">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-x-0 top-1/2 w-full h-px bg-slate-900/10 hidden md:block" />
      <div className="absolute inset-y-0 left-1/2 w-px h-full bg-slate-900/10 hidden md:block" />

      {/* Typography Section (Left/Top) */}
      <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-900 z-10 bg-slate-100 relative">
         <motion.div
           initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
           animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
           transition={{ duration: 1.2, ease: "easeOut" }}
         >
           <p className="font-sans text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-slate-500 mb-8 flex items-center justify-between">
             <span>The Luxury Wedding</span>
             <span className="w-12 border-b border-slate-900 inline-block" />
           </p>

           <h1 className="font-sans font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.8] text-slate-900 break-words mb-8">
             {details.bride_name} <br/> <span className="text-slate-300 stroke-slate-900" style={{WebkitTextStroke: '2px #0f172a'}}>&</span> <br/> {details.groom_name}
           </h1>

           <p className="font-sans text-sm md:text-base leading-relaxed text-slate-600 max-w-sm mb-12">
             Kami merayakan ikatan suci ini dengan penuh rasa syukur dan mengundang Anda untuk turut serta dalam kebahagiaan kami.
           </p>

           <div className="flex gap-4">
             <a href="#event" className="font-sans text-xs font-bold uppercase tracking-[0.3em] px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 transition-colors">
               Detail Acara
             </a>
           </div>
         </motion.div>
      </div>

      {/* Cover Image Section (Right/Bottom) */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] overflow-hidden bg-slate-900">
        <motion.div style={{ y }} className="w-full h-[150%] absolute -top-[25%] left-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt="Cover"
              className="w-full h-full object-cover filter grayscale opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center font-sans tracking-[0.5em] text-slate-600 uppercase text-xs">
              Cover Placeholder
            </div>
          )}
        </motion.div>

        {/* Brutalist Date Badge Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-0 right-0 bg-white border-t border-l border-slate-900 p-6 md:p-8"
        >
          <p className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 mb-2">Save The Date</p>
          <p className="font-sans text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">
            {details.akad_datetime ? new Date(details.akad_datetime).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD'}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
