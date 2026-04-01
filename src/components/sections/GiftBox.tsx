'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GiftBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full py-24 px-8 bg-cream text-center border-t-[0.5px] border-primary/5 relative overflow-hidden">
      
      {/* Divider atas & bawah artistik */}
      <div className="absolute top-0 right-10 left-10 batik-divider opacity-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10"
      >
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-4 italic font-light drop-shadow-sm">Tanda Kasih</h2>
        <p className="text-[0.8rem] text-primary/70 mb-12 max-w-[280px] mx-auto leading-relaxed font-light">
          Kehadiran Anda adalah anugerah terindah. Namun jika Anda bermaksud memberikan tanda kasih, dapat mengirimkan melalui amplop digital di bawah ini.
        </p>

        <div className="px-6 py-8 border-[0.5px] border-gold/30 bg-white/60 relative max-w-xs mx-auto backdrop-blur-sm shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)]">
           <p className="font-bold text-primary tracking-[0.2em] text-xs uppercase mb-3 text-gold">BCA</p>
           <p className="text-2xl tracking-widest text-primary mb-1 font-light font-heading">1234 5678 90</p>
           <p className="text-[0.65rem] text-primary/60 uppercase tracking-widest mb-8 font-medium">a/n Romeo Sagara</p>
           
           <button 
             onClick={handleCopy}
             className="px-6 py-4 border-[0.5px] border-gold text-gold text-[0.65rem] uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all duration-500 w-full active:scale-95"
           >
             {copied ? "Berhasil Disalin!" : "Salin Nomor Rekening"}
           </button>
        </div>
      </motion.div>
    </section>
  );
}
