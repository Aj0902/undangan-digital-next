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
      <div className="grid grid-cols-4 gap-4 w-full max-w-sm mt-12 bg-white p-6 shadow-sm border border-stone-100">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="font-heading text-3xl text-stone-900 tracking-tighter leading-none">{value.toString().padStart(2, '0')}</span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-stone-400 font-bold mt-2">{unit}</span>
          </div>
        ))}
      </div>
    );
  };

  const EventCard = ({ title, date, venue, address, number }: any) => {
    if (!date && !venue) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full py-16 border-t border-stone-200 relative group"
      >
        <span className="absolute top-8 left-0 text-[10px] tracking-[0.5em] text-stone-200 font-bold uppercase">{number}</span>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
           <div className="flex-shrink-0 md:w-32">
              <h3 className="font-heading text-3xl text-stone-900 italic serif leading-none">{title}</h3>
           </div>
           
           <div className="flex-grow space-y-6">
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Schedule</p>
                <p className="font-heading text-lg text-stone-900">{formatDate(date)}</p>
                <p className="text-sm text-stone-500">{formatTime(date)} — Selesai</p>
              </div>
              
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Location</p>
                <p className="font-heading text-xl text-stone-900 font-light">{venue}</p>
                <p className="text-xs text-stone-500 leading-relaxed max-w-xs">{address}</p>
              </div>

              <div className="flex gap-4 pt-4">
                 <a 
                   href={`https://maps.google.com/?q=${encodeURIComponent(`${venue} ${address}`)}`}
                   target="_blank"
                   className="text-[8px] uppercase tracking-[0.3em] font-bold text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-400 hover:border-stone-400 transition-all"
                 >
                   View Maps
                 </a>
              </div>
           </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-24 px-8 md:px-16 bg-stone-50 overflow-hidden border-b border-stone-200">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           className="text-center mb-16"
        >
           <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-4 block italic">Save The Date</span>
           <h2 className="font-heading text-5xl md:text-6xl text-stone-900 tracking-tighter uppercase mb-4">Agenda Acara</h2>
           <div className="w-12 h-px bg-stone-900 mx-auto" />
        </motion.div>

        <div className="w-full flex flex-col">
          <EventCard 
            title="Akad Nikah" 
            date={d.akad_datetime}
            venue={d.akad_venue_name}
            address={d.akad_venue_address}
            number="Part I"
          />
          <EventCard 
            title="Resepsi" 
            date={d.resepsi_datetime}
            venue={d.resepsi_venue_name}
            address={d.resepsi_venue_address}
            number="Part II"
          />
        </div>

        <CountdownTimer targetDate={d.akad_datetime || d.resepsi_datetime} />
      </div>
    </section>
  );
}
