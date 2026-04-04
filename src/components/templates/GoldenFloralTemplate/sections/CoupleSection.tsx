"use client";
import React from 'react';
import { getMedia } from '../utils';

export function CoupleSection({ data }: { data: any }) {
  const d = data.client_details;
  const media = data.client_media;

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        {/* Groom */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-64 h-80 rounded-t-full overflow-hidden border-8 border-white shadow-xl">
            <img src={getMedia(media, 'groom_photo')} className="w-full h-full object-cover" alt={d.groom_name} />
          </div>
          <h3 className="font-playfair text-4xl">{d.groom_full_name}</h3>
          <p className="font-montserrat text-xs tracking-widest text-[#D4AF37] font-bold uppercase">Putra Dari</p>
          <p className="font-playfair text-lg">{d.groom_parents}</p>
        </div>
        {/* Bride */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-64 h-80 rounded-t-full overflow-hidden border-8 border-white shadow-xl">
            <img src={getMedia(media, 'bride_photo')} className="w-full h-full object-cover" alt={d.bride_name} />
          </div>
          <h3 className="font-playfair text-4xl">{d.bride_full_name}</h3>
          <p className="font-montserrat text-xs tracking-widest text-[#D4AF37] font-bold uppercase">Putri Dari</p>
          <p className="font-playfair text-lg">{d.bride_parents}</p>
        </div>
      </div>
    </section>
  );
}
