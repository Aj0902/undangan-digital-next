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
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="fixed bottom-8 left-8 z-[90] w-14 h-14 bg-stone-900 text-white rounded-md shadow-2xl flex items-center justify-center focus:outline-none mix-blend-exclusion hover:bg-rose-600 transition-colors duration-500"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // Hexagon shape for edgy feel
          }}
        >
          {isPlaying ? (
            <Volume2 size={20} className="animate-pulse" />
          ) : (
            <VolumeX size={20} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
