'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import type { Client } from '@/types/client';

export default function GiftSection({ data }: { data: Client }) {
  const { client_details: d } = data;
  const containerRef = useRef<HTMLDivElement>(null);
  const bankAccounts = d.bank_accounts ?? [];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrnLeft = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const yOrnRight = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (bankAccounts.length === 0) return null;

  return (
    <section ref={containerRef} className="relative w-full py-32 px-8 md:px-16 overflow-hidden border-b border-stone-100">
      {/* Floating Parallax Ornaments - Accurate Placement */}
      <motion.img 
        src="/assets/rustic-boho/images/Or-kiri.svg"
        style={{ y: yOrnLeft, rotate: -45 }}
        className="absolute -left-32 top-1/4 w-80 md:w-[35rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kiri"
      />
      <motion.img 
        src="/assets/rustic-boho/images/Or-kanansvg.svg"
        style={{ y: yOrnRight, rotate: 120 }}
        className="absolute -right-32 bottom-1/4 w-80 md:w-[35rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kanan"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
           className="text-center mb-20"
        >
           <p className="font-accent text-4xl text-[var(--boho-terracotta)] mb-[-0.5rem]">Wedding Gift For</p>
           <h2 className="font-heading text-fluid-h2 text-stone-900 tracking-tighter leading-none ">Berbagi Kasih</h2>
           <div className="w-12 h-px bg-[var(--boho-gold)]/30 mx-auto mt-8" />
           <p className="font-body text-xs md:text-sm leading-relaxed text-stone-500 max-w-md mx-auto mt-8 italic font-light">
              Doa Restu Bapak/Ibu/Saudara/i Merupakan Karunia Yang Sangat Berarti Bagi Kami. Namun Jika Anda Ingin Memberikan Tanda Kasih, Anda Dapat Memberikannya Melalui Detail Di Bawah Ini.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
           {d.bank_accounts?.map((acc, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ delay: i * 0.2 }}
               className="p-12 bg-white rounded-[60px] border border-stone-50 shadow-[0_40px_100px_-20px_rgba(140,82,48,0.1)] flex flex-col items-center text-center group hover:shadow-[0_60px_120px_-20px_rgba(140,82,48,0.18)] transition-all duration-1000"
             >
                <div className="mb-10 w-full">
                    <p className="font-heading text-xs tracking-[0.5em] text-stone-300 uppercase font-bold mb-6">Digital Envelope</p>
                    <img 
                      src={`/assets/common/banks/${acc.bank.toLowerCase()}.png`} 
                      className="h-10 md:h-12 object-contain mx-auto opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                      alt={acc.bank}
                    />
                    <div className="h-px w-8 bg-[var(--boho-gold)]/20 mx-auto mt-8" />
                </div>

                <div className="space-y-3 w-full text-center">
                    <p className="font-body text-xl md:text-2xl text-stone-900 font-semibold">{acc.name}</p>
                    <p className="font-heading text-2xl md:text-3xl text-stone-800 tracking-[0.2em] font-light">{acc.number}</p>
                </div>
                
                <button 
                  onClick={() => handleCopy(acc.number, `${i}`)}
                  className="mt-12 flex items-center gap-3 px-10 py-5 bg-stone-50 text-stone-600 border border-stone-100 rounded-full text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-[var(--boho-gold)] hover:text-white hover:border-[var(--boho-gold)] transition-all duration-700 w-full justify-center shadow-sm"
                >
                  {copiedId === `${i}` ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === `${i}` ? 'Tersalin' : 'Salin Rekening'}
                </button>
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider Ornament */}
        <div className="mt-24">
          <img src="/assets/rustic-boho/images/or-bawah-tengah.svg" className="w-48 opacity-[0.2]" alt="" />
        </div>
      </div>
    </section>
  );
}
