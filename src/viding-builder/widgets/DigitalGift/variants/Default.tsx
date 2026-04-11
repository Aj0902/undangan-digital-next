"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Client } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { Gift, Copy, CheckCircle2, CreditCard } from "lucide-react";

interface DigitalGiftDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
}

export default function DigitalGiftDefault({ clientData, accentColor = "#D4AF37" }: DigitalGiftDefaultProps) {
  const bankAccounts = clientData.client_details?.bank_accounts || [];
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 space-y-8 relative z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4" style={{ color: accentColor }}>
          <Gift size={28} />
        </div>
        <h2 className="text-4xl drop-shadow-lg" style={{ color: accentColor }}>Amplop Digital</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">
          Doa restu Anda merupakan karunia yang sangat berarti
        </p>
        <div className="h-px w-16 bg-current opacity-30 mx-auto" />
      </motion.div>

      {/* Bank Cards */}
      {bankAccounts.length > 0 ? (
        <div className="space-y-4">
          {bankAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden group"
            >
              {/* Card Decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <CreditCard size={60} />
              </div>

              <div className="relative z-10 space-y-4">
                {/* Bank Name */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-lg border"
                    style={{ borderColor: accentColor + '40', color: accentColor }}>
                    {account.bank}
                  </span>
                </div>

                {/* Account Number */}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-2xl font-mono font-light tracking-wider">{account.number}</p>
                  <button
                    onClick={() => handleCopy(account.number, idx)}
                    className="shrink-0 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-90"
                  >
                    <AnimatePresence mode="wait">
                      {copiedIdx === idx ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Copy size={18} className="opacity-50" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Account Name */}
                <p className="text-xs opacity-60 font-bold uppercase tracking-wider">a.n {account.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl">
          <p className="text-[10px] uppercase tracking-widest opacity-30 font-bold">Belum ada rekening terdaftar</p>
        </div>
      )}
    </div>
  );
}
