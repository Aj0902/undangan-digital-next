'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, CalendarPlus } from 'lucide-react';
import type { Client } from '@/types/client';

export default function EventSection({ data }: { data: Client }) {
  const { client_details: d } = data;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrnLeft = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yOrnRight = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date) + " WIB";
  };

  const CountdownTimer = ({ targetDate }: { targetDate: string | null }) => {
    const [timeLeft, setTimeLeft] = useState({ D: 0, H: 0, M: 0, S: 0 });

    useEffect(() => {
      if (!targetDate) return;
      const target = new Date(targetDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            D: Math.floor(difference / (1000 * 60 * 60 * 24)),
            H: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            M: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            S: Math.floor((difference % (1000 * 60)) / 1000),
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [targetDate]);

    if (!targetDate) return null;

    return (
      <div className="flex flex-col items-center mt-20 group">
         <div className="grid grid-cols-4 gap-4 md:gap-8 w-full max-w-sm p-10 bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] rounded-[50px] border border-stone-50 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D4A373]/30 to-transparent" />
            
            {Object.entries(timeLeft).map(([unit, value]) => (
             <div key={unit} className="flex flex-col items-center group-hover:scale-105 transition-transform duration-700">
               <span className="font-heading text-4xl md:text-5xl text-stone-900 tracking-tighter leading-none mb-1">{value.toString().padStart(2, '0')}</span>
               <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4A373] font-bold">{unit}</span>
             </div>
           ))}
         </div>
      </div>
    );
  };

   const EventCard = ({ title, date, venue, address, number }: any) => {
    if (!date && !venue) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full py-16 px-10 bg-white border border-stone-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[60px] relative overflow-hidden group hover:shadow-2xl hover:border-[#D4A373]/20 transition-all duration-1000"
      >
        <span className="absolute top-8 right-10 text-[9px] tracking-[0.6em] text-[#D4A373]/40 font-bold uppercase">{number}</span>
        
        <div className="flex flex-col items-center text-center space-y-8">
           <div className="space-y-2">
              <p className="font-accent text-4xl text-[#D4A373] mb-[-0.5rem] ">The Sacred</p>
              <h3 className="font-heading text-3xl md:text-4xl text-stone-900 leading-none  tracking-tighter">{title}</h3>
           </div>
           
           <div className="w-12 h-px bg-[#D4A373]/20" />

           <div className="space-y-3">
              <p className="text-[10px] tracking-[0.4em] text-stone-300 font-bold uppercase">When & Where</p>
              <p className="font-body text-xl text-stone-900 font-semibold">{formatDate(date)}</p>
              <div className="flex items-center justify-center gap-3">
                 <div className="h-px w-6 bg-stone-100" />
                 <p className="font-body text-sm text-[#D4A373] tracking-widest uppercase font-medium">{formatTime(date)} — Selesai</p>
                 <div className="h-px w-6 bg-stone-100" />
              </div>
           </div>
           
           <div className="space-y-2">
              <p className="font-heading text-lg text-stone-800 tracking-tight ">{venue}</p>
              <p className="text-xs text-stone-400 leading-relaxed font-light max-w-[220px] mx-auto italic">{address}</p>
           </div>

           <div className="pt-6 w-full">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(`${venue} ${address}`)}`}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full py-5 bg-[#FDFBF7] text-stone-800 border border-stone-100 rounded-full text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-700"
              >
                <MapPin size={14} className="opacity-40" />
                Lihat Lokasi
              </a>
           </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section ref={containerRef} className="relative w-full py-32 px-8 md:px-16 overflow-hidden">
      {/* Floating Parallax Ornaments - Accurate Placement */}
      <motion.img 
        src="/assets/rustic-boho/images/Or-kiri.svg"
        style={{ y: yOrnLeft, rotate: 180 }}
        className="absolute -left-32 bottom-20 w-80 md:w-[40rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kiri"
      />
      <motion.img 
        src="/assets/rustic-boho/images/Or-kanansvg.svg"
        style={{ y: yOrnRight, rotate: -45 }}
        className="absolute -right-32 top-10 w-80 md:w-[40rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kanan"
      />

       {/* Bridge Ornament to GiftSection */}
       <motion.img 
        src="/assets/rustic-boho/images/or-bawah-tengah.svg"
        style={{ y: yOrnLeft }}
        className="absolute -bottom-24 right-1/4 w-80 opacity-[0.15] pointer-events-none z-20 rotate-45"
        alt="Bridge Ornament"
      />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
           className="text-center mb-24"
        >
           <p className="font-accent text-4xl text-[#D4A373] mb-[-0.5rem]">Simpan Tanggal Untuk</p>
           <h2 className="font-heading text-fluid-h2 text-stone-900 tracking-tighter leading-none ">Agenda Acara</h2>
           <div className="w-12 h-px bg-[#D4A373]/30 mx-auto mt-8" />
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <EventCard 
            title="Akad Nikah" 
            date={d.akad_datetime}
            venue={d.akad_venue_name}
            address={d.akad_venue_address}
            number="01"
          />
          <EventCard 
            title="Perayaan Resepsi" 
            date={d.resepsi_datetime}
            venue={d.resepsi_venue_name}
            address={d.resepsi_venue_address}
            number="02"
          />
        </div>

        <CountdownTimer targetDate={d.akad_datetime || d.resepsi_datetime} />

        <div className="mt-20">
           <a 
             href={`https://calendar.google.com`}
             target="_blank"
             className="group flex items-center gap-4 px-16 py-6 bg-transparent border border-stone-200 text-stone-400 rounded-full text-[10px] uppercase font-bold tracking-[0.5em] hover:border-[#D4A373] hover:text-[#D4A373] transition-all duration-700"
           >
              <CalendarPlus size={16} className="group-hover:rotate-12 transition-transform" />
              Simpan ke Kalender
           </a>
        </div>
      </div>
    </section>
  );
}
