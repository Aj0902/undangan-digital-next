'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ClientDetails } from '@/types/client';

export default function Closing({ details }: { details: ClientDetails }) {
  return (
    <section className="bg-slate-900 border-t border-slate-700 py-32 md:py-48 text-white relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
        >
          <p className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mb-8 border-b border-slate-700 pb-4 inline-block">
            TERIMA KASIH
          </p>
          <h2 className="font-sans font-black text-6xl md:text-8xl tracking-tighter uppercase text-slate-100 mb-8 leading-[0.9]">
            {details.bride_name} <span className="text-slate-600">&</span> {details.groom_name}
          </h2>
          <p className="font-sans text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Terima kasih telah menjadi bagian dari hari bersejarah kami. Semoga hadir dalam kebahagiaan dan cinta yang tak lekang oleh waktu.
          </p>
        </motion.div>
      </div>

      {/* Decorative huge typography in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black text-[150px] md:text-[300px] text-slate-800 opacity-20 pointer-events-none tracking-tighter whitespace-nowrap">
        THANK YOU
      </div>
    </section>
  );
}
