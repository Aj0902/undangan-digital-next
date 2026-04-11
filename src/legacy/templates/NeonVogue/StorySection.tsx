import React from 'react'
import type { Client } from '@/types/client'

export default function StorySection({ data }: { data: Client }) {
  const { 
    prologue_text, 
    bride_full_name, groom_full_name, 
    bride_parents, groom_parents,
    bride_name, groom_name
  } = data.client_details

  const prologue = prologue_text || 'Di antara tanda-tanda kebesaran-Nya, diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu mendapat ketenangan hati...'

  return (
    <section className="py-32 px-6 md:px-12 xl:px-24 relative bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] border-t border-white/5">
      {/* Ticker Animation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-5 pb-8 pt-8">
        <h2 className="text-8xl font-black uppercase text-white animate-[spin_60s_linear_infinite] [animation-direction:reverse]"> 
          {" // NOIR ELEGANCE // LUXURY WEDDING // MIDNIGHT LOVE".repeat(10)} 
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-12">
        {/* Prologue Block */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="w-12 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          <h3 className="text-3xl md:text-5xl font-serif text-amber-50">
            The Beginning <br />
            <span className="italic text-white/40">of Us.</span>
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-white/60 font-light">
            {prologue}
          </p>
        </div>

        {/* The Couple Details */}
        <div className="space-y-16 order-1 lg:order-2 border-l border-white/10 pl-8 lg:pl-16 relative">
           {/* Glow decoration */}
           <div className="absolute -left-px top-1/4 h-1/2 w-[2px] bg-gradient-to-b from-transparent via-amber-500 to-transparent shadow-[0_0_15px_rgba(245,158,11,1)]" />

           <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-500">The Bride</p>
             <h4 className="text-4xl font-extrabold uppercase tracking-tight">{bride_full_name || bride_name}</h4>
             <p className="text-sm text-white/50 italic">Putri dari {bride_parents || 'Keluarga Bpk. & Ibu'}</p>
           </div>
           
           <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-500">The Groom</p>
             <h4 className="text-4xl font-extrabold uppercase tracking-tight">{groom_full_name || groom_name}</h4>
             <p className="text-sm text-white/50 italic">Putra dari {groom_parents || 'Keluarga Bpk. & Ibu'}</p>
           </div>
        </div>
      </div>
    </section>
  )
}
