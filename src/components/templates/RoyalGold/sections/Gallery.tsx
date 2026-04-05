"use client";

import React from 'react';
import { RevealText, FadeIn } from '../ui/Animations';

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto">
      <RevealText el="h2" className="text-center font-cinzel text-6xl mb-32 italic text-stone-800">Gallery</RevealText>
      <div className="columns-1 md:columns-3 gap-8 space-y-8">
        {images.map((src, idx) => (
          <FadeIn key={idx} delay={idx * 0.1} className="relative overflow-hidden group shadow-xl">
            <img src={src} className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Gallery" />
            <div className="absolute inset-0 border-[15px] border-white/20 group-hover:border-white/10 transition-all" />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
