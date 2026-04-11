"use client";
import React from 'react';
import { Clock } from 'lucide-react';
import { LuxuryCard } from './Wrappers';

export function EventSection({ data }: { data: any }) {
  const d = data.client_details;

  return (
    <section className="py-32 px-6 bg-white/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Akad Nikah */}
        <LuxuryCard className="p-12 rounded-[3rem]">
          <h3 className="font-montserrat text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-6 font-bold">Akad Nikah</h3>
          <p className="font-playfair text-2xl mb-4">
            {d.akad_datetime ? new Date(d.akad_datetime).toLocaleDateString('id-ID', { dateStyle: 'full' }) : '-'}
          </p>
          <p className="flex items-center justify-center gap-2 mb-6 font-playfair italic">
            <Clock size={16} /> 
            {d.akad_datetime ? new Date(d.akad_datetime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'} WIB
          </p>
          <p className="font-bold font-playfair">{d.akad_venue_name}</p>
          <p className="text-sm opacity-70 mb-8">{d.akad_venue_address}</p>
          <button className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full text-[10px] tracking-widest uppercase hover:bg-[#D4AF37] hover:text-white transition-all">
            Google Maps
          </button>
        </LuxuryCard>

        {/* Resepsi */}
        <LuxuryCard className="p-12 rounded-[3rem]">
          <h3 className="font-montserrat text-xs tracking-[0.4em] text-[#D4AF37] uppercase mb-6 font-bold">Resepsi</h3>
          <p className="font-playfair text-2xl mb-4">
            {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleDateString('id-ID', { dateStyle: 'full' }) : '-'}
          </p>
          <p className="flex items-center justify-center gap-2 mb-6 font-playfair italic">
            <Clock size={16} />
            {d.resepsi_datetime ? new Date(d.resepsi_datetime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'} WIB
          </p>
          <p className="font-bold font-playfair">{d.resepsi_venue_name}</p>
          <p className="text-sm opacity-70 mb-8">{d.resepsi_venue_address}</p>
          <button className="px-8 py-3 bg-[#D4AF37] text-white rounded-full text-[10px] tracking-widest uppercase shadow-lg hover:shadow-xl transition-all">
            Google Maps
          </button>
        </LuxuryCard>
      </div>
    </section>
  );
}
