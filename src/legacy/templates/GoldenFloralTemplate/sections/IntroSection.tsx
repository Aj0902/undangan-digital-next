"use client";
import React from 'react';
import { RevealText } from './Wrappers';
import { getMedia } from '../utils';

export function IntroSection({ data }: { data: any }) {
  const d = data.client_details;
  const media = data.client_media;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-32 px-6">
      <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-10">
        <img src={getMedia(media, 'hero_image')} className="w-full h-full object-cover" alt="Hero" />
      </div>
      <RevealText el="h2" className="font-playfair text-5xl md:text-7xl text-center mb-4">{d.groom_name} & {d.bride_name}</RevealText>
      <div className="h-[1px] w-24 bg-[#D4AF37] mb-6" />
      <RevealText className="font-playfair italic text-xl text-center max-w-lg opacity-70">"{d.prologue_text}"</RevealText>
    </section>
  );
}
