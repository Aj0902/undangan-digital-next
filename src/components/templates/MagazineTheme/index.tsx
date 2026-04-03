'use client';

import { useState } from "react";
import HeroCover from "./sections/HeroCover";
import CoupleInfo from "./sections/CoupleInfo";
import EventDetails from "./sections/EventDetails";
import GalleryView from "./sections/GalleryView";
import GiftBox from "./sections/GiftBox";
import RsvpSection from "./sections/RsvpSection";
import GuestbookView from "./sections/GuestbookView";
import WelcomeOverlay from "./ui/WelcomeOverlay";
import AudioPlayer from "./ui/AudioPlayer";
import PrologueSection from "./sections/PrologueSection";
import ColophonSection from "./sections/ColophonSection";
import CountdownTimer from "./sections/CountdownTimer";
import InteractiveBackground from "./ui/InteractiveBackground";
import Image from "next/image";

import { motion, useScroll, useTransform } from 'framer-motion';

// UUID klien Siti & Zaed dari seed data
const SITI_ZAED_CLIENT_ID = 'a1b2c3d4-0000-0000-0000-000000000001';

export default function MagazineTheme() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Parallax Setup for the Left Panel
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4]);

  return (
    <div className="w-full min-h-screen bg-transparent flex justify-center overflow-hidden">
      
      <WelcomeOverlay isUnlocked={isUnlocked} onUnlock={() => setIsUnlocked(true)} />
      <AudioPlayer isUnlocked={isUnlocked} />
      <InteractiveBackground />

      {/* Container Lebar: Layout akan terbelah eksklusif di Desktop, bersatu di HP */}
      <div className={`w-full flex flex-col lg:flex-row transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* =======================================================
            PANEL KIRI (TERKUNCI DI DESKTOP - UNTUK FOTO/GRAPHIC)
            ======================================================= */}
        <div className="hidden lg:block lg:w-1/2 lg:h-screen lg:sticky top-0 relative overflow-hidden bg-stone-200">
          
          <motion.div 
            style={{ scale, opacity }}
            className="absolute inset-0 origin-center" 
          >
             <Image 
               src="/assets/MagazineTheme/images/cover.jpg" 
               alt="Pre-wedding Cover" 
               fill
               className="object-cover"
               priority
             />
             <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply" />
          </motion.div>
          
          <div className="absolute bottom-12 left-12 mix-blend-difference text-white/70 text-xs tracking-[0.3em] font-light uppercase z-10 flex flex-col gap-2">
             <span>Vol. I — The Beginning</span>
             <span className="opacity-50">Siti & Zaed</span>
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
          <CountdownTimer targetDate="2026-05-23T08:00:00+07:00" />
          <GalleryView />
          <GiftBox />
          <RsvpSection clientId={SITI_ZAED_CLIENT_ID} />
          <GuestbookView clientId={SITI_ZAED_CLIENT_ID} />
          <ColophonSection />
        </main>
      </div>
    </div>
  );
}
