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

export default function AvantGardeGalleryTemplate({ data }: { data: Client }) {
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
    <main className="min-h-screen bg-stone-50 text-stone-900 font-body selection:bg-rose-600 selection:text-white overflow-hidden relative">
      
      {/* Noise Texture for Canvas feel */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/15/Monochrome_noise_0.png')] bg-repeat mix-blend-multiply" />

      {/* 
        Opening Overlay (The Gallery Door)
      */}
      <Suspense fallback={null}>
        <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />
      </Suspense>

      {/* 
        Music Control (Ink Splash)
      */}
      <MusicPlayer isPlaying={isPlaying} isVisible={isOpen} onToggle={toggleMusic} />

      {/* 
        Main Content Container
      */}
      <div className={`relative z-10 transition-opacity duration-[2000ms] ease-out ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-screen overflow-hidden'}`}>
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
