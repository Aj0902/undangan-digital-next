'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Gift } from 'lucide-react';
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
    <section className="relative w-full py-24 px-8 md:px-16 bg-[#FFE5D9] overflow-hidden">
      
      <div className="absolute top-0 right-0 w-full h-12 bg-[#FFF5F5] rounded-b-[100%]" />

      <div className="max-w-2xl mx-auto flex flex-col items-center mt-12">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 150 }}
           className="text-center mb-16 relative"
        >
           <motion.div 
             animate={{ rotate: [-10, 10, -10] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute -top-12 -right-8 text-[#FFB5A7] opacity-50"
           >
              <Gift size={64} />
           </motion.div>

           <div className="inline-block bg-white px-6 py-2 rounded-full border-2 border-white shadow-sm mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FFB5A7]">Sweet Present</span>
           </div>
           
           <h2 className="font-heading text-5xl md:text-7xl text-[#4A4E69] tracking-tighter leading-none lowercase">Kotak Kado</h2>
           <p className="text-[10px] md:text-sm leading-relaxed text-[#4A4E69]/70 max-w-sm mx-auto font-medium mt-6 bg-white/50 p-4 rounded-2xl">
              Jika Anda ingin memberikan kado kecil sebagai tanda kasih kepada kami, silakan gunakan tombol di bawah ini.
           </p>
        </motion.div>

        <div className="w-full flex flex-col gap-8">
          {bankAccounts.map((acc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col md:flex-row items-center justify-between p-8 bg-white border-[4px] border-white rounded-[30px] shadow-[0_8px_0_#FCD5CE] relative"
            >
               <div className="flex items-center gap-6 mb-6 md:mb-0 w-full md:w-auto">
                  <div className="w-16 h-16 bg-[#FCD5CE] rounded-full flex items-center justify-center text-[#4A4E69] font-heading text-3xl italic leading-none border-2 border-white shadow-inner">
                     {idx + 1}
                  </div>
                  <div>
                    <p className="text-[12px] tracking-[0.2em] text-[#FFB5A7] font-extrabold uppercase mb-1">{acc.bank}</p>
                    <h3 className="font-heading text-2xl text-[#4A4E69] lowercase mb-1">{acc.name}</h3>
                    <p className="font-mono text-xl text-[#4A4E69] font-bold bg-[#FFF5F5] px-4 py-1 rounded-full inline-block">{acc.number}</p>
                  </div>
               </div>
               
               <button 
                 onClick={() => handleCopy(acc.number, `acc-${idx}`)}
                 className="flex items-center justify-center gap-2 px-8 py-4 bg-[#F28482] text-white rounded-full text-[10px] uppercase font-bold tracking-widest shadow-[0_5px_0_#E56B6F] hover:translate-y-1 hover:shadow-[0_0px_0_#E56B6F] transition-all w-full md:w-auto mt-4 md:mt-0"
               >
                 {copiedId === `acc-${idx}` ? (
                   <>
                     <Check size={16} />
                     <span>Copied!</span>
                   </>
                 ) : (
                   <>
                     <Copy size={16} />
                     <span>Copy</span>
                   </>
                 )}
               </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
