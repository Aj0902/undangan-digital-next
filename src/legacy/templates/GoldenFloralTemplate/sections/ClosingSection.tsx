"use client";
import React from 'react';
import { Heart } from 'lucide-react';

export function ClosingSection({ data }: { data: any }) {
  const d = data.client_details;

  return (
    <footer className="py-40 flex flex-col items-center text-center px-6">
      <Heart className="text-[#D4AF37] mb-10 animate-pulse" size={40} />
      <p className="font-playfair text-2xl italic max-w-2xl mb-20 opacity-80">
        "Kehadiran dan doa restu Anda adalah pelengkap kebahagiaan kami."
      </p>
      <p className="font-montserrat text-[10px] tracking-[0.8em] text-[#D4AF37] uppercase mb-4">
        Kami Yang Berbahagia,
      </p>
      <h3 className="font-vibes text-8xl text-[#2C2621]">
        {d.groom_name} & {d.bride_name}
      </h3>
    </footer>
  );
}
