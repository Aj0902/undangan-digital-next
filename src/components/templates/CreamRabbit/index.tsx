'use client';

import React, { useState, useRef, Suspense } from 'react';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import OpeningCover from './sections/OpeningCover';
import HeroSection from './sections/HeroCover';
import EpicCallingSection from './sections/EpicCallingSection';
import IntroSection from './sections/Prologue';
import CoupleSection from './sections/CoupleDetails';
import EventSection from './sections/CountdownCard';
import GiftSection from './sections/GiftAndRsvp';
import RsvpSection from './sections/Guestbook';
import Closing from './sections/Closing';
import MusicPlayer from './ui/MusicPlayer';

export default function CreamRabbitTemplate({ data, guestName }: { data: Client; guestName?: string }) {
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
    <main className="min-h-screen bg-[#FFF5F5] text-stone-800 font-body selection:bg-[#FFB5A7] selection:text-white overflow-hidden">
      
      {/* 
        Opening Overlay (Storybook Cover)
      */}
      <Suspense fallback={null}>
        <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />
      </Suspense>

      {/* 
        Floating Music Control (Bouncy Pill)
      */}
      <MusicPlayer isPlaying={isPlaying} isVisible={isOpen} onToggle={toggleMusic} />

      {/* 
        Main Content Container
      */}
      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-screen overflow-hidden'}`}>
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
