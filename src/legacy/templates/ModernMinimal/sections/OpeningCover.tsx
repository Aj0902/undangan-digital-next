'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

interface OpeningCoverProps {
  data: Client;
  isOpen: boolean;
  onOpen: () => void;
}

export default function OpeningCover({ data, isOpen, onOpen }: OpeningCoverProps) {
  const { client_details: d, client_media: media } = data;
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  
  const coverUrl = getMedia(media, 'cover');

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } }}
          className="fixed inset-0 z-[100] grid grid-cols-1 md:grid-cols-2 bg-[#F9F9F9] overflow-hidden"
        >
          {/* Left / Top Side: Image with Brutalist Border */}
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-[50vh] md:h-full border-b md:border-b-0 md:border-r border-slate-900 overflow-hidden relative"
          >
            {coverUrl ? (
               <img src={coverUrl} alt="Cover" className="w-full h-full object-cover grayscale opacity-90" />
            ) : (
               <div className="w-full h-full bg-slate-200 flex items-center justify-center font-sans tracking-widest text-slate-400 uppercase text-xs">
                 MISSING COVER
               </div>
            )}
            <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
          </motion.div>

          {/* Right / Bottom Side: Typography */}
          <div className="w-full h-[50vh] md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 border-l border-white bg-white">
            <div className="mb-auto mt-8 md:mt-12 flex justify-between items-start">
               <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-slate-800">Reservation</span>
               <span className="font-sans text-[10px] uppercase gap-1 flex items-center tracking-[0.2em] font-semibold text-slate-500">
                  NO. 001
               </span>
            </div>

            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.3 }}
            >
               <h1 className="font-sans font-black text-6xl md:text-8xl tracking-tighter text-slate-900 leading-[0.9] uppercase break-words mb-4">
                 {d.bride_name} <br/>
                 <span className="text-slate-300">&</span> <br/>
                 {d.groom_name}
               </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8 border-t border-slate-200 pt-6"
            >
               <p className="font-sans text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500 mb-2">Ditujukan untuk</p>
               <h3 className="font-sans text-2xl font-semibold text-slate-900 tracking-tight">{guestName}</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-auto mb-8 md:mb-12"
            >
               <button 
                 onClick={onOpen}
                 className="relative w-full border border-slate-900 py-6 overflow-hidden group bg-transparent text-slate-900"
               >
                 <div className="absolute inset-0 bg-slate-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.85,0,0.15,1]" />
                 <span className="relative z-10 font-sans text-xs font-bold uppercase tracking-[0.4em] group-hover:text-white transition-colors duration-500 block">Buka Undangan</span>
               </button>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
