"use client";

import React from 'react';
import { RevealText, FadeIn } from '../ui/Animations';

interface CoupleProps {
  groomName: string;
  brideName: string;
  groomParents: string | null;
  brideParents: string | null;
  groomPhoto: string;
  bridePhoto: string;
}

const Couple = ({ groomName, brideName, groomParents, brideParents, groomPhoto, bridePhoto }: CoupleProps) => {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-32">
        <RevealText el="h3" className="font-cinzel text-xl tracking-widest text-[#B89F5D] italic mb-6">Assalamu’alaikum Warahmatullahi Wabarakatuh</RevealText>
        <FadeIn delay={0.2}>
          <p className="font-bodoni text-2xl text-stone-500 italic max-w-2xl mx-auto">
            Atas izin Allah SWT, kami bermaksud mengundang Anda untuk hadir pada pernikahan kami:
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-2 gap-24 md:gap-40 items-center">
        {/* Groom */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <FadeIn x={-50} className="w-full max-w-md aspect-[4/5] overflow-hidden border-[15px] border-white shadow-2xl mb-12 relative group">
            <div className="absolute inset-0 border border-[#B89F5D]/20 group-hover:scale-95 transition-transform duration-1000" />
            <img src={groomPhoto} className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 transition-all" alt={groomName} />
          </FadeIn>
          <RevealText el="h3" delay={0.2} className="font-cinzel text-4xl text-[#B89F5D] mb-4 tracking-tighter text-shadow-sm">{groomName}</RevealText>
          <RevealText el="p" delay={0.4} className="font-bodoni text-xl text-stone-400 italic mb-3">Putra dari</RevealText>
          <RevealText el="p" delay={0.6} className="font-cinzel text-sm tracking-widest text-stone-800 font-bold uppercase">{groomParents || "-"}</RevealText>
        </div>

        {/* Bride */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:mt-48">
          <FadeIn x={50} className="w-full max-w-md aspect-[4/5] overflow-hidden border-[15px] border-white shadow-2xl mb-12 relative group">
            <div className="absolute inset-0 border border-[#B89F5D]/20 group-hover:scale-95 transition-transform duration-1000" />
            <img src={bridePhoto} className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 transition-all" alt={brideName} />
          </FadeIn>
          <RevealText el="h3" delay={0.2} className="font-cinzel text-4xl text-[#B89F5D] mb-4 tracking-tighter text-shadow-sm">{brideName}</RevealText>
          <RevealText el="p" delay={0.4} className="font-bodoni text-xl text-stone-400 italic mb-3">Putri dari</RevealText>
          <RevealText el="p" delay={0.6} className="font-cinzel text-sm tracking-widest text-stone-800 font-bold uppercase">{brideParents || "-"}</RevealText>
        </div>
      </div>
    </section>
  );
};

export default Couple;
