// ✂️ ========================================================
// 📂 FILE TUJUAN: TemplateGoldenFloral.tsx (Main Component)
// ⚠️ KETERANGAN: Client Component Utama (Modular Version)
// ========================================================
"use client";
import React, { useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Cover } from './sections/Cover';
import { GoldenDust } from './sections/VFX';
import { IntroSection } from './sections/IntroSection';
import { CoupleSection } from './sections/CoupleSection';
import { EventSection } from './sections/EventSection';
import { ClosingSection } from './sections/ClosingSection';
import { getMedia } from './utils';

export default function TemplateGoldenFloral({ data, guestName }: { data: any, guestName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const media = data.client_media;

  const { scrollYProgress } = useScroll();
  const bgParallaxSlow = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#2C2621] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;600&family=Great+Vibes&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-vibes { font-family: 'Great Vibes', cursive; }
      `}</style>

      {/* Cover Interstisial */}
      <Cover 
        data={data} 
        guestName={guestName} 
        isOpen={isOpen} 
        onOpen={() => setIsOpen(true)} 
      />

      {isOpen && (
        <main className="relative z-10">
          <GoldenDust />
          
          {/* Static Parallax Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <motion.div 
              style={{ y: bgParallaxSlow, backgroundImage: `url(${getMedia(media, 'hero_image')})` }} 
              className="absolute inset-[-25%] bg-cover bg-center opacity-[0.15] blur-[1px]" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/80 via-transparent to-[#FDFBF7]/80" />
          </div>

          {/* Modular Sections */}
          <IntroSection data={data} />
          <CoupleSection data={data} />
          <EventSection data={data} />
          <ClosingSection data={data} />
        </main>
      )}
    </div>
  );
}