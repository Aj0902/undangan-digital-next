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
    <section className="relative w-full py-24 px-8 md:px-16 bg-[#FFE5D9] overflow-hidden rounded-[50px] shadow-sm z-10 -mt-8">
      
      <div className="text-center mb-16">
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="inline-block bg-white px-6 py-2 rounded-full border border-white shadow-sm mb-6"
         >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FFB5A7]">The Main Characters</span>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 max-w-5xl mx-auto">
        
        {/* Bride Character */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
           whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, damping: 12 }}
           className="flex flex-col items-center text-center relative"
        >
           {/* Oval Sticker Frame */}
           <div className="w-[260px] h-[340px] md:w-[300px] md:h-[400px] bg-white rounded-[100px] p-3 shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 relative">
              <div className="w-full h-full overflow-hidden rounded-[90px] bg-[#FCD5CE]">
                 {brideImg ? (
                   <img src={brideImg} alt="Bride" className="w-full h-full object-cover filter brightness-105 hover:scale-110 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center font-bold text-white text-[12px] uppercase tracking-widest">Bride</div>
                 )}
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFB5A7] text-white px-8 py-3 rounded-full border-2 border-white shadow-lg whitespace-nowrap">
                 <h3 className="font-heading text-3xl italic tracking-tight leading-none">
                    {d.bride_full_name || d.bride_name}
                 </h3>
              </div>
           </div>

           <div className="mt-12 bg-white/50 backdrop-blur-sm p-6 rounded-3xl w-full max-w-[280px]">
              <p className="text-[10px] tracking-[0.2em] text-stone-400 font-bold uppercase mb-2">Daughter of</p>
              <p className="font-heading text-xl text-[#4A4E69] font-medium leading-tight">
                 {d.bride_parents || 'The Parents'}
              </p>
           </div>
        </motion.div>

        {/* Floating Connector */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-[#F28482] rounded-full border-4 border-white shadow-xl items-center justify-center text-white"
        >
           <Heart fill="white" size={24} />
        </motion.div>

        {/* Groom Character */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
           whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, damping: 12 }}
           className="flex flex-col items-center text-center relative"
        >
           {/* Oval Sticker Frame */}
           <div className="w-[260px] h-[340px] md:w-[300px] md:h-[400px] bg-white rounded-[100px] p-3 shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10 relative">
              <div className="w-full h-full overflow-hidden rounded-[90px] bg-[#FCD5CE]">
                 {groomImg ? (
                   <img src={groomImg} alt="Groom" className="w-full h-full object-cover filter brightness-105 hover:scale-110 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center font-bold text-white text-[12px] uppercase tracking-widest">Groom</div>
                 )}
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFB5A7] text-white px-8 py-3 rounded-full border-2 border-white shadow-lg whitespace-nowrap">
                 <h3 className="font-heading text-3xl italic tracking-tight leading-none">
                    {d.groom_full_name || d.groom_name}
                 </h3>
              </div>
           </div>

           <div className="mt-12 bg-white/50 backdrop-blur-sm p-6 rounded-3xl w-full max-w-[280px]">
              <p className="text-[10px] tracking-[0.2em] text-stone-400 font-bold uppercase mb-2">Son of</p>
              <p className="font-heading text-xl text-[#4A4E69] font-medium leading-tight">
                 {d.groom_parents || 'The Parents'}
              </p>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
