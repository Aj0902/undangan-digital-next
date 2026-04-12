'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarPlus } from 'lucide-react';
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
      <div className="grid grid-cols-4 gap-4 w-full max-w-sm mt-16 p-8 bg-[#FDFBF7] shadow-lg rounded-3xl border border-[#D4A373]/20 relative overflow-hidden group">
         {/* Decorative paper background */}
         <div className="absolute inset-x-0 top-0 h-2 bg-[#D4A373]/10" />
         
         {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
            <span className="font-heading text-4xl text-stone-900 tracking-tighter leading-none italic">{value.toString().padStart(2, '0')}</span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#D4A373] font-bold mt-2">{unit}</span>
          </div>
        ))}
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
        className="w-full py-12 px-8 bg-white border border-stone-100 shadow-xl rounded-[40px] relative overflow-hidden group hover:border-[#D4A373]/30 transition-all duration-700"
      >
        <span className="absolute top-6 right-8 text-[8px] tracking-[0.5em] text-[#D4A373]/30 font-bold uppercase">{number}</span>
        
        <div className="flex flex-col items-center text-center space-y-6">
           <h3 className="font-heading text-4xl text-stone-900 leading-none lowercase italic">{title}</h3>
           
           <div className="w-12 h-px bg-[#D4A373]/20" />

           <div className="space-y-2">
              <p className="text-[10px] tracking-[0.3em] text-stone-400 font-bold uppercase italic">Waktu</p>
              <p className="font-heading text-2xl text-stone-900 font-light">{formatDate(date)}</p>
              <p className="font-mono text-[10px] text-[#D4A373] tracking-widest">{formatTime(date)} — Selesai</p>
           </div>
           
           <div className="space-y-2">
              <p className="text-[10px] tracking-[0.3em] text-stone-400 font-bold uppercase italic">Lokasi</p>
              <p className="font-heading text-xl text-stone-900 font-semibold lowercase italic">{venue}</p>
              <p className="text-xs text-stone-500 leading-relaxed font-light max-w-[250px] mx-auto italic">{address}</p>
           </div>

           <div className="pt-4 w-full">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(`${venue} ${address}`)}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#F7EFE1] text-[#D4A373] rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#D4A373] hover:text-white transition-all duration-500"
              >
                <MapPin size={12} />
                Buka Peta Digital
              </a>
           </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="text-center mb-20"
        >
           <span className="text-[10px] tracking-[0.4em] text-[#D4A373] uppercase font-bold mb-4 block italic">The Celebration</span>
           <h2 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter leading-none lowercase">Agenda Acara</h2>
           <div className="w-16 h-px bg-[#D4A373]/20 mx-auto mt-6" />
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <EventCard 
            title="Akad Nikah" 
            date={d.akad_datetime}
            venue={d.akad_venue_name}
            address={d.akad_venue_address}
            number="No. 01"
          />
          <EventCard 
            title="Resepsi" 
            date={d.resepsi_datetime}
            venue={d.resepsi_venue_name}
            address={d.resepsi_venue_address}
            number="No. 02"
          />
        </div>

        <CountdownTimer targetDate={d.akad_datetime || d.resepsi_datetime} />

        <div className="mt-20">
           <a 
             href={`https://calendar.google.com`}
             target="_blank"
             className="flex items-center gap-3 px-12 py-5 border-2 border-[#D4A373] text-[#D4A373] rounded-full text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-[#D4A373] hover:text-white transition-all duration-700"
           >
              <CalendarPlus size={14} />
              Simpan Tanggal
           </a>
        </div>
      </div>
    </section>
  );
}
