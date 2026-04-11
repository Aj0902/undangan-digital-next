'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import type { Client } from '@/types/client';

interface EventSectionProps {
  data: Client;
}

export default function EventSection({ data }: EventSectionProps) {
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
    const [timeLeft, setTimeLeft] = React.useState({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });

    React.useEffect(() => {
      if (!targetDate) return;
      const target = new Date(targetDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            Seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [targetDate]);

    if (!targetDate) return null;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="flex gap-4 md:gap-8 justify-center mb-16 w-full max-w-2xl mx-auto"
      >
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 mb-3 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
               <span className="font-heading text-2xl md:text-3xl text-primary font-light relative z-10">{value.toString().padStart(2, '0')}</span>
            </div>
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary/60">{unit}</span>
          </div>
        ))}
      </motion.div>
    );
  };

  const EventCard = ({ 
    title, 
    date, 
    time, 
    venue, 
    address, 
    delay = 0 
  }: { 
    title: string, 
    date: string | null, 
    time: string | null, 
    venue: string | null, 
    address: string | null,
    delay?: number
  }) => {
    if (!date && !venue) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay }}
        className="flex-1 w-full max-w-md bg-white p-8 md:p-12 shadow-2xl relative overflow-hidden group"
      >
        {/* Subtle texture background on card */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url(/assets/template-classic/paper-texture.png)] bg-cover" />
        
        {/* Decorative Internal Border */}
        <div className="absolute inset-4 border border-gold/20 pointer-events-none group-hover:border-gold/40 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <h4 className="font-heading text-3xl md:text-4xl text-primary font-light mb-2">{title}</h4>
            <div className="h-[1px] w-12 bg-gold/50" />
          </div>

          <div className="space-y-6 w-full text-center">
            <div className="flex flex-col items-center gap-2">
              <Calendar size={18} className="text-gold mb-1" />
              <p className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-primary/80">
                {formatDate(date)}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Clock size={18} className="text-gold mb-1" />
              <p className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-primary/80">
                {formatTime(date)} - Selesai
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <MapPin size={18} className="text-gold mb-1" />
              <p className="font-heading text-xl text-primary italic font-light">
                {venue || 'Venue Name'}
              </p>
              <p className="font-body text-[10px] md:text-xs leading-relaxed text-primary/60 max-w-[200px] mt-1">
                {address || 'Complete Address Details Placeholder'}
              </p>
            </div>
          </div>

          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue} ${address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 px-6 py-3 bg-primary text-white font-body text-[10px] uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 shadow-lg hover:shadow-gold/20"
          >
            Google Maps
          </a>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-24 px-8 bg-[#F0F0F0] overflow-hidden">
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url(/assets/template-classic/paper-texture.png)] bg-fixed"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-body mb-4">Waktu & Tempat</p>
          <h2 className="font-heading text-5xl md:text-6xl text-primary font-light mb-8">Agenda Acara</h2>
        </motion.div>

        <CountdownTimer targetDate={d.akad_datetime || d.resepsi_datetime} />

        <div className="w-full flex flex-col lg:flex-row justify-center items-stretch gap-12">
          {/* Akad Card */}
          <EventCard 
            title="Akad Nikah"
            date={d.akad_datetime}
            time={d.akad_datetime}
            venue={d.akad_venue_name}
            address={d.akad_venue_address}
            delay={0.2}
          />

          {/* Resepsi Card */}
          <EventCard 
            title="Resepsi"
            date={d.resepsi_datetime}
            time={d.resepsi_datetime}
            venue={d.resepsi_venue_name}
            address={d.resepsi_venue_address}
            delay={0.4}
          />
        </div>

        {/* Decorative Divider */}
        <div className="mt-24 opacity-20">
           <img src="/assets/template-classic/gold-divider.png" alt="" className="w-64" />
        </div>
      </div>
    </section>
  );
}
