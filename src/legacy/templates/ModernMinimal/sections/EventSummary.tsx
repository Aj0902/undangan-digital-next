'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ClientDetails } from '@/types/client';
import { formatDate, formatTime } from '@/types/client';

export default function EventSummary({ details }: { details: ClientDetails }) {
  
  const CountdownTimer = ({ targetDate }: { targetDate: string | null }) => {
    const [timeLeft, setTimeLeft] = React.useState({ D: 0, H: 0, M: 0, S: 0 });

    React.useEffect(() => {
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
      <div className="grid grid-cols-4 border-t border-slate-300">
        {Object.entries(timeLeft).map(([unit, value], idx) => (
          <div key={unit} className={`p-4 md:p-6 flex flex-col items-center justify-center ${idx < 3 ? 'border-r border-slate-300' : ''}`}>
            <span className="font-sans font-black text-3xl md:text-5xl text-slate-900 tracking-tighter tabular-nums leading-none mb-2">
              {value.toString().padStart(2, '0')}
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{unit}</span>
          </div>
        ))}
      </div>
    );
  };

  const EventCard = ({ title, date, venue, address }: any) => {
    if (!date && !venue) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col border-b md:border-b-0 md:border-r border-slate-300 last:border-0"
      >
        <div className="p-8 md:p-12 flex-1">
          <h3 className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tighter text-slate-900 mb-8">{title}</h3>
          
          <div className="space-y-6">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Tanggal & Waktu</p>
              <p className="font-sans text-lg md:text-xl text-slate-900 font-medium">{formatDate(date)}</p>
              <p className="font-sans text-base text-slate-600">{formatTime(date)} WIB - Selesai</p>
            </div>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">Lokasi</p>
              <p className="font-sans text-xl text-slate-900 font-medium">{venue}</p>
              <p className="font-sans text-base text-slate-600 leading-relaxed mt-2">{address}</p>
            </div>
          </div>
        </div>
        
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue} ${address}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border-t border-slate-300 p-6 flex justify-center items-center hover:bg-slate-900 hover:text-white transition-colors duration-300 group"
        >
          <span className="font-sans text-xs font-bold uppercase tracking-[0.3em]">Buka Peta Mode Brutal</span>
        </a>
      </motion.div>
    );
  };

  return (
    <section id="event" className="bg-slate-100 border-t border-slate-300">
      {/* Title Area */}
      <div className="border-b border-slate-300 p-8 md:p-16 lg:px-24">
         <motion.h2 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter text-slate-900"
         >
           Agenda Acara
         </motion.h2>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-300">
        <EventCard 
          title="Akad Nikah" 
          date={details.akad_datetime}
          venue={details.akad_venue_name}
          address={details.akad_venue_address}
        />
        <EventCard 
          title="Resepsi" 
          date={details.resepsi_datetime}
          venue={details.resepsi_venue_name}
          address={details.resepsi_venue_address}
        />
      </div>

      {/* Countdown Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        className="bg-white"
      >
        <div className="p-8 md:p-10 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Menghitung Mundur Menuju Momen Bahagia</p>
        </div>
        <CountdownTimer targetDate={details.akad_datetime || details.resepsi_datetime} />
      </motion.div>

    </section>
  );
}
