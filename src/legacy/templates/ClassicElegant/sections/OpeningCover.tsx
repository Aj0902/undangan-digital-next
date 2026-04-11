'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import type { Client } from '@/types/client';

interface OpeningCoverProps {
  data: Client;
  isOpen: boolean;
  onOpen: () => void;
}

export default function OpeningCover({ data, isOpen, onOpen }: OpeningCoverProps) {
  const { client_details: d } = data;
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream overflow-hidden"
        >
          {/* Background Texture & Ornaments */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url(/assets/template-classic/paper-texture.png)] bg-cover" />
          
          <div className="absolute top-0 left-0 w-32 md:w-48 opacity-20">
            <img src="/assets/template-classic/gold-corner.png" alt="" className="w-full mix-blend-multiply" />
          </div>
          <div className="absolute bottom-0 right-0 w-32 md:w-48 opacity-20 rotate-180">
            <img src="/assets/template-classic/gold-corner.png" alt="" className="w-full mix-blend-multiply" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary mb-8"
            >
              The Wedding of
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="font-heading text-6xl md:text-8xl text-primary font-light mb-12"
            >
              {d.bride_name} <span className="text-gold italic">&amp;</span> {d.groom_name}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center mb-16"
            >
              <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold/80 mb-4 italic">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-primary font-light mb-2">
                {guestName}
              </h2>
              <div className="h-[1px] w-12 bg-gold/30 mt-4" />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="group flex flex-col items-center gap-4 focus:outline-none"
            >
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-white shadow-xl group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                <MailOpen size={24} className="text-gold group-hover:text-white transition-colors" />
              </div>
              <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary group-hover:text-gold transition-colors">
                Buka Undangan
              </span>
            </motion.button>
          </div>

          {/* Decorative Divider */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
             <img src="/assets/template-classic/gold-divider.png" alt="" className="w-32" />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
