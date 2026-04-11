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
    <section className="relative w-full py-24 px-8 md:px-16 bg-white overflow-hidden border-b border-stone-100">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="text-center mb-16"
        >
           <span className="text-[10px] tracking-[0.4em] text-[#D4A373] uppercase font-bold mb-4 block italic">Digital Registry</span>
           <h2 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter leading-none lowercase">Tanda Kasih</h2>
           <p className="text-[10px] leading-relaxed tracking-[0.1em] text-stone-500 max-w-sm mx-auto uppercase mt-6 font-light">
              Doa restu Anda adalah karunia yang sangat berarti bagi kami. Namun, apabila Anda ingin memberikan tanda kasih, dapat melalui detail di bawah ini.
           </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {bankAccounts.map((acc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center p-12 bg-[#FDFBF7] border border-[#D4A373]/10 rounded-[40px] relative overflow-hidden hover:bg-[#F7EFE1] transition-all duration-700 shadow-xl"
            >
               {/* Decorative Arch Shape */}
               <div className="absolute top-0 inset-x-0 h-1 bg-[#D4A373]/30" />
               
               <div className="text-center relative z-10 w-full">
                 <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-bold mb-6 italic">{acc.bank}</p>
                 <h3 className="font-heading text-3xl text-stone-900 mb-2 italic lowercase">{acc.name}</h3>
                 <p className="font-mono text-xl text-stone-900 tracking-widest font-light mb-8">{acc.number}</p>
                 
                 <button 
                   onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                   className="flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-500 w-full group-hover:bg-[#D4A373]"
                 >
                   {copiedId === `acc-${idx}` ? (
                     <>
                       <Check size={12} />
                       <span>Copied</span>
                     </>
                   ) : (
                     <>
                       <Copy size={12} />
                       <span>Copy Number</span>
                     </>
                   )}
                 </button>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="mt-24 w-12 h-px bg-[#D4A373]/20" />
      </div>
    </section>
  );
}
