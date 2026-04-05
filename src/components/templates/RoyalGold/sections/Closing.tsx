"use client";

import React from 'react';
import { Heart, Camera } from 'lucide-react';
import { RevealText, FadeIn } from '../ui/Animations';

interface ClosingProps {
  groomName: string;
  brideName: string;
}

const Closing = ({ groomName, brideName }: ClosingProps) => {
  return (
    <footer className="py-60 bg-white text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 marble-texture opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <FadeIn><Heart className="mx-auto mb-16 text-[#B89F5D] opacity-60" size={56} /></FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-bodoni italic text-3xl md:text-5xl leading-relaxed mb-32 text-stone-600 px-6 drop-shadow-sm">
            "Terima kasih telah menjadi bagian dari saksi sejarah cinta kami. Doa restu Anda adalah anugerah terindah bagi kami."
          </p>
        </FadeIn>
        
        <div className="space-y-12 mb-40">
          <RevealText el="p" className="font-montserrat text-[10px] tracking-[1.5em] uppercase opacity-40 text-stone-900">Kami yang berbahagia,</RevealText>
          <RevealText el="h3" className="text-8xl md:text-[12rem] font-cinzel italic tracking-tighter leading-none text-stone-800">
            {groomName} & {brideName}
          </RevealText>
        </div>

        <div className="pt-24 border-t border-stone-100 flex flex-col items-center gap-8">
          <p className="font-montserrat text-[10px] tracking-[1em] opacity-30 uppercase text-stone-900">Official Hashtag</p>
          <div className="flex items-center gap-6 text-[#B89F5D] font-cinzel text-2xl tracking-[0.2em]">
            <Camera size={28} /> #{groomName.toUpperCase()}{brideName.toUpperCase()}FOREVER
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Closing;
