"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { RevealText, FadeIn } from '../ui/Animations';

interface BankAccount {
  bank: string;
  name: string;
  number: string;
}

interface DigitalGiftProps {
  accounts: BankAccount[];
}

const DigitalGift = ({ accounts }: DigitalGiftProps) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-40 bg-stone-50 border-y border-stone-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <RevealText el="h2" className="font-cinzel text-5xl mb-24 italic text-stone-800">Wedding Gift</RevealText>
        <div className="grid md:grid-cols-2 gap-12">
          {accounts.map((item, idx) => (
            <FadeIn key={idx} className="bg-white p-12 border border-stone-200 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 font-cinzel text-9xl italic font-bold">{item.bank}</div>
              <RevealText el="span" className="font-montserrat text-[10px] text-[#B89F5D] font-bold mb-10 block uppercase tracking-widest">{item.bank} Account</RevealText>
              <RevealText el="h4" className="font-cinzel text-3xl mb-4 text-stone-800 tracking-tighter">{item.name}</RevealText>
              <div className="flex items-center justify-between border-t border-stone-100 pt-8 mt-6">
                <span className="font-mono text-2xl text-stone-500 tracking-tighter">{item.number}</span>
                <button onClick={() => handleCopy(item.number, idx)} className="p-4 bg-stone-50 text-[#B89F5D] hover:bg-[#B89F5D] hover:text-white transition-all">
                  {copiedId === idx ? <Check size={24} /> : <Copy size={24} />}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalGift;
