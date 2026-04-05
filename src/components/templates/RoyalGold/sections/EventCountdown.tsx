"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { RevealText, FadeIn } from '../ui/Animations';

interface EventCountdownProps {
  targetDate: string | null;
  akadTime: string | null;
  resepsiTime: string | null;
  venueName: string | null;
  venueAddress: string | null;
}

const EventCountdown = ({ targetDate, akadTime, resepsiTime, venueName, venueAddress }: EventCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-40 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 marble-texture opacity-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-32">
          <RevealText el="h2" className="font-cinzel text-5xl md:text-7xl mb-16 italic text-[#B89F5D]">Menuju Bahagia</RevealText>
          <div className="flex justify-center gap-4 md:gap-8">
            {[
              { l: 'Hari', v: timeLeft.d },
              { l: 'Jam', v: timeLeft.h },
              { l: 'Mnt', v: timeLeft.m },
              { l: 'Det', v: timeLeft.s }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="w-20 h-24 md:w-28 md:h-32 bg-white/5 border border-white/10 flex flex-col items-center justify-center rounded-sm">
                <span className="text-3xl md:text-5xl font-cinzel text-[#B89F5D]">{item.v}</span>
                <span className="text-[9px] uppercase tracking-widest opacity-40 font-montserrat mt-2 text-white">{item.l}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn className="bg-white/5 backdrop-blur-xl border-l-4 border-[#B89F5D] p-12 md:p-16 hover:bg-white/10 transition-all duration-700">
            <RevealText el="p" className="font-montserrat text-[10px] tracking-[0.5em] text-[#B89F5D] uppercase mb-12">Akad Nikah</RevealText>
            <RevealText el="h3" className="font-cinzel text-4xl mb-10 text-white">{targetDate ? new Date(targetDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</RevealText>
            <div className="space-y-6 font-bodoni text-xl text-stone-300 mb-16 italic">
              <p className="flex items-center gap-5"><Clock size={18} className="text-[#B89F5D]" /> {akadTime || "08.00 - 10.00"} WIB</p>
              <p className="flex items-center gap-5 leading-relaxed"><MapPin size={18} className="text-[#B89F5D] flex-shrink-0" /> Masjid Agung Al-Azhar, Jakarta</p>
            </div>
            <button className="w-full py-5 border border-white/20 rounded-sm font-montserrat text-[9px] tracking-[0.4em] uppercase hover:bg-white hover:text-stone-900 transition-all">Lihat Lokasi</button>
          </FadeIn>

          <FadeIn delay={0.2} className="bg-white/5 backdrop-blur-xl border-l-4 border-[#B89F5D] p-12 md:p-16 hover:bg-white/10 transition-all duration-700">
            <RevealText el="p" className="font-montserrat text-[10px] tracking-[0.5em] text-[#B89F5D] uppercase mb-12">Resepsi</RevealText>
            <RevealText el="h3" className="font-cinzel text-4xl mb-10 text-white">{targetDate ? new Date(targetDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</RevealText>
            <div className="space-y-6 font-bodoni text-xl text-stone-300 mb-16 italic">
              <p className="flex items-center gap-5"><Clock size={18} className="text-[#B89F5D]" /> {resepsiTime || "11.00 - 14.00"} WIB</p>
              <p className="flex items-center gap-5 leading-relaxed"><MapPin size={18} className="text-[#B89F5D] flex-shrink-0" /> {venueName || "The Grand Ballroom"}, {venueAddress || "Jakarta"}</p>
            </div>
            <button className="w-full py-5 bg-[#B89F5D] text-white rounded-sm font-montserrat text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-[#B89F5D] transition-all">Lihat Lokasi</button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default EventCountdown;
