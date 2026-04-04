'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Client } from '@/types/client';

export default function EventSection({ data }: { data: Client }) {
  const { client_details: d } = data;

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

  const CountdownAbstract = ({ targetDate }: { targetDate: string | null }) => {
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
      <div className="w-full max-w-2xl mx-auto flex flex-wrap justify-between gap-4 mt-24 relative p-8 border border-stone-200 bg-stone-50 overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-stone-900 rounded-full blur-[60px] opacity-10" />
         
         <div className="w-full mb-4 flex items-center justify-between border-b border-stone-200 pb-2 z-10 relative">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-400">Duration until opening</span>
            <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
         </div>

         {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-start min-w-[60px] md:min-w-[100px] z-10 relative">
            <span className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter leading-none mix-blend-multiply">{value.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest text-rose-600 font-bold mt-2">{unit}</span>
          </div>
        ))}
        
        {/* Chaotic Line Decor */}
        <motion.div 
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
           className="absolute bottom-4 left-0 w-full h-[2px] bg-rose-600 mix-blend-multiply" 
        />
      </div>
    );
  };

  const EventCard = ({ title, date, venue, address, number }: any) => {
    if (!date && !venue) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full p-8 md:p-12 bg-white border border-stone-200 shadow-sm relative group text-left"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-stone-900 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.76,0,0.24,1]" />
        
        <div className="flex justify-between items-start mb-12">
           <h3 className="font-heading text-4xl text-stone-900 leading-none lowercase tracking-tighter">{title}</h3>
           <span className="font-mono text-[10px] uppercase tracking-widest text-stone-300">Phase {number}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="space-y-1 border-l-2 border-stone-100 pl-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-2">Time</p>
              <p className="font-body text-base text-stone-900 font-light">{formatDate(date)}</p>
              <p className="font-bold text-sm text-stone-900">{formatTime(date)}</p>
           </div>
           
           <div className="space-y-1 border-l-2 border-stone-100 pl-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-400 mb-2">Location</p>
              <p className="font-body text-base text-stone-900 font-bold uppercase">{venue}</p>
              <p className="text-xs text-stone-500 leading-relaxed font-light">{address}</p>
           </div>
        </div>

        <a 
          href={`https://maps.google.com/?q=${encodeURIComponent(`${venue} ${address}`)}`}
          target="_blank"
          className="inline-flex items-center gap-2 group-hover:text-rose-600 transition-colors"
        >
          <MapPin size={14} className="opacity-50" />
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-bold border-b border-stone-900 hover:border-rose-600">Navigate to Gallery</span>
        </a>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-stone-100 overflow-hidden border-t border-stone-200">
      
      {/* Editorial Decorative Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[15rem] md:text-[25rem] text-stone-900/5 select-none pointer-events-none z-0">
         AGENDA
      </div>

      <div className="max-w-6xl mx-auto flex flex-col relative z-10">
        
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="mb-16 border-l-4 border-stone-900 pl-6"
        >
           <span className="text-[8px] font-mono tracking-[0.4em] text-stone-500 uppercase block mb-4">Exhibition Schedule</span>
           <h2 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter leading-none lowercase">
              The Agenda
           </h2>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <EventCard 
            title="Akad Nikah" 
            date={d.akad_datetime}
            venue={d.akad_venue_name}
            address={d.akad_venue_address}
            number="01"
          />
          <EventCard 
            title="Resepsi" 
            date={d.resepsi_datetime}
            venue={d.resepsi_venue_name}
            address={d.resepsi_venue_address}
            number="02"
          />
        </div>

        <CountdownAbstract targetDate={d.akad_datetime || d.resepsi_datetime} />

      </div>
    </section>
  );
}
