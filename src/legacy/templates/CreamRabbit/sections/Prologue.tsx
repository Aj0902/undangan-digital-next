'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function IntroSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  if (!d.prologue_text) return null;

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF5F5] py-32 px-8 md:px-24">
      
      {/* Decorative Background Bubbles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE5D9] rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-[#FFB5A7] rounded-full blur-3xl opacity-30" />

      <div className="max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, scale: 0, y: 50 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, damping: 12 }}
           className="relative"
        >
          {/* Chat Bubble Style Container */}
          <div className="bg-white p-12 md:p-16 rounded-[40px] md:rounded-[60px] shadow-xl border-4 border-[#FFE5D9] relative before:content-[''] before:absolute before:-bottom-8 before:left-1/2 before:-translate-x-1/2 before:border-[16px] before:border-transparent before:border-t-white before:drop-shadow-md z-10">
             
             {/* Quote Marks */}
             <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#FFB5A7] text-white rounded-full flex items-center justify-center font-heading text-6xl italic leading-none shadow-md border-4 border-white rotate-12">
                "
             </div>

             <div className="font-heading text-2xl md:text-4xl text-[#4A4E69] leading-relaxed text-balance">
                {d.prologue_text}
             </div>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ repeat: Infinity, duration: 2 }} 
               className="w-4 h-4 bg-[#F28482] rounded-full mb-2"
             />
             <motion.div 
               animate={{ scale: [1, 1.3, 1] }} 
               transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} 
               className="w-3 h-3 bg-[#F28482]/60 rounded-full mb-2"
             />
             <motion.div 
               animate={{ scale: [1, 1.4, 1] }} 
               transition={{ repeat: Infinity, duration: 2, delay: 0.4 }} 
               className="w-2 h-2 bg-[#F28482]/30 rounded-full"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
