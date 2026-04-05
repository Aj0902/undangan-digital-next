"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import { FadeIn } from '../ui/Animations';

const Prolog = () => {
  return (
    <section className="py-40 bg-stone-50 border-y border-stone-100 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn><Sparkles className="mx-auto text-[#B89F5D] mb-12 opacity-50" size={32} /></FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-bodoni italic text-3xl md:text-5xl text-stone-600 leading-snug mb-12 drop-shadow-sm px-4">
            "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          </p>
        </FadeIn>
        <div className="gold-divider w-20 mx-auto mb-8" />
        <FadeIn delay={0.4}>
          <p className="font-montserrat text-[11px] tracking-[0.4em] text-[#B89F5D] uppercase font-bold">QS. Ar-Rum : 21</p>
        </FadeIn>
      </div>
    </section>
  );
};

export default Prolog;
