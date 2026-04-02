'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Pause } from 'lucide-react';

interface AudioPlayerProps {
  isUnlocked: boolean;
  audioSrc?: string;
}

export default function AudioPlayer({ isUnlocked, audioSrc = '/music/wedding-song.mp3' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play otomatis saat undangan dibuka (jika diizinkan browser)
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
      {/* Audio Element Hidden */}
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        loop 
        preload="auto"
      />

      {/* Floating Button (Muncul setelah unlock) */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-cream/80 backdrop-blur-md border border-gold/30 shadow-[0_4px_20px_rgba(197,160,89,0.15)] text-gold hover:scale-110 hover:bg-cream transition-all duration-300 group"
            aria-label="Toggle music"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 opacity-80" />
            ) : (
              <Disc3 className="w-5 h-5 opacity-80 group-hover:animate-spin-slow" />
            )}
            
            {/* Animasi gelombang kecil jika sedang play */}
            {isPlaying && (
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-gold/40"
              />
            )}
          </button>
        </motion.div>
      )}
    </>
  );
}
