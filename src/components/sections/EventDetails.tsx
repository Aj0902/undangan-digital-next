'use client';
import FadeIn from '@/components/ui/FadeIn';
import { MapPin, CalendarPlus } from 'lucide-react';

export default function EventDetails() {
  return (
    <section className="w-full py-24 px-8 bg-transparent flex flex-col items-center">
      <FadeIn className="text-center w-full mb-16 px-4">
        <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">The Celebration</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light">Rangkaian Acara</h2>
      </FadeIn>
      
      <FadeIn direction="up" className="w-full max-w-sm flex flex-col pt-8 border-t border-neutral-300 relative">
        {/* Elemen Dekoratif Garis Vertikal */}
        <div className="absolute left-[-2rem] top-0 bottom-0 w-[1px] bg-neutral-200 hidden sm:block" />
        <div className="absolute right-[-2rem] top-0 bottom-0 w-[1px] bg-neutral-200 hidden sm:block" />

        {/* Akad Nikah */}
        <div className="mb-12 text-center relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[10rem] text-neutral-300 opacity-[0.08] select-none pointer-events-none z-[-1]">
            I
          </span>
          <h3 className="font-heading text-3xl text-primary mb-4 italic">Akad Nikah</h3>
          <p className="text-[0.7rem] text-primary/80 mb-2 uppercase tracking-[0.25em] font-medium">Sabtu, 23 Mei 2026</p>
          <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] uppercase mb-4">08.00 WIB - Selesai</p>
          <p className="text-sm text-primary leading-loose font-light">
            Masjid Al-Irsyad<br/>
            <span className="text-[0.6rem] text-neutral-500 uppercase tracking-widest mt-1 block">Kota Baru Parahyangan, Padalarang<br/>Kabupaten Bandung Barat</span>
          </p>
        </div>

        <div className="w-full border-t border-neutral-200 mb-12" />

        {/* Resepsi */}
        <div className="mb-16 text-center relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[10rem] text-neutral-300 opacity-[0.08] select-none pointer-events-none z-[-1]">
            II
          </span>
          <h3 className="font-heading text-3xl text-primary mb-4 italic">Resepsi Pernikahan</h3>
          <p className="text-[0.7rem] text-primary/80 mb-2 uppercase tracking-[0.25em] font-medium">Sabtu, 23 Mei 2026</p>
          <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] uppercase mb-4">11.00 - 14.00 WIB</p>
          <p className="text-sm text-primary leading-loose font-light">
            Mason Pine Hotel (Grand Ballroom)<br/>
            <span className="text-[0.6rem] text-neutral-500 uppercase tracking-widest mt-1 block">Kota Baru Parahyangan, Padalarang<br/>Kabupaten Bandung Barat</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="text-center pt-8 border-t border-neutral-300 relative">
          <div className="flex flex-col gap-4">
            <a 
              href="https://calendar.google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-5 bg-black border border-black text-white tracking-[0.25em] text-[0.65rem] uppercase hover:bg-neutral-800 hover:tracking-[0.4em] transition-all duration-700 group"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              Simpan Tanggal
            </a>
            
            <a 
              href="https://maps.google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-5 bg-black border border-black text-white tracking-[0.25em] text-[0.65rem] uppercase hover:bg-neutral-800 hover:tracking-[0.4em] transition-all duration-700 group"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Buka Peta Arahan</span>
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
