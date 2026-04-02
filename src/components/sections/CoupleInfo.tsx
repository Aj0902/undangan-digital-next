'use client';
import FadeIn from '@/components/ui/FadeIn';
import Image from 'next/image';

export default function CoupleInfo() {
  return (
    <section className="w-full py-24 px-8 bg-transparent flex flex-col items-center relative z-10">
      <FadeIn className="text-center w-full mb-20">
        <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-6 uppercase block font-medium">Sang Mempelai</span>
      </FadeIn>
      
      <div className="w-full max-w-lg flex flex-col gap-24">
        {/* Mempelai Pria */}
        <FadeIn direction="up" className="relative">
          {/* Elemen Latar Tipografi Massif */}
          <span className="absolute -top-12 -left-12 font-heading text-[12rem] leading-none text-neutral-300 opacity-[0.10] select-none pointer-events-none z-[-1]">
             I
          </span>
          
          <div className="w-full aspect-[3/4] mb-10 relative overflow-hidden border border-neutral-300 p-2">
             <div className="absolute inset-2 bg-neutral-200">
               <Image src="/images/cover.jpg" alt="Romeo" fill className="object-cover grayscale mix-blend-multiply opacity-80 hover:scale-105 transition-transform duration-1000" />
             </div>
          </div>
          
          <div className="text-center w-full mx-auto px-4 relative">
            {/* Garis vertikal dekoratif di sisi kanan & kiri teks */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-neutral-300 hidden sm:block" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-neutral-300 hidden sm:block" />
            
            <h3 className="font-heading text-5xl sm:text-6xl text-primary mb-4 font-light">Romeo Sagara</h3>
            <p className="text-xs text-neutral-500 mb-6 leading-loose tracking-[0.2em] uppercase font-medium">Putra Utama dari <br/> <span className="text-primary/90">Bpk. [Nama Ayah] &amp; Ibu [Nama Ibu]</span></p>
            <a href="#" className="inline-block border-b border-neutral-300 pb-1 text-[0.65rem] text-primary/60 italic tracking-widest hover:text-primary transition-colors">
              @romeosagara
            </a>
          </div>
        </FadeIn>

        {/* Pemisah Simbolis */}
        <FadeIn direction="none" delay={0.2} className="flex items-center justify-center gap-6 opacity-60 my-8 relative">
          <div className="w-24 border-t border-neutral-300"></div>
          <span className="font-heading text-4xl text-neutral-400 italic font-light">&amp;</span>
          <div className="w-24 border-t border-neutral-300"></div>
        </FadeIn>

        {/* Mempelai Wanita */}
        <FadeIn direction="up" className="relative">
          {/* Elemen Latar Tipografi Massif */}
          <span className="absolute -top-12 -right-12 font-heading text-[12rem] leading-none text-neutral-300 opacity-[0.10] select-none pointer-events-none z-[-1]">
             II
          </span>

          <div className="w-full aspect-[3/4] mb-10 relative overflow-hidden border border-neutral-300 p-2">
             <div className="absolute inset-2 bg-neutral-200">
               <Image src="/images/cover.jpg" alt="Juliet" fill className="object-cover grayscale mix-blend-multiply opacity-80 hover:scale-105 transition-transform duration-1000" />
             </div>
          </div>
          
          <div className="text-center w-full mx-auto px-4 relative">
             {/* Garis vertikal dekoratif di sisi kanan & kiri teks */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-neutral-300 hidden sm:block" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-neutral-300 hidden sm:block" />
            
            <h3 className="font-heading text-5xl sm:text-6xl text-primary mb-4 font-light">Juliet Kinanti</h3>
            <p className="text-xs text-neutral-500 mb-6 leading-loose tracking-[0.2em] uppercase font-medium">Putri Bungsu dari <br/> <span className="text-primary/90">Bpk. [Nama Ayah] &amp; Ibu [Nama Ibu]</span></p>
            <a href="#" className="inline-block border-b border-neutral-300 pb-1 text-[0.65rem] text-primary/60 italic tracking-widest hover:text-primary transition-colors">
              @julietkinanti
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
