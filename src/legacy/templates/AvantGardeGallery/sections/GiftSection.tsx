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
    <section className="relative w-full py-32 px-8 md:px-16 bg-white overflow-hidden">
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        
        {/* Left Side: Typography Plaque */}
        <div className="w-full md:w-1/3">
           <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="sticky top-32"
           >
              <div className="border border-stone-200 p-6 bg-stone-50 shadow-sm relative">
                 <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-stone-300" />
                 <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-400 block mb-4">Registration & Gifting</span>
                 <h2 className="font-heading text-4xl text-stone-900 leading-none lowercase tracking-tighter mb-4">The Patron's Fund</h2>
                 <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mix-blend-multiply">
                    Your generous support to the artists.
                 </p>
              </div>

              {/* Minimalist Decor */}
              <div className="w-12 h-12 border-b-2 border-l-2 border-stone-900 mt-8 opacity-20" />
           </motion.div>
        </div>

        {/* Right Side: Bank Accounts */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {bankAccounts.map((acc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-between p-8 bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200 relative group overflow-hidden"
            >
               {/* Hover Reveal Color Line */}
               <div className="absolute top-0 left-0 h-full w-2 bg-stone-900 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
               <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-rose-600 blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000" />

               <div className="flex flex-col mb-6 md:mb-0 pl-4 w-full md:w-auto">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-stone-500 uppercase font-bold mb-2">{acc.bank}</p>
                  <h3 className="font-heading text-2xl md:text-3xl text-stone-900 lowercase italic mb-2 tracking-tighter">{acc.name}</h3>
                  <p className="font-mono text-xl md:text-2xl text-stone-900 font-light tracking-[0.1em]">{acc.number}</p>
               </div>
               
               <button 
                 onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                 className="relative overflow-hidden group/btn px-8 py-4 border border-stone-900 text-[10px] uppercase tracking-widest font-bold bg-transparent text-stone-900 w-full md:w-auto"
               >
                 <span className="absolute inset-0 bg-stone-900 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
                 <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-500">
                   {copiedId === `acc-${idx}` ? (
                     <>
                       <Check size={14} />
                       <span>Copied</span>
                     </>
                   ) : (
                     <>
                       <Copy size={14} />
                       <span>Copy Number</span>
                     </>
                   )}
                 </span>
               </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
