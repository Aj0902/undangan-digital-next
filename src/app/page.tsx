'use client';

import { useState } from "react";
import HeroCover from "@/components/sections/HeroCover";
import CoupleInfo from "@/components/sections/CoupleInfo";
import EventDetails from "@/components/sections/EventDetails";
import GalleryView from "@/components/sections/GalleryView";
import GiftBox from "@/components/sections/GiftBox";
import RsvpSection from "@/components/sections/RsvpSection";
import GuestbookView from "@/components/sections/GuestbookView";
import WelcomeOverlay from "@/components/ui/WelcomeOverlay";
import AudioPlayer from "@/components/ui/AudioPlayer";
import PrologueSection from "@/components/sections/PrologueSection";
import ColophonSection from "@/components/sections/ColophonSection";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="w-full min-h-screen bg-cream flex justify-center overflow-hidden">
      
      <WelcomeOverlay isUnlocked={isUnlocked} onUnlock={() => setIsUnlocked(true)} />
      <AudioPlayer isUnlocked={isUnlocked} />

      {/* Container Lebar: Layout akan terbelah eksklusif di Desktop, bersatu di HP */}
      <div className={`w-full flex flex-col lg:flex-row transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* =======================================================
            PANEL KIRI (TERKUNCI DI DESKTOP - UNTUK FOTO/GRAPHIC)
            ======================================================= */}
        <div className="hidden lg:block lg:w-1/2 lg:h-screen lg:sticky top-0 relative overflow-hidden bg-stone-200">
          {/* Ini adalah tempat khusus menaruh foto Cover Pre-wedding Full screen */}
          {/* Sementara pakai gradient lembut jika belum ada foto */}
          <div className="absolute inset-0 bg-neutral-200 object-cover" />
          
          <div className="absolute bottom-12 left-12 mix-blend-difference text-white/50 text-xs tracking-[0.3em] font-light uppercase">
             Vol. I — The Beginning
          </div>
        </div>

        {/* =======================================================
            PANEL KANAN (UNDANGAN UTAMA YANG BISA DI-SCROLL)
            ======================================================= */}
        <main className="w-full lg:w-1/2 min-h-screen bg-transparent relative overflow-x-hidden flex-shrink-0">
          <HeroCover />
          <PrologueSection />
          <CoupleInfo />
          <EventDetails />
          <GalleryView />
          <GiftBox />
          <RsvpSection />
          <GuestbookView />
          <ColophonSection />
        </main>
      </div>
    </div>
  );
}
