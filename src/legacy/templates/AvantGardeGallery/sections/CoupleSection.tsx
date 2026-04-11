'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

export default function CoupleSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  
  const brideImg = getMedia(media, 'gallery_1');
  const groomImg = getMedia(media, 'gallery_2');

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-white overflow-hidden">
      
      {/* Decorative Splash */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" 
      />

      {/* The Gallery Floor Line */}
      <div className="absolute bottom-0 inset-x-0 h-4 border-t border-stone-200 bg-stone-50" />

      <div className="max-w-6xl mx-auto">
         
         {/* Room Label */}
         <div className="mb-24 flex items-center gap-6">
            <h2 className="font-heading text-4xl md:text-5xl text-stone-900 lowercase italic">Room 01: The Subjects</h2>
            <div className="flex-grow h-px bg-stone-200" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            
            {/* Bride Portrait */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
               className="flex flex-col items-end relative"
            >
               {/* Frame */}
               <div className="w-[300px] h-[400px] md:w-[400px] md:h-[550px] bg-white p-4 shadow-xl border border-stone-100 z-10 relative">
                  <div className="w-full h-full overflow-hidden bg-stone-200">
                     {brideImg ? (
                       <img src={brideImg} alt="Bride Subject" className="w-full h-full object-cover filter contrast-125 grayscale-[50%] hover:grayscale-0 transition-all duration-700" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-stone-400">Subject A</div>
                     )}
                  </div>
                  
                  {/* Aggressive Red Accent inside frame */}
                  <div className="absolute top-8 -right-4 w-12 h-3 bg-rose-600 mix-blend-multiply rotate-12" />
               </div>

               {/* Museum Plaque */}
               <div className="w-[200px] bg-white border border-stone-200 p-4 shadow-sm mt-8 mr-12 relative z-20">
                  <div className="flex justify-between items-start mb-4 border-b border-stone-100 pb-2">
                     <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-400">Subject 01</p>
                     <div className="w-2 h-2 rounded-full bg-stone-900" />
                  </div>
                  <h3 className="font-heading text-2xl text-stone-900 lowercase leading-none mb-2">
                     {d.bride_full_name || d.bride_name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Daughter of</p>
                  <p className="font-body text-xs text-stone-600">
                     {d.bride_parents || 'Unknown Patron'}
                  </p>
               </div>
            </motion.div>

            {/* Groom Portrait */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
               className="flex flex-col items-start relative mt-12 md:mt-32"
            >
               {/* Frame */}
               <div className="w-[300px] h-[400px] md:w-[400px] md:h-[550px] bg-white p-4 shadow-xl border border-stone-100 z-10 relative">
                  <div className="w-full h-full overflow-hidden bg-stone-200">
                     {groomImg ? (
                       <img src={groomImg} alt="Groom Subject" className="w-full h-full object-cover filter contrast-125 grayscale-[50%] hover:grayscale-0 transition-all duration-700" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-stone-400">Subject B</div>
                     )}
                  </div>

                  {/* Aggressive Red Accent inside frame */}
                  <div className="absolute bottom-16 -left-6 w-16 h-4 bg-rose-600 mix-blend-multiply -rotate-12" />
               </div>

               {/* Museum Plaque */}
               <div className="w-[200px] bg-white border border-stone-200 p-4 shadow-sm mt-8 ml-12 relative z-20">
                  <div className="flex justify-between items-start mb-4 border-b border-stone-100 pb-2">
                     <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-400">Subject 02</p>
                     <div className="w-2 h-2 rounded-full bg-stone-900" />
                  </div>
                  <h3 className="font-heading text-2xl text-stone-900 lowercase leading-none mb-2">
                     {d.groom_full_name || d.groom_name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Son of</p>
                  <p className="font-body text-xs text-stone-600">
                     {d.groom_parents || 'Unknown Patron'}
                  </p>
               </div>
            </motion.div>

         </div>
      </div>
    </section>
  );
}
