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
  const guestName = searchParams.get('to') || 'Honored Guest';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          id="opening-cover"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Platinum Glow in Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5E4E2] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />

          {/* Grid Hairlines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0 left-12 w-px bg-white/5" />
            <div className="absolute top-0 bottom-0 right-12 w-px bg-white/5" />
            <div className="absolute top-12 left-0 right-0 h-px bg-white/5" />
            <div className="absolute bottom-12 left-0 right-0 h-px bg-white/5" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-12 w-full max-w-sm">
             
             {/* The Royal Seal (Monogram) */}
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="mb-16 border border-[#E5E4E2]/20 p-8 relative flex items-center justify-center w-32 h-32"
             >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E5E4E2]/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E5E4E2]/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E5E4E2]/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E5E4E2]/50" />
                
                <h1 className="font-heading text-5xl text-[#E5E4E2] tracking-tighter leading-none">
                  {d.bride_name.charAt(0)}
                  <span className="font-body text-2xl font-light opacity-50 mx-1">&amp;</span>
                  {d.groom_name.charAt(0)}
                </h1>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="w-full text-center border-t border-[#E5E4E2]/20 pt-8"
             >
                <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-4">Requesting the honor of</p>
                <h2 className="font-heading text-2xl text-stone-200 tracking-tight">{guestName}</h2>
             </motion.div>

             <motion.button
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 2, delay: 1 }}
               onClick={onOpen}
               className="mt-16 relative overflow-hidden group px-12 py-5"
             >
               <span className="absolute inset-0 border border-[#E5E4E2]/20 group-hover:border-[#E5E4E2]/60 transition-colors duration-1000" />
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E5E4E2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               
               <span className="relative z-10 font-mono text-[8px] uppercase tracking-[0.5em] text-stone-400 group-hover:text-stone-100 transition-colors duration-1000">Enter</span>
             </motion.button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
