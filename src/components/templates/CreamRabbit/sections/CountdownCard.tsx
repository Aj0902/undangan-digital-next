'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarHeart } from 'lucide-react';
import type { Client } from '@/types/client';

export default function EventSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
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
      <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-lg mt-12">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div 
            key={unit} 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center bg-white p-4 md:p-6 rounded-3xl shadow-[0_6px_0_#FFE5D9] border-2 border-white"
          >
            <span className="font-heading text-4xl md:text-5xl text-[#F28482] tracking-tighter leading-none mb-2">{value.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#4A4E69] font-bold">{unit}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  const EventCard = ({ title, date, venue, address, bgColor, shadowColor }: any) => {
    if (!date && !venue) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        whileHover={{ y: -5 }}
        className={`w-full p-8 md:p-10 ${bgColor} rounded-[40px] shadow-[0_8px_0_${shadowColor}] border-[4px] border-white text-center relative group`}
      >
        <div className="absolute top-0 inset-x-8 h-2 bg-white/40 rounded-b-full" />
        
        <h3 className="font-heading text-4xl md:text-5xl text-[#4A4E69] leading-none mb-6 lowercase">{title}</h3>
        
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl mb-6 shadow-sm border border-white">
           <p className="font-mono text-sm uppercase tracking-widest text-[#FFB5A7] font-bold mb-1">{formatDate(date)}</p>
           <p className="font-heading text-2xl text-[#4A4E69] mb-1">{formatTime(date)}</p>
        </div>
        
        <div className="mb-8">
           <p className="font-heading text-2xl text-[#4A4E69] font-medium lowercase italic mb-2">{venue}</p>
           <p className="text-xs text-[#4A4E69]/70 leading-relaxed font-medium bg-white/50 p-4 rounded-xl">{address}</p>
        </div>

        <a 
          href={`https://maps.google.com/?q=${encodeURIComponent(`${venue} ${address}`)}`}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#F28482] rounded-full text-[10px] uppercase font-extrabold tracking-widest border-2 border-transparent hover:border-[#FFB5A7] shadow-sm transition-all"
        >
          <MapPin size={16} />
          View on Map
        </a>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#FFF5F5] overflow-hidden -mt-12 z-20 rounded-t-[50px] shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
      
      {/* Decorative Floating Elements */}
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute top-20 right-10 w-16 h-16 border-4 border-dashed border-[#FCD5CE] rounded-full" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-40 left-10 w-8 h-8 bg-[#FFB5A7] rounded-full" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 150 }}
           className="text-center mb-16"
        >
           <div className="inline-flex items-center gap-2 bg-[#FFE5D9] px-6 py-2 rounded-full border-2 border-white shadow-sm mb-6">
              <CalendarHeart size={14} className="text-[#F28482]" />
              <span className="text-[10px] tracking-[0.3em] text-[#F28482] uppercase font-bold">Save The Date</span>
           </div>
           
           <h2 className="font-heading text-6xl md:text-7xl text-[#4A4E69] tracking-tighter leading-none lowercase">
              Happy Day
           </h2>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 mb-16">
          <EventCard 
            title="Akad" 
            date={d.akad_datetime}
            venue={d.akad_venue_name}
            address={d.akad_venue_address}
            bgColor="bg-[#FFE5D9]"
            shadowColor="#FCD5CE"
          />
          <EventCard 
            title="Resepsi" 
            date={d.resepsi_datetime}
            venue={d.resepsi_venue_name}
            address={d.resepsi_venue_address}
            bgColor="bg-[#FCD5CE]"
            shadowColor="#FFB5A7"
          />
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="flex flex-col items-center w-full"
        >
           <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#FFB5A7] mb-2 bg-white px-4 py-1 rounded-full">Counting Down</span>
           <CountdownTimer targetDate={d.akad_datetime || d.resepsi_datetime} />
        </motion.div>

      </div>
    </section>
  );
}
