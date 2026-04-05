"use client";

import React from 'react';
import { RevealText, FadeIn, MotionDiv } from '../ui/Animations';

interface EpicCallingProps {
  epicImageUrl: string;
}

const EpicCalling = ({ epicImageUrl }: EpicCallingProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-24 relative bg-white">
      <div className="absolute inset-0 marble-texture pointer-events-none" />
      <MotionDiv className="mb-16">
        <div className="w-64 h-96 md:w-80 md:h-[30rem] border-[1px] border-[#B89F5D] p-3 shadow-2xl bg-white relative">
           <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#B89F5D]" />
           <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#B89F5D]" />
           <img src={epicImageUrl} className="w-full h-full object-cover grayscale" alt="The Wedding Of" />
        </div>
      </MotionDiv>
      <div className="max-w-3xl relative z-10">
        <RevealText el="p" className="font-montserrat text-xs tracking-[0.5em] text-[#B89F5D] uppercase mb-8">The Wedding Celebration</RevealText>
        <RevealText el="h2" delay={0.2} className="font-cinzel text-5xl md:text-7xl mb-12 text-stone-800 leading-tight">Merajut Janji <br/> Dalam Cinta Abadi</RevealText>
        <FadeIn delay={0.4}>
          <p className="font-bodoni italic text-2xl md:text-3xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu."
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default EpicCalling;
