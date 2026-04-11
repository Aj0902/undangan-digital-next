'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  isVisible: boolean;
}

export default function MusicPlayer({ isPlaying, onToggle, isVisible }: MusicPlayerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          className="fixed bottom-8 right-8 z-[90]"
        >
          <button
            onClick={onToggle}
            className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-2xl border border-gold/20 focus:outline-none group"
          >
            {/* Spinning Ornament */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold/30 p-1"
            />
            
            {/* Center Icon */}
            <div className="relative z-10 text-gold transition-transform group-hover:scale-110">
              {isPlaying ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <Pause size={20} />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <Music size={20} />
                </motion.div>
              )}
            </div>

            {/* Pulsating Ring (only when playing) */}
            {isPlaying && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-gold/20 -z-10"
              />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
