"use client";

import React from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { FadeIn } from '../ui/Animations';

interface RsvpProps {
  clientId: string;
}

const Rsvp = ({ clientId }: RsvpProps) => {
  return (
    <section className="py-40 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-24">
        <FadeIn className="bg-white p-12 shadow-2xl border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#B89F5D]" />
          <div className="flex items-center gap-6 mb-16">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-[#B89F5D]"><Users size={28}/></div>
            <h3 className="font-cinzel text-3xl text-stone-800">RSVP</h3>
          </div>
          <form className="space-y-10">
            <input type="hidden" value={clientId} />
            <div className="relative">
              <input type="text" placeholder="Nama Lengkap" className="w-full px-0 py-5 border-b-2 border-stone-100 focus:border-[#B89F5D] outline-none font-bodoni text-2xl bg-transparent transition-all peer placeholder-transparent" id="name" />
              <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] font-montserrat tracking-widest text-[#B89F5D] uppercase transition-all">Nama Lengkap</label>
            </div>
            <div className="relative">
              <select className="w-full px-0 py-5 border-b-2 border-stone-100 focus:border-[#B89F5D] outline-none font-bodoni text-2xl bg-transparent appearance-none">
                <option>Hadir</option>
                <option>Berhalangan</option>
              </select>
              <label className="absolute left-0 -top-4 text-[10px] font-montserrat tracking-widest text-[#B89F5D] uppercase transition-all">Kehadiran</label>
            </div>
            <div className="relative">
              <textarea placeholder="Pesan Doa" className="w-full px-0 py-5 border-b-2 border-stone-100 focus:border-[#B89F5D] outline-none font-bodoni text-2xl bg-transparent h-40 resize-none transition-all placeholder-transparent" id="msg" />
              <label htmlFor="msg" className="absolute left-0 -top-4 text-[10px] font-montserrat tracking-widest text-[#B89F5D] uppercase transition-all">Pesan Doa</label>
            </div>
            <button type="button" className="w-full py-6 bg-stone-900 text-white font-montserrat text-[10px] font-bold tracking-[0.5em] uppercase shadow-2xl hover:bg-[#B89F5D] transition-all">Kirim Konfirmasi</button>
          </form>
        </FadeIn>

        <div className="space-y-16">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-500"><MessageSquare size={28}/></div>
            <h3 className="font-cinzel text-3xl italic text-stone-800">Guest Book</h3>
          </div>
          <div className="space-y-16 max-h-[700px] overflow-y-auto custom-scrollbar pr-8">
            {[1, 2, 3].map((i) => (
              <FadeIn key={i} className="border-b-2 border-stone-100 pb-12 last:border-none">
                <p className="font-cinzel text-[#B89F5D] text-sm uppercase tracking-widest mb-6 font-bold">Sahabat Elena & Arthur</p>
                <p className="font-bodoni text-2xl text-stone-500 italic leading-relaxed">"Selamat menempuh hidup baru. Semoga cinta kalian sekuat marmer dan seindah emas yang menghiasi perjalanan hidup selamanya."</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rsvp;
