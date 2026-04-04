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
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[#FFF5F5] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Playful Bubbles Background */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
             <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 w-32 h-32 bg-[#FFB5A7]/30 rounded-full blur-2xl" />
             <motion.div animate={{ y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-20 right-10 w-48 h-48 bg-[#FCD5CE]/50 rounded-full blur-3xl" />
             <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#FFE5D9]/40 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
             
             {/* Storybook Cloud Frame */}
             <motion.div
               initial={{ scale: 0, rotate: -10 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
               className="w-48 h-48 md:w-56 md:h-56 mb-10 p-2 bg-white rounded-[40%] shadow-lg shadow-[#FFB5A7]/20 border-4 border-[#FFB5A7]/30 relative"
             >
                <div className="w-full h-full overflow-hidden rounded-[38%] bg-[#FFE5D9]">
                   {coverUrl ? (
                      <img src={coverUrl} alt="Opening Visual" className="w-full h-full object-cover origin-center" />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-[#FFB5A7] text-[10px] uppercase tracking-widest">
                         Photo Here
                      </div>
                   )}
                </div>
                {/* Floating Heart Sticker */}
                <motion.div 
                  initial={{ rotate: -15 }}
                  animate={{ rotate: 15 }}
                  transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
                  className="absolute -top-4 -right-2 bg-white p-3 rounded-full shadow-md text-[#FFB5A7]"
                >
                   <Heart size={20} fill="#FFB5A7" />
                </motion.div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, type: 'spring' }}
               className="bg-white px-6 py-2 rounded-full shadow-sm mb-6 inline-block border border-[#FCD5CE]"
             >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFB5A7] font-bold">You are invited!</span>
             </motion.div>

             <motion.h1
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
               className="font-heading text-6xl md:text-7xl text-[#4A4E69] tracking-tighter leading-none mb-4 lowercase"
             >
               {d.bride_name} <span className="text-[#FFB5A7]">&</span> {d.groom_name}
             </motion.h1>

             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="w-full my-8 flex flex-col items-center bg-white/50 p-6 rounded-3xl backdrop-blur-sm border border-white"
             >
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 font-bold">Hello,</p>
                <h2 className="font-heading text-4xl text-[#4A4E69] tracking-tight">{guestName}</h2>
             </motion.div>

             <motion.button
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               whileHover={{ scale: 1.05, rotate: -2 }}
               whileTap={{ scale: 0.95, rotate: 2 }}
               transition={{ type: "spring", stiffness: 400, damping: 10, delay: 1.2 }}
               onClick={onOpen}
               className="w-full py-5 bg-[#FFB5A7] text-white text-[12px] uppercase font-bold tracking-[0.3em] rounded-full shadow-[0_8px_0_#FCD5CE] border-2 border-white hover:bg-[#F28482] transition-colors"
             >
               Buka Undangan
             </motion.button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
