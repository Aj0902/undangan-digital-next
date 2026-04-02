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
      
      <FadeIn direction="up" className="w-full max-w-sm flex flex-col pt-8 border-t border-neutral-300">

        {/* Akad Nikah */}
        <div className="mb-12 text-center">
          <h3 className="font-heading text-3xl text-primary mb-4 italic">Akad Nikah</h3>
          <p className="text-[0.7rem] text-primary/80 mb-2 uppercase tracking-[0.25em] font-medium">Minggu, 12 Desember 2026</p>
          <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] uppercase">08:00 WIB - Selesai</p>
        </div>

        <div className="w-full border-t border-neutral-200 mb-12" />

        {/* Resepsi */}
        <div className="mb-16 text-center">
          <h3 className="font-heading text-3xl text-primary mb-4 italic">Resepsi</h3>
          <p className="text-[0.7rem] text-primary/80 mb-2 uppercase tracking-[0.25em] font-medium">Minggu, 12 Desember 2026</p>
          <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] uppercase">11:00 WIB - 14:00 WIB</p>
        </div>

        {/* Lokasi */}
        <div className="text-center pt-8 border-t border-neutral-300">
          <p className="text-[0.6rem] font-medium text-neutral-400 mb-5 uppercase tracking-[0.4em]">Lokasi Penyelenggaraan</p>
          <p className="text-sm text-primary leading-loose font-light mb-12">
            Hotel Mulia Senayan<br/>
            <span className="text-xs text-neutral-500">Jl. Asia Afrika, Gelora, Jakarta Pusat</span>
          </p>
          
          <div className="flex flex-col gap-4">
            <a 
              href="https://calendar.google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-transparent border border-primary text-primary tracking-[0.25em] text-[0.65rem] uppercase hover:bg-primary hover:text-white transition-colors duration-500 group"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              Simpan Tanggal
            </a>
            
            <a 
              href="https://maps.google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary border border-primary text-white tracking-[0.25em] text-[0.65rem] uppercase hover:bg-primary/90 transition-colors duration-500 group"
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
