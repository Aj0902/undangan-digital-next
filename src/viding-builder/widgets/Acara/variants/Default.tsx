"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Client, formatDate, formatTime } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { MapPin, Clock, CalendarDays, Navigation } from "lucide-react";

interface AcaraDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
}

interface EventCardProps {
  title: string;
  datetime: string | null;
  venueName: string | null;
  venueAddress: string | null;
  color: string;
  onOpenMaps: (venueName?: string | null, address?: string | null) => void;
}

const EventCard = ({ title, datetime, venueName, venueAddress, color, onOpenMaps }: EventCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-5 shadow-2xl flex-1"
  >
    <h3 className="text-2xl font-light tracking-tight" style={{ color }}>{title}</h3>
    <div className="h-px w-12 mx-auto opacity-20 bg-current" />
    
    <div className="space-y-4 text-left">
      <div className="flex items-start gap-3">
        <CalendarDays size={16} className="mt-0.5 opacity-40 shrink-0" />
        <span className="text-sm opacity-90">{datetime ? formatDate(datetime) : "—"}</span>
      </div>
      <div className="flex items-start gap-3">
        <Clock size={16} className="mt-0.5 opacity-40 shrink-0" />
        <span className="text-sm opacity-90">{datetime ? formatTime(datetime) : "—"} - Selesai</span>
      </div>
      <div className="flex items-start gap-3">
        <MapPin size={16} className="mt-0.5 opacity-40 shrink-0" />
        <div>
          <p className="text-sm font-bold opacity-90">{venueName || "—"}</p>
          <p className="text-xs opacity-50 mt-1">{venueAddress || "—"}</p>
        </div>
      </div>
    </div>

    {(venueName || venueAddress) && (
      <button
        onClick={() => onOpenMaps(venueName, venueAddress)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-lg"
      >
        <Navigation size={14} />
        Arahkan ke Lokasi
      </button>
    )}
  </motion.div>
);

export default function AcaraDefault({ clientData, accentColor = "#D4AF37" }: AcaraDefaultProps) {
  const details = clientData.client_details || {};

  // Countdown Timer to Akad
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetDate = details.akad_datetime ? new Date(details.akad_datetime) : null;

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) { clearInterval(interval); return; }
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const openMaps = (venueName?: string | null, address?: string | null) => {
    const query = encodeURIComponent(`${venueName || ''} ${address || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 space-y-10 relative z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <h2 className="text-4xl drop-shadow-lg" style={{ color: accentColor }}>Jadwal Acara</h2>
        <div className="h-px w-16 bg-current opacity-30 mx-auto" />
      </motion.div>

      {/* Countdown Timer */}
      {targetDate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-3 text-center"
        >
          {[
            { val: countdown.days, label: "Hari" },
            { val: countdown.hours, label: "Jam" },
            { val: countdown.minutes, label: "Menit" },
            { val: countdown.seconds, label: "Detik" },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg">
              <p className="text-3xl font-light tabular-nums" style={{ color: accentColor }}>
                {String(item.val).padStart(2, '0')}
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] opacity-40 font-bold mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Event Cards */}
      <div className="space-y-6">
        <EventCard
          title="Akad Nikah"
          datetime={details.akad_datetime}
          venueName={details.akad_venue_name}
          venueAddress={details.akad_venue_address}
          color={accentColor}
          onOpenMaps={openMaps}
        />
        <EventCard
          title="Resepsi"
          datetime={details.resepsi_datetime}
          venueName={details.resepsi_venue_name}
          venueAddress={details.resepsi_venue_address}
          color={accentColor}
          onOpenMaps={openMaps}
        />
      </div>
    </div>
  );
}
