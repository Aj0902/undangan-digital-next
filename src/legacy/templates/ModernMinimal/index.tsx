'use client';

import React, { useState, useRef } from 'react';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import OpeningCover from './sections/OpeningCover';
import HeroCover from './sections/HeroCover';
import EpicCalling from './sections/EpicCalling';
import Prologue from './sections/Prologue';
import CoupleDetails from './sections/CoupleDetails';
import EventSummary from './sections/EventSummary';
import Gallery from './sections/Gallery';
import GiftAndRsvp from './sections/GiftAndRsvp';
import Closing from './sections/Closing';
import MusicPlayer from './sections/MusicPlayer';

export default function ModernMinimalTemplate({ data, guestName }: { data: Client; guestName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { client_details: details, client_media: media } = data;
  const musicUrl = getMedia(media, 'music');

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
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />
      
      <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} isVisible={isOpen} />

      <div className={isOpen ? "opacity-100" : "opacity-0 h-screen overflow-hidden transition-opacity duration-1000"}>
        <HeroCover details={details} coverUrl={getMedia(media, 'cover')} />
        <EpicCalling data={data} />
        <Prologue details={details} />
        <CoupleDetails details={details} media={media} />
        <EventSummary details={details} />
        {/* <Gallery media={media} /> - Gallery omitted per requirement for now but kept in logic if added back */}
        <GiftAndRsvp data={data} />
        <Closing details={details} />
      </div>

      {musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      )}
    </main>
  );
}
