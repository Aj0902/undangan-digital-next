import React from 'react'
import type { Client } from '@/types/client'
import HeroSection from './HeroSection'
import StorySection from './StorySection'
import EventSection from './EventSection'

interface NeonVogueProps {
  data: Client
  guestName?: string
}

export default function NeonVogueTemplate({ data, guestName }: NeonVogueProps) {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-slate-200 overflow-x-hidden font-sans selection:bg-amber-500/30">
      {/* 
        Tema: Neon Vogue (Luxury Midnight)
        Palet: Hitam pekat, aksen Gold/Amber glowing, font tipis elegan bercampur sans-serif modern.
      */}
      
      <HeroSection data={data} guestName={guestName} />
      <StorySection data={data} />
      <EventSection data={data} />
      
      {/* Footer minimalis */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">
          Neon Vogue Edition • 2026
        </p>
      </footer>
    </div>
  )
}
