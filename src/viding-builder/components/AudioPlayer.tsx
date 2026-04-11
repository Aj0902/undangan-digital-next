"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  url: string;
  autoPlay?: boolean;
  isInvitationOpened?: boolean;
}

export function AudioPlayer({ url, autoPlay = false, isInvitationOpened = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Handle Initial Play when invitation is opened
  useEffect(() => {
    if (isInvitationOpened && audioRef.current && !isPlaying) {
      audioRef.current.play().catch(err => console.log("Autoplay blocked or failed:", err));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(true);
    }
  }, [isInvitationOpened]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!url) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[60]">
      <audio ref={audioRef} src={url} loop />
      
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl border transition-all ${
          isPlaying 
            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" 
            : "bg-black/40 border-white/10 text-white/40"
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Music size={20} />
          </motion.div>
        ) : (
          <Music2 size={20} />
        )}

        {/* Dynamic Equalizer Animation when playing */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 flex gap-0.5 items-end h-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.5 + i * 0.2, repeat: Infinity }}
                className="w-0.5 bg-emerald-400 rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
}
