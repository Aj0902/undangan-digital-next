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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 p-4 bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl hover:scale-110 active:scale-95 transition-all focus:outline-none"
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
