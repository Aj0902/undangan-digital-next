import React from 'react'
import type { Client, ClientMedia } from '@/types/client'

export default function HeroSection({ data, guestName }: { data: Client, guestName?: string }) {
  const { bride_name, groom_name } = data.client_details
  
  // Ambil gambar cover, fallback ke unsplash
  const coverObj = data.client_media?.find((m: ClientMedia) => m.media_key === 'cover')
  const bgImage = coverObj?.cloudinary_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc'

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Magazine/Neon blend mode */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 z-10" />
        <img 
          src={bgImage} 
          alt="Wedding Cover" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        {/* Neon glow effect behind image */}
        <div className="absolute inset-0 bg-amber-500/20 blur-[120px] mix-blend-screen z-10" />
      </div>

      <div className="relative z-20 w-full px-6 flex flex-col items-center justify-center text-center">
        {/* Glowing Top Text */}
        <p className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]">
          The Wedding Celebration
        </p>

        {/* Huge Magazine Headline Typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter mix-blend-overlay uppercase leading-none drop-shadow-2xl">
          {bride_name} <br/> <span className="text-amber-400">&amp;</span> <br/> {groom_name}
        </h1>

        {guestName && (
          <div className="mt-16 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.15)] inline-block">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2">Dear Guest,</p>
            <p className="text-xl md:text-2xl font-serif text-amber-50">{guestName}</p>
          </div>
        )}
      </div>

      {/* Decorative lines */}
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent z-10 hidden md:block" />
      <div className="absolute right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent z-10 hidden md:block" />
    </section>
  )
}
