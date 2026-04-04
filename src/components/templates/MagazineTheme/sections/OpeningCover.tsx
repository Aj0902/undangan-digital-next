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
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -100,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-stone-100 flex flex-col md:flex-row overflow-hidden"
        >
          {/* Magazine Cover Left: Big Visual with Masthead */}
          <div className="w-full md:w-7/12 h-2/3 md:h-full relative overflow-hidden bg-stone-200">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={coverUrl || "/assets/MagazineTheme/images/cover.jpg"} 
                alt="Magazine Cover" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
              <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
            </motion.div>

            {/* Masthead Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none">
              <div className="flex justify-between items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="font-heading text-4xl md:text-6xl text-white mix-blend-difference tracking-tighter uppercase leading-none">
                    Eternity
                  </span>
                  <div className="h-px w-full bg-white/30 mt-2" />
                  <span className="text-[10px] tracking-[0.4em] text-white/70 uppercase font-light">Magazine</span>
                </motion.div>
                
                <div className="text-right text-white/50 text-[10px] tracking-[0.2em] uppercase font-light">
                  Est. 2026<br/>The Wedding Issue
                </div>
              </div>

              <div className="flex flex-col gap-1 text-white/80">
                <span className="text-[10px] tracking-[0.5em] uppercase font-light">Price: Priceless</span>
                <span className="text-[10px] tracking-[0.5em] uppercase font-light italic">Vol. 01 — Special Edition</span>
              </div>
            </div>
          </div>

          {/* Magazine Cover Right: Typography & Invited Guest */}
          <div className="w-full md:w-5/12 h-1/3 md:h-full bg-white flex flex-col justify-center px-8 md:px-16 border-t md:border-t-0 md:border-l border-stone-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center text-center max-w-sm mx-auto"
            >
              <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-medium mb-12">Exclusive Invitation</span>
              
              <h1 className="font-heading text-6xl md:text-7xl text-stone-900 tracking-tighter leading-[0.8] uppercase mb-8">
                {d.bride_name} <br/> <span className="text-stone-300">&amp;</span> <br/> {d.groom_name}
              </h1>

              <div className="w-12 h-px bg-stone-900 mb-8" />

              <div className="mb-12">
                <p className="text-[10px] tracking-[0.3em] text-stone-500 uppercase font-light italic mb-4 text-center">Specially Invited to</p>
                <h2 className="font-heading text-3xl text-stone-900 tracking-tight">{guestName}</h2>
              </div>

              <button 
                onClick={onOpen}
                className="w-full py-6 group relative border border-stone-900 text-stone-900 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-stone-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-bold group-hover:text-white transition-colors duration-500">
                  Enter The Story
                </span>
              </button>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
