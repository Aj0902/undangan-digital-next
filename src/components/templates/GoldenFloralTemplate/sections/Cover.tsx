// ✂️ ========================================================
// 📂 FILE TUJUAN: sections/Cover.tsx
// ⚠️ KETERANGAN: Client Component
// ========================================================
"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { RevealText } from './Wrappers';
import { getMedia } from '../utils';

export function Cover({ data, guestName, isOpen, onOpen }: { data: any, guestName?: string, isOpen: boolean, onOpen: () => void }) {
  const d = data.client_details;
  const media = data.client_media;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div 
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 1.2 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${getMedia(media, 'hero_image')})` }}
          />
          <div className="relative z-10 text-center px-6">
            <RevealText el="p" className="font-montserrat text-[10px] tracking-[0.8em] text-[#D4AF37] uppercase mb-8">The Wedding Celebration</RevealText>
            <RevealText el="h1" className="text-6xl md:text-8xl font-playfair text-[#2C2621] mb-6 italic">{d.groom_name} & {d.bride_name}</RevealText>
            <RevealText el="div" className="mb-12">
              <p className="font-montserrat text-xs tracking-widest text-[#2C2621]/60 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="font-playfair text-3xl text-[#2C2621] font-bold">{guestName || 'Tamu Undangan'}</p>
            </RevealText>
            <button onClick={onOpen} className="px-14 py-5 bg-white border border-[#D4AF37] rounded-full font-montserrat text-xs tracking-[0.4em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg">Buka Undangan</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

