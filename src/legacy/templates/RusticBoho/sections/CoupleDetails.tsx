'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import { Heart } from 'lucide-react';

export default function CoupleSection({ data }: { data: Client }) {
   const { client_details: d, client_media: media } = data;
   const containerRef = useRef<HTMLDivElement>(null);

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
   });

   const yOrnLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
   const yOrnRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

   const brideImg = getMedia(media, 'bride_photo');
   const groomImg = getMedia(media, 'groom_photo');

   return (
      <section ref={containerRef} className="relative w-full py-32 px-8 md:px-16 overflow-hidden bg-[var(--boho-bg)] flex flex-col items-center">
         {/* Background Ornaments - Accurate Placement */}
         <motion.img 
            src="/assets/rustic-boho/images/Or-kiri.svg"
            style={{ y: yOrnLeft, rotate: -15 }}
            className="absolute -left-32 top-0 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
            alt="Ornament Kiri"
         />
         <motion.img 
            src="/assets/rustic-boho/images/Or-kanansvg.svg"
            style={{ y: yOrnRight, rotate: 10 }}
            className="absolute -right-32 bottom-0 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
            alt="Ornament Kanan"
         />

         <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
            {/* Bride Section */}
            <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
               className="flex flex-col items-center text-center group"
            >
               {/* Organic Card Frame */}
               <div className="w-[280px] h-[400px] md:w-[340px] md:h-[480px] relative mb-12 p-3 bg-white border border-stone-100 shadow-[0_40px_100px_-20px_rgba(140,82,48,0.12)] rounded-[40px_120px_40px_120px] rotate-[-1deg] group-hover:rotate-0 transition-transform duration-1000">
                  <div className="w-full h-full overflow-hidden bg-stone-50 rounded-[35px_115px_35px_115px]">
                     {brideImg ? (
                        <img src={brideImg} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[4s] ease-out" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center italic text-stone-200 text-[10px] uppercase tracking-widest font-light font-body">Portrait Placeholder</div>
                     )}
                  </div>
                  <div className="absolute -top-6 -right-6 w-14 h-14 bg-[var(--boho-terracotta)] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white transition-transform group-hover:scale-110">
                     <Heart size={20} fill="currentColor" />
                  </div>
               </div>

               <div className="space-y-4 px-4 text-center">
                  <p className="font-accent text-5xl text-[var(--boho-terracotta)]">Mempelai Wanita</p>
                  <h3 className="font-heading text-fluid-h3 text-stone-900 tracking-tight leading-none mb-4 ">
                     {d.bride_full_name || d.bride_name}
                  </h3>
                  <div className="w-8 h-px bg-[var(--boho-gold)]/30 mx-auto" />
                  <div className="space-y-3">
                     <p className="font-body text-[10px] tracking-[0.4em] text-stone-300 uppercase font-bold italic">Putri Tercinta Dari</p>
                     <div className="font-body text-lg md:text-xl text-stone-600 leading-tight font-light italic text-center w-full flex flex-col items-center gap-1">
                        {d.bride_parents?.split(/\s*(?:&|dan|Dan)\s*/).map((p, i, a) => (
                           <span key={i} className="block w-full text-center">
                              {p}{i < a.length - 1 && <span className="text-[var(--boho-gold)] ml-2 font-accent text-2xl md:text-3xl leading-none italic block mt-1">&</span>}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Groom Section */}
            <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
               className="flex flex-col items-center text-center group"
            >
               {/* Organic Card Frame */}
               <div className="w-[280px] h-[400px] md:w-[340px] md:h-[480px] relative mb-12 p-3 bg-white border border-stone-100 shadow-[0_40px_100px_-20px_rgba(140,82,48,0.12)] rounded-[120px_40px_120px_40px] -rotate-[1deg] group-hover:rotate-0 transition-transform duration-1000">
                  <div className="w-full h-full overflow-hidden bg-stone-50 rounded-[115px_35px_115px_35px]">
                     {groomImg ? (
                        <img src={groomImg} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[4s] ease-out" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center italic text-stone-200 text-[10px] uppercase tracking-widest font-light font-body">Portrait Placeholder</div>
                     )}
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-[var(--boho-terracotta)] rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white font-accent text-2xl transition-transform group-hover:scale-110">
                     &
                  </div>
               </div>

               <div className="space-y-4 px-4 text-center">
                  <p className="font-accent text-5xl text-[var(--boho-terracotta)]">Mempelai Pria</p>
                  <h3 className="font-heading text-fluid-h3 text-stone-900 tracking-tight leading-none mb-4 ">
                     {d.groom_full_name || d.groom_name}
                  </h3>
                  <div className="w-8 h-px bg-[var(--boho-gold)]/30 mx-auto" />
                  <div className="space-y-3">
                     <p className="font-body text-[10px] tracking-[0.4em] text-stone-300 uppercase font-bold italic">Putra Tercinta Dari</p>
                     <div className="font-body text-lg md:text-xl text-stone-600 leading-tight font-light italic text-center w-full flex flex-col items-center gap-1">
                        {d.groom_parents?.split(/\s*(?:&|dan|Dan)\s*/).map((p, i, a) => (
                           <span key={i} className="block w-full text-center">
                              {p}{i < a.length - 1 && <span className="text-[var(--boho-gold)] ml-2 font-accent text-2xl md:text-3xl leading-none italic block mt-1">&</span>}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
