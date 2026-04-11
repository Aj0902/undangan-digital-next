'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
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
    <section className="relative w-full py-24 px-8 md:px-16 bg-white overflow-hidden border-b border-stone-200">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="text-center mb-20"
        >
           <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-4 block italic">The Registry</span>
           <h2 className="font-heading text-5xl text-stone-900 tracking-tighter uppercase mb-6">Digital Gift</h2>
           <p className="text-[10px] leading-relaxed tracking-[0.1em] text-stone-500 max-w-xs mx-auto uppercase">
              Doa restu Anda merupakan hadiah terindah. Namun jika bermaksud memberi tanda kasih, dapat melalui detail di bawah ini.
           </p>
        </motion.div>

        <div className="w-full space-y-12">
          {bankAccounts.map((acc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center py-12 border-t border-stone-100 first:border-t-0 relative"
            >
               <span className="absolute top-0 right-0 font-heading text-6xl text-stone-50 select-none pointer-events-none">0{idx + 1}</span>
               
               <div className="text-center relative z-10 w-full">
                 <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-bold mb-4">{acc.bank}</p>
                 <h3 className="font-heading text-3xl text-stone-900 mb-6 italic serif">{acc.name}</h3>
                 
                 <div className="flex flex-col items-center gap-6">
                    <p className="font-heading text-4xl text-stone-900 tracking-[0.1em] font-light">{acc.number}</p>
                    
                    <button 
                      onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-500 w-full max-w-[200px]"
                    >
                      {copiedId === `acc-${idx}` ? (
                        <>
                          <Check size={12} />
                          <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span className="text-[8px] uppercase tracking-[0.3em] font-bold group-hover:tracking-[0.4em] transition-all">Copy Number</span>
                        </>
                      )}
                    </button>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Editorial Divider */}
        <div className="mt-20 flex items-center gap-4 w-full opacity-20">
           <div className="h-px flex-grow bg-stone-900" />
           <span className="font-heading text-2xl italic serif text-stone-900">&amp;</span>
           <div className="h-px flex-grow bg-stone-900" />
        </div>
      </div>
    </section>
  );
}
