'use client';

import React, { useState, useRef, Suspense } from "react";
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from "./sections/HeroCover"; // Reusing HeroCover as HeroSection
import CoupleSection from "./sections/CoupleInfo"; // Reusing CoupleInfo as CoupleSection
import EventSection from "./sections/EventDetails"; // Reusing EventDetails as EventSection
import GiftSection from "./sections/GiftBox"; // Reusing GiftBox as GiftSection
import RsvpSection from "./sections/RsvpSection";
import IntroSection from "./sections/PrologueSection"; // Reusing PrologueSection as IntroSection
import Closing from "./sections/ColophonSection"; // Reusing ColophonSection as Closing
import OpeningCover from "./sections/OpeningCover"; // New component required
import EpicCallingSection from "./sections/EpicCallingSection"; // New component required
import MusicPlayer from "./ui/MusicPlayer"; // New component required

export default function MagazineTheme({ data, guestName }: { data: Client; guestName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { client_details: details, client_media: media } = data;
  const musicUrl = getMedia(media, 'music');
  const coverUrl = getMedia(media, 'cover');

  // Parallax Setup for the Left Panel (Editorial Magazine Style)
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4]);

  const handleOpen = () => {
    setIsOpen(true);
    if (musicUrl && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 selection:bg-black selection:text-white font-sans overflow-x-hidden">
      
      {/* 
        Opening Cover (Interstisial majalah) 
      */}
      <Suspense fallback={null}>
        <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />
      </Suspense>
      
      {/* 
        Music Control (Brutalist Mini) 
      */}
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} isVisible={isOpen} />

      {/* 
        Main Page Layout (Split Screen on Desktop)
      */}
      <div className={`w-full flex flex-col lg:flex-row transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* PANEL KIRI: Fixed Image Display (Editorial Visual) */}
        <div className="hidden lg:block lg:w-1/2 lg:h-screen lg:sticky top-0 relative overflow-hidden bg-stone-200 border-r border-stone-200">
          <motion.div 
            style={{ scale, opacity }}
            className="absolute inset-0 origin-center" 
          >
             <img 
               src={coverUrl || "/assets/MagazineTheme/images/cover.jpg"} 
               alt="Editorial Cover Visual" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
          </motion.div>
          
          <div className="absolute bottom-12 left-12 mix-blend-difference text-white/80 text-[10px] tracking-[0.4em] font-light uppercase z-10 flex flex-col gap-2 italic">
             <span>Volume 01 — Feature Story</span>
             <span className="opacity-50 font-heading text-lg tracking-normal not-italic">{details.bride_name} & {details.groom_name}</span>
          </div>
        </div>

        {/* PANEL KANAN: Scrollable Content (Editorial Text) */}
        <main className="w-full lg:w-1/2 min-h-screen relative flex-shrink-0 bg-stone-50">
          <HeroSection data={data} />
          <EpicCallingSection data={data} />
          <IntroSection data={data} />
          <CoupleSection data={data} />
          <EventSection data={data} />
          <GiftSection data={data} />
          <RsvpSection data={data} />
          <Closing data={data} />
        </main>
      </div>

      {musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      )}
    </div>
  );
}
