'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift } from 'lucide-react';
import type { Client } from '@/types/client';

interface GiftSectionProps {
  data: Client;
}

export default function GiftSection({ data }: GiftSectionProps) {
  const { client_details: d } = data;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!d.bank_accounts || d.bank_accounts.length === 0) return null;

  const handleCopy = (num: string, id: string) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative py-24 px-8 bg-cream overflow-hidden">
      {/* Decorative side line */}
      <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gold/10 hidden md:block" />
      <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-gold/10 hidden md:block" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16"
        >
          <Gift size={32} className="text-gold mx-auto mb-6 opacity-60" />
          <h2 className="font-heading text-5xl md:text-6xl text-primary font-light mb-4">Amplop Digital</h2>
          <p className="font-body text-xs md:text-sm text-primary/60 tracking-wider max-w-sm mx-auto leading-relaxed">
            Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika Anda bermaksud memberi tanda kasih, dapat melalui:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4">
          {d.bank_accounts.map((acc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 border border-gold/10 shadow-lg relative group overflow-hidden"
            >
              {/* Subtle background icon */}
              <div className="absolute -bottom-4 -right-4 font-heading font-bold text-6xl text-gold/5 italic opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity">
                {acc.bank}
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-gold mb-1">{acc.bank}</span>
                <div className="h-[1px] w-8 bg-gold/30 mb-4" />
                <p className="font-heading text-lg text-primary font-light mb-2">{acc.name}</p>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 border border-slate-100">
                  <p className="font-body text-sm font-medium tracking-widest text-primary/80">{acc.number}</p>
                  <button 
                    onClick={() => handleCopy(acc.number, `${idx}`)}
                    className="text-gold hover:text-primary transition-colors"
                  >
                    {copiedId === `${idx}` ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="mt-20 opacity-20 rotate-180">
           <img src="/assets/template-classic/gold-divider.png" alt="" className="w-32" />
        </div>
      </div>
    </section>
  );
}
