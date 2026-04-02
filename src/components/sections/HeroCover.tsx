'use client';

import FadeIn from '@/components/ui/FadeIn';

export default function HeroCover() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center select-none overflow-hidden bg-cream px-6 py-12">
      
      {/* Background Geometris Tipis & Elegan */}
      <div className="absolute inset-0 bg-batik-pattern opacity-[0.10] pointer-events-none mix-blend-multiply" />
      
      {/* Teks Pengantar Tipis */}
      <FadeIn className="w-full relative flex flex-col items-center justify-center h-full max-w-lg mx-auto px-6">
        
        <p className="uppercase tracking-[0.4em] text-[0.6rem] sm:text-xs text-neutral-500 font-medium mb-16">
          The Wedding Celebration Of
        </p>
        
        {/* Tipografi Editorial Style Raksasa */}
        <div className="flex flex-col items-center w-full mb-16">
          <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl tracking-tighter text-primary leading-none font-light mb-4">
            ROMEO
          </h1>
          <span className="font-heading text-4xl sm:text-5xl text-neutral-400 italic font-light mb-4">
             &amp;
          </span>
          <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl tracking-tighter text-primary leading-none font-light">
            JULIET
          </h1>
        </div>
        
        {/* Garis Horizontal Tipis */}
        <div className="w-full max-w-xs border-t border-neutral-300 my-12" />

        <p className="font-body tracking-[0.3em] text-xs sm:text-sm text-neutral-500 uppercase">
          12 . 12 . 2026
        </p>

      </FadeIn>
    </section>
  );
}
