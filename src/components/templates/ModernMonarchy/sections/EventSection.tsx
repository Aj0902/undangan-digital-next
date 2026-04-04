'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function EventSection({ data }: { data: Client }) {
  const { client_details: d } = data;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
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
    }).format(date);
  };

  const EventBlock = ({ title, date, venue, address, id }: any) => {
    if (!date && !venue) return null;
    return (
      <div className="w-full flex justify-between border-b border-stone-800 py-12 md:py-16">
         <div className="w-1/3 md:w-1/4">
            <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-600 mb-8 md:mb-16">Event.ID.{id}</p>
            <h3 className="font-heading text-3xl md:text-5xl text-[#E5E4E2] leading-none tracking-tighter lowercase">{title}</h3>
         </div>
         <div className="w-2/3 md:w-3/4 flex flex-col md:flex-row justify-end text-right md:text-left md:items-end gap-8 md:gap-24">
            <div className="text-right">
               <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-600 mb-2">Timestamp</p>
               <p className="font-mono text-sm md:text-xl text-[#E5E4E2] font-light tracking-[0.2em]">{formatDate(date)}</p>
               <p className="font-mono text-xs md:text-lg text-stone-500">{formatTime(date)} Hrs</p>
            </div>
            <div className="text-right">
               <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-600 mb-2">Coordinates</p>
               <p className="font-body text-sm md:text-xl text-[#E5E4E2] uppercase font-bold tracking-widest">{venue}</p>
               <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500 md:max-w-[200px] mt-2">{address}</p>
               <a 
                 href={`https://maps.google.com/?q=${encodeURIComponent(`${venue} ${address}`)}`}
                 target="_blank"
                 className="inline-block mt-4 font-mono text-[8px] uppercase tracking-[0.4em] text-[#E5E4E2] border-b border-[#E5E4E2]/30 hover:border-[#E5E4E2] transition-colors pb-1"
               >
                 Acknowledge Location
               </a>
            </div>
         </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-40 px-8 md:px-16 bg-[#0A0A0A] overflow-hidden border-b border-[#E5E4E2]/10">
      
      <div className="max-w-7xl mx-auto w-full">
         
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex items-center justify-between border-b-2 border-[#E5E4E2]/20 pb-8 mb-8"
         >
            <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#E5E4E2] font-bold">The State Affair</h2>
            <div className="w-4 h-4 bg-transparent border border-[#E5E4E2]/50 rotate-45" />
         </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
         >
            <EventBlock 
               title="Akad" 
               date={d.akad_datetime}
               venue={d.akad_venue_name}
               address={d.akad_venue_address}
               id="0A1"
            />
            <EventBlock 
               title="Resepsi" 
               date={d.resepsi_datetime}
               venue={d.resepsi_venue_name}
               address={d.resepsi_venue_address}
               id="0A2"
            />
         </motion.div>

      </div>
    </section>
  );
}
