'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface WelcomeOverlayProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export default function WelcomeOverlay({ onUnlock, isUnlocked }: WelcomeOverlayProps) {
  // Mencegah scroll saat terkunci
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
      // Mengatasi iOS Safari scroll
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isUnlocked]);

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-10px', filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream border-x-[12px] border-y-[12px] border-cream shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Ornamen Latar Pelindung */}
          <div className="absolute inset-0 bg-batik-pattern opacity-[0.2] pointer-events-none mix-blend-multiply" />
          
          <div className="absolute inset-4 border-[0.5px] border-gold/40 hairline-frame pointer-events-none z-0" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2 }}
            className="z-10 flex flex-col items-center text-center px-6"
          >
            <p className="uppercase tracking-[0.3em] text-[0.6rem] sm:text-[0.65rem] mb-6 text-primary/50 font-medium">
              You Are Invited To The Wedding Of
            </p>
            
            <h1 className="font-heading text-5xl sm:text-6xl text-primary font-light mb-4 drop-shadow-sm">
              Romeo & Juliet
            </h1>

            <div className="w-[60px] batik-divider my-6 opacity-60" />

            <p className="font-body font-light text-xs text-primary/70 mb-12">
              Kepada Yth. Bapak/Ibu/Saudara/i,
              <br />
              <span className="font-medium text-primary mt-2 block text-sm">Tamu Undangan</span>
            </p>

            <button 
              onClick={onUnlock}
              className="group relative px-10 py-4 overflow-hidden rounded-sm transition-all duration-500 ease-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 border border-gold/60 group-hover:bg-gold/5 transition-colors duration-500" />
              <span className="relative z-10 text-primary uppercase text-[0.65rem] tracking-[0.35em] font-medium group-hover:tracking-[0.45em] group-hover:text-gold transition-all duration-500">
                Buka Undangan
              </span>
              
              {/* Efek kilau menyapu (Sweep glow) */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-gold/20 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
