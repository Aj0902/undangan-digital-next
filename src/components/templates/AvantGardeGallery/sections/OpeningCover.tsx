'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import type { Client } from '@/types/client';

interface OpeningCoverProps {
  data: Client;
  isOpen: boolean;
  onOpen: () => void;
}

export default function OpeningCover({ data, isOpen, onOpen }: OpeningCoverProps) {
  const { client_details: d } = data;
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Guest';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          id="opening-cover"
          className="fixed inset-0 z-[100] bg-stone-50 flex items-center justify-center overflow-hidden"
          // We don't animate the whole container exiting, we will split it!
          exit={{ opacity: 0, transition: { duration: 1.5, delay: 1 } }}
        >
          {/* Top Half Split */}
          <motion.div 
            exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute top-0 inset-x-0 h-1/2 bg-white"
          />
          {/* Bottom Half Split */}
          <motion.div 
            exit={{ y: '100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-white flex flex-col justify-end pb-12"
          >
             <div className="text-center px-8 z-10 w-full mb-8">
               <motion.button
                 exit={{ opacity: 0, transition: { duration: 0.3 } }}
                 onClick={onOpen}
                 className="group relative inline-flex items-center justify-center px-10 py-4 font-mono text-[10px] tracking-[0.3em] uppercase text-stone-900 border border-stone-900 overflow-hidden hover:text-white transition-colors duration-500"
               >
                 <span className="absolute inset-0 w-full h-full bg-rose-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1] z-0" />
                 <span className="relative z-10 font-bold">Enter Exhibition</span>
               </motion.button>
             </div>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center text-center px-8 w-full max-w-2xl pointer-events-none">
             
             <motion.div
               exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
               className="mb-12"
             >
                <p className="font-mono text-[8px] uppercase tracking-[0.5em] text-stone-400 mb-8 border-b border-stone-200 pb-4 inline-block">
                  Private View
                </p>
                <h1 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter leading-none mix-blend-difference lowercase">
                  {d.bride_name} <span className="text-stone-300 italic font-light mx-2">&amp;</span> {d.groom_name}
                </h1>
             </motion.div>

             {/* Chaotic Splatter Accent */}
             <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.5 } }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full h-2 bg-rose-600 mb-12 origin-left"
             />

             <motion.div
               exit={{ opacity: 0, transition: { duration: 0.5 } }}
               className="text-left w-full border-l px-4 border-stone-900"
             >
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-2">Exhibiting For</p>
                <h2 className="font-body text-xl md:text-2xl font-light text-stone-900 tracking-tight">{guestName}</h2>
             </motion.div>
          </div>

          {/* Exhibition Date Vertical */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 origin-center hidden md:block">
             <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-stone-300">
                Opening MMXXVI
             </span>
          </div>

        </motion.section>
      )}
    </AnimatePresence>
  );
}
