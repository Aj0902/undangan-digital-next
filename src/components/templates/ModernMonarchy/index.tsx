'use client';

import React, { useState, useRef, Suspense } from 'react';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import OpeningCover from './sections/OpeningCover';
import HeroSection from './sections/HeroSection';
import EpicCallingSection from './sections/EpicCallingSection';
import IntroSection from './sections/IntroSection';
import CoupleSection from './sections/CoupleSection';
import EventSection from './sections/EventSection';
import GiftSection from './sections/GiftSection';
import RsvpSection from './sections/RsvpSection';
import Closing from './sections/Closing';
import MusicPlayer from './ui/MusicPlayer';

export default function ModernMonarchyTemplate({ data }: { data: Client }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { client_media: media } = data;
  const musicUrl = getMedia(media, 'music');

  const handleOpen = () => {
    setIsOpen(true);
    if (musicUrl && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio play blocked:", err));
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
    <main className="min-h-screen bg-[#0A0A0A] text-stone-200 font-body selection:bg-stone-800 selection:text-white overflow-hidden relative">
      
      {/* 
        Opening Overlay (The Royal Seal)
      */}
      <Suspense fallback={null}>
        <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />
      </Suspense>

      {/* 
        Music Control (Single Hairline)
      */}
      <MusicPlayer isPlaying={isPlaying} isVisible={isOpen} onToggle={toggleMusic} />

      {/* 
        Main Content Container (Monumental Fade)
      */}
      <div className={`relative z-10 transition-opacity duration-[2500ms] ease-[0.25,1,0.5,1] ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-screen overflow-hidden'}`}>
        <HeroSection data={data} />
        <EpicCallingSection data={data} />
        <IntroSection data={data} />
        <CoupleSection data={data} />
        <EventSection data={data} />
        <GiftSection data={data} />
        <RsvpSection data={data} />
        <Closing data={data} />
      </div>

      {musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      )}
    </main>
  );
}
