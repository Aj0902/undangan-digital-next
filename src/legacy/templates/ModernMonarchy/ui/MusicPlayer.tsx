'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  isPlaying: boolean;
  isVisible: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, isVisible, onToggle }: MusicPlayerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
          onClick={onToggle}
          className="fixed bottom-12 right-12 z-[90] flex items-center justify-center focus:outline-none mix-blend-difference group"
        >
          {/* Ultra Minimalist: Just a single line spanning that pulses */}
          <div className="relative w-12 h-[1px] bg-white/20 group-hover:bg-white/50 transition-colors duration-1000">
             {isPlaying && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" }}
                  className="absolute inset-0 bg-[#E5E4E2] origin-left shadow-[0_0_10px_rgba(229,228,226,0.3)]" // Platinum color
                />
             )}
          </div>
          
          <span className="absolute -top-6 right-0 font-mono text-[8px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/80 transition-colors duration-1000">
             {isPlaying ? 'Audio.On' : 'Audio.Off'}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
