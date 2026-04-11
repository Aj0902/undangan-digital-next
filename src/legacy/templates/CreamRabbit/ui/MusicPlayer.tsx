'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] px-6 py-4 bg-white/80 backdrop-blur-md text-[#FFB5A7] rounded-full shadow-lg border-2 border-[#FFB5A7]/30 flex items-center justify-center gap-3 focus:outline-none"
        >
          {isPlaying ? (
            <>
              <Volume2 size={24} className="animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest hidden md:block">Playing Music</span>
            </>
          ) : (
            <>
              <VolumeX size={24} />
              <span className="text-[10px] uppercase font-bold tracking-widest hidden md:block">Music Paused</span>
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
