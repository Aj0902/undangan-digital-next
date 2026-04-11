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
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-[90] p-4 bg-[#D4A373] text-white rounded-full shadow-xl hover:bg-[#BC8A5F] transition-all focus:outline-none"
        >
          {isPlaying ? (
            <Volume2 size={24} className="animate-pulse" />
          ) : (
            <VolumeX size={24} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
