'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import type { Client } from '@/types/client';

export default function GiftSection({ data }: { data: Client }) {
  const { client_details: d } = data;
  const bankAccounts = d.bank_accounts ?? [];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (bankAccounts.length === 0) return null;

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#0A0A0A] overflow-hidden border-b border-[#E5E4E2]/10">
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 w-full relative z-10">
        
        {/* Left Side: Editorial Typography */}
        <div className="w-full md:w-1/3">
           <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="sticky top-32"
           >
              <h2 className="font-mono text-[8px] md:text-[10px] tracking-[0.6em] text-stone-500 uppercase pb-6 border-b border-stone-800 mb-8">The Treasury</h2>
              <p className="font-heading text-3xl md:text-5xl text-[#E5E4E2] lowercase italic tracking-tighter leading-tight">
                 Your presence is wealth enough.
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-stone-600 mt-8 leading-relaxed max-w-[200px]">
                 Namun, bagi paduka yang berkenan mengirimkan anugerah tambahan, dipersilakan melalui perbendaharaan di bawah ini.
              </p>
           </motion.div>
        </div>

        {/* Right Side: Brutalist Panels */}
        <div className="w-full md:w-2/3 flex flex-col gap-px bg-stone-800 pt-px">
          {bankAccounts.map((acc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-[#0A0A0A] group relative overflow-hidden"
            >
               {/* Hover Shine Effect */}
               <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5E4E2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

               <div className="flex flex-col mb-8 md:mb-0 w-full md:w-auto">
                  <p className="font-mono text-[8px] tracking-[0.3em] text-stone-500 uppercase mb-2">Institution / {acc.bank}</p>
                  <p className="font-mono text-xl md:text-3xl text-[#E5E4E2] font-light tracking-[0.1em] mb-4">{acc.number}</p>
                  <p className="font-heading text-xl text-stone-400 lowercase tracking-tighter">A.N. {acc.name}</p>
               </div>
               
               <button 
                 onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                 className="flex items-center justify-center gap-4 px-6 py-4 w-full md:w-auto bg-stone-900 border border-stone-800 text-[8px] uppercase tracking-[0.4em] font-bold text-[#E5E4E2]/50 hover:text-[#E5E4E2] hover:bg-stone-800 transition-all duration-500"
               >
                 <Copy size={12} />
                 <span>
                    {copiedId === `acc-${idx}` ? 'Acknowledged' : 'Replicate'}
                 </span>
               </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
