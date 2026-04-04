'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import { Heart } from 'lucide-react';

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
          id="opening-cover"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-[#F7EFE1] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Decorative Illustration */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-64 h-64 border-r-4 border-t-4 border-[#D4A373]/30 rounded-tr-[100px]" />
             <div className="absolute bottom-0 left-0 w-64 h-64 border-l-4 border-b-4 border-[#D4A373]/30 rounded-bl-[100px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
             {/* Circular Floral Frame */}
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.5 }}
               className="w-48 h-48 md:w-64 md:h-64 mb-12 rounded-full border-2 border-[#D4A373]/20 p-2 relative"
             >
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-200">
                   {coverUrl ? (
                      <img src={coverUrl} alt="Opening Visual" className="w-full h-full object-cover sepia-[0.3]" />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center italic text-stone-400">Rustic Portrait</div>
                   )}
                </div>
                {/* Micro Icon */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#D4A373] text-white p-2 rounded-full shadow-lg">
                   <Heart size={16} fill="white" />
                </div>
             </motion.div>

             <motion.p
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
               className="text-[10px] uppercase tracking-[0.4em] text-stone-500 mb-6 font-semibold"
             >
               With Love In Our Hearts
             </motion.p>

             <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="font-heading text-6xl md:text-8xl text-stone-900 tracking-tighter leading-none mb-4 lowercase"
             >
               {d.bride_name} <span className="font-light text-[#D4A373]">&amp;</span> {d.groom_name}
             </motion.h1>

             <motion.div
               initial={{ opacity: 0, scaleX: 0 }}
               animate={{ opacity: 1, scaleX: 1 }}
               transition={{ delay: 1.2, duration: 1 }}
               className="w-24 h-px bg-[#D4A373] mb-12"
             />

             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5 }}
               className="mb-16"
             >
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-2 italic">Dedicated To</p>
                <h2 className="font-heading text-4xl text-stone-900 tracking-tight">{guestName}</h2>
             </motion.div>

             <motion.button
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               transition={{ delay: 2 }}
               onClick={onOpen}
               className="px-12 py-5 bg-[#D4A373] text-white text-[10px] uppercase font-bold tracking-[0.4em] rounded-full shadow-xl hover:bg-[#BC8A5F] transition-all"
             >
               Buka Undangan
             </motion.button>
          </div>

          <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
             <span className="font-mono text-[8px] uppercase tracking-[1em] text-stone-400">Rustic Collection MMXXVI</span>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
