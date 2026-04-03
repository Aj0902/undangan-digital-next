/**
 * @file src/components/templates/ClassicElegant/index.tsx
 * @description Template "Classic Elegant" — placeholder sementara.
 *
 * File ini akan di-refactor di Phase 4 untuk menerima semua komponen
 * sections yang sudah di-props-ify (HeroCover, EventDetails, dll).
 *
 * Saat ini rendernya minimal agar routing [slug] dapat berjalan dan
 * ditest tanpa komponen yang belum di-refactor.
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import CoupleSection from './sections/CoupleSection';
import EventSection from './sections/EventSection';
import GiftSection from './sections/GiftSection';
import RsvpSection from './sections/RsvpSection';
import OpeningCover from './sections/OpeningCover';
import MusicPlayer from './sections/MusicPlayer';

interface ClassicElegantTemplateProps {
  data: Client;
}

export default function ClassicElegantTemplate({ data }: ClassicElegantTemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { client_media: media } = data;
  const musicUrl = getMedia(media, 'music');

  // Handle opening the invitation
  const handleOpen = () => {
    setIsOpen(true);
    if (musicUrl && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      setIsPlaying(true);
    }
  };

  // Toggle music manually
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
    <main 
      className="min-h-screen bg-cream selection:bg-gold/30 selection:text-primary transition-colors duration-500 overflow-x-hidden"
      style={{
        // Override local variables to match user's "Classic Elegant" identity
        // @ts-ignore
        '--bg-cream': '#F9F9F9',
        '--text-primary': '#333333',
        '--accent-gold': '#D4AF37',
      } as React.CSSProperties}
    >
      {/* 
        Opening Cover (Interstisial) 
      */}
      <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />

      {/* 
        Floating Music Player 
      */}
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} isVisible={isOpen} />

      {/* 
        Main Invitation Content 
      */}
      <div className={isOpen ? "opacity-100" : "opacity-0 h-screen overflow-hidden transition-opacity duration-1000"}>
        {/* ... (rest of components) */}
        <HeroSection data={data} />
        <IntroSection data={data} />
        <CoupleSection data={data} />
        <EventSection data={data} />
        <GiftSection data={data} />
        <RsvpSection data={data} />

        <footer className="py-24 text-center bg-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url(/assets/template-classic/paper-texture.png)] bg-cover" />
          
          <div className="relative z-10 space-y-6">
            <p className="font-body text-[10px] uppercase tracking-[0.6em] text-gold/60">Arigato Gozaimasu</p>
            <h2 className="font-heading text-4xl text-primary font-light mb-4">
               {data.client_details.bride_name} <span className="text-gold italic">&amp;</span> {data.client_details.groom_name}
            </h2>
            <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 mt-12">
              Created with Love by Aj0902
            </p>
          </div>
        </footer>
      </div>

      {musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      )}
    </main>
  );
}
