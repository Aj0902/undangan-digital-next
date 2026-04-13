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

       {/* Bridge Ornament to Guestbook */}
       <motion.img 
        src="/assets/rustic-boho/images/or-bawah-tengah.svg"
        style={{ y: yOrnRight }}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 opacity-[0.15] pointer-events-none z-20"
        alt="Bridge Ornament"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
           className="text-center mb-20"
        >
           <p className="font-accent text-4xl text-[#D4A373] mb-[-0.5rem] ">Tanda Kasih</p>
           <h2 className="font-heading text-fluid-h2 text-stone-900 tracking-tighter leading-none ">Kado Digital</h2>
           <p className="font-body text-xs md:text-sm leading-relaxed text-stone-500 max-w-md mx-auto mt-8 italic font-light">
              Doa Restu Bapak/Ibu/Saudara/i Merupakan Karunia Yang Sangat Berarti Bagi Kami. Namun Jika Anda Ingin Memberikan Tanda Kasih, Anda Dapat Memberikannya Melalui Detail Di Bawah Ini.
           </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {bankAccounts.map((acc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="group flex flex-col items-center p-12 bg-[#FDFBF7] border border-stone-50 rounded-[50px_10px_50px_10px] relative overflow-hidden hover:bg-white hover:shadow-2xl transition-all duration-700"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                  </svg>
               </div>
               
               <div className="text-center relative z-10 w-full space-y-6">
                 <div>
                    <p className="font-heading text-xs tracking-[0.4em] text-[#D4A373] uppercase font-bold mb-1">{acc.bank}</p>
                    <div className="h-px w-8 bg-[#D4A373]/20 mx-auto" />
                 </div>

                 <div className="space-y-1">
                    <p className="font-body text-lg text-stone-900 font-semibold">{acc.name}</p>
                    <p className="font-heading text-2xl text-stone-800 tracking-[0.2em] font-light">{acc.number}</p>
                 </div>
                 
                 <button 
                   onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                   className="flex items-center justify-center gap-3 px-10 py-5 bg-stone-900 text-white rounded-full text-[10px] uppercase font-bold tracking-[0.3em] transition-all duration-500 w-full hover:bg-[#D4A373] shadow-lg"
                 >
                   {copiedId === `acc-${idx}` ? (
                     <>
                       <Check size={14} className="animate-bounce" />
                       <span>Berhasil Tersalin</span>
                     </>
                   ) : (
                     <>
                       <Copy size={14} className="opacity-30" />
                       <span>Salin Nomor Rekening</span>
                     </>
                   )}
                 </button>
               </div>
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
