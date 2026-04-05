"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealText, FadeIn } from '../ui/Animations';

interface HeroGateProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  groomName: string;
  brideName: string;
  guestName?: string;
  coverUrl: string;
}

const HeroGate = ({ isOpen, setIsOpen, setIsPlaying, groomName, brideName, guestName, coverUrl }: HeroGateProps) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div 
          exit={{ y: '-100%', transition: { duration: 1.5, ease: [0.85, 0, 0.15, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-100 overflow-hidden"
        >
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: `url('${coverUrl}')` }}
          />
          <div className="relative z-10 text-center px-6">
            <RevealText el="p" delay={0.2} className="font-montserrat text-[10px] tracking-[0.8em] text-stone-500 uppercase mb-8">The Union of Two Souls</RevealText>
            <RevealText el="h1" delay={0.4} className="text-6xl md:text-9xl font-cinzel text-stone-900 mb-12 tracking-tighter italic text-shadow-sm">
              {groomName} & {brideName}
            </RevealText>
            {guestName && (
              <FadeIn delay={0.6}>
                <p className="font-montserrat text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-8">
                  Dear, {guestName}
                </p>
              </FadeIn>
            )}
            <div className="gold-divider w-40 mx-auto mb-12" />
            <FadeIn delay={0.8}>
              <button 
                onClick={() => { setIsOpen(true); setIsPlaying(true); }}
                className="px-14 py-5 bg-white shadow-xl text-stone-900 font-montserrat text-[10px] tracking-[0.4em] uppercase hover:bg-stone-900 hover:text-white transition-all duration-700 rounded-sm"
              >
                Buka Undangan
              </button>
            </FadeIn>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroGate;
