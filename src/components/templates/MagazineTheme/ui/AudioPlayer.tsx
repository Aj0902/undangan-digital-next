'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Pause } from 'lucide-react';

interface AudioPlayerProps {
  isUnlocked: boolean;
  audioSrc?: string;
}

export default function AudioPlayer({ isUnlocked, audioSrc = '/assets/MagazineTheme/music/sample.mp3' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay ditolak browser. User harus play manual.", err);
          setIsPlaying(false);
        });
    }
  }, [isUnlocked]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent backdrop-blur-md border border-neutral-300 shadow-sm text-primary hover:scale-110 hover:bg-neutral-100 transition-all duration-300 group"
            aria-label="Toggle music"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 opacity-70" />
            ) : (
              <Disc3 className="w-4 h-4 opacity-70 group-hover:animate-spin-slow" />
            )}
            {isPlaying && (
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-neutral-400"
              />
            )}
          </button>
        </motion.div>
      )}
    </>
  );
}
