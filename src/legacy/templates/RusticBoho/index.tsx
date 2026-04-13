"use client";

import React, { useState, useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Client } from "../../../types/client";
import { getMedia } from "../../../types/client";
import OpeningCover from "./sections/OpeningCover";
import HeroSection from "./sections/HeroCover";
import EpicCallingSection from "./sections/EpicCallingSection";
import IntroSection from "./sections/Prologue";
import CoupleSection from "./sections/CoupleDetails";
import EventSection from "./sections/EventSummary";
import GiftSection from "./sections/GiftAndRsvp";
import RsvpSection from "./sections/Guestbook";
import Closing from "./sections/Closing";
import MusicPlayer from "./ui/MusicPlayer";

export default function RusticBohoTemplate({
  data,
  guestName,
}: {
  data: Client;
  guestName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { client_media: media } = data;
  const musicUrl = getMedia(media, "music");

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const handleOpen = () => {
    setIsOpen(true);
    if (musicUrl && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio play blocked:", err));
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
    <main className="min-h-screen bg-[#FDFBF7] text-stone-800 font-body selection:bg-[#D4A373] selection:text-white overflow-hidden relative">
      {/* Self-contained Premium Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Pinyon+Script&display=swap');
        
        :root {
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Lora', serif;
          --font-accent: 'Pinyon Script', cursive;
        }

        .font-heading { font-family: var(--font-heading) !important; }
        .font-body { font-family: var(--font-body) !important; }
        .font-accent { font-family: var(--font-accent) !important; }
        
        /* Advanced Typography Utilities */
        .text-fluid-h1 { font-size: clamp(2.5rem, 8vw, 5rem); }
        .text-fluid-h2 { font-size: clamp(2rem, 6vw, 4rem); }
        .text-fluid-h3 { font-size: clamp(1.5rem, 4vw, 3rem); }

        /* Custom Scrollbar for Guestbook */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 163, 115, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 163, 115, 0.4);
        }
      `,
        }}
      />

      {/* Global Seamless Background Texture */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 pointer-events-none opacity-[0.25] z-0 bg-[url('/assets/rustic-boho/images/Bg-elegant.png')] bg-cover bg-center" 
      />

      {/* Premium Texture Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[9999] bg-[url('https://www.transparenttextures.com/patterns/dust.png')]" />

      {/* 
        Opening Overlay (Digital Envelope Style)
      */}
      <Suspense fallback={null}>
        <OpeningCover data={data} isOpen={isOpen} onOpen={handleOpen} />
      </Suspense>

      {/* 
        Floating Music Control
      */}
      <MusicPlayer
        isPlaying={isPlaying}
        isVisible={isOpen}
        onToggle={toggleMusic}
      />

      {/* 
        Main Content Container
      */}
      <div
        className={`transition-opacity duration-1000 ${isOpen ? "opacity-100 h-auto" : "opacity-0 h-screen overflow-hidden"}`}
      >
        <HeroSection data={data} />
        <EpicCallingSection data={data} />
        <IntroSection data={data} />
        <CoupleSection data={data} />
        <EventSection data={data} />
        <GiftSection data={data} />
        <RsvpSection data={data} />
        <Closing data={data} />
      </div>

      {musicUrl && <audio ref={audioRef} src={musicUrl} loop preload="auto" />}
    </main>
  );
}
