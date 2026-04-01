'use client';
import { motion } from 'framer-motion';

export default function EventDetails() {
  return (
    <section className="w-full py-24 px-8 bg-cream border-t-[0.5px] border-primary/5 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-batik-pattern opacity-[0.05] pointer-events-none mix-blend-multiply" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.25, 0.8, 0.25, 1] }}
        className="w-full max-w-sm border-[0.5px] border-gold/40 p-8 sm:p-10 relative mt-4 bg-white/40 backdrop-blur-sm"
      >
        {/* Ornamen Sudut (Frame) */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-[1px] border-l-[1px] border-gold" />
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-[1px] border-r-[1px] border-gold" />
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-[1px] border-l-[1px] border-gold" />
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-[1px] border-r-[1px] border-gold" />

        <div className="text-center absolute -top-5 left-0 right-0">
           <span className="bg-[#fcfbf9] px-6 font-heading text-3xl sm:text-4xl text-primary italic font-light drop-shadow-sm">Rangkaian Acara</span>
        </div>

        {/* Akad Nikah */}
        <div className="mt-10 mb-10 text-center">
          <h3 className="font-heading text-2xl text-gold mb-4 tracking-[0.2em] uppercase text-xs">Akad Nikah</h3>
          <p className="text-xs text-primary/80 mb-2 uppercase tracking-widest font-medium">Minggu, 12 Desember 2026</p>
          <p className="text-xs text-primary/70 mb-4">08:00 WIB - Selesai</p>
        </div>

        <div className="w-full batik-divider mb-10 opacity-40" />

        {/* Resepsi */}
        <div className="mb-12 text-center">
          <h3 className="font-heading text-2xl text-gold mb-4 tracking-[0.2em] uppercase text-xs">Resepsi</h3>
          <p className="text-xs text-primary/80 mb-2 uppercase tracking-widest font-medium">Minggu, 12 Desember 2026</p>
          <p className="text-xs text-primary/70 mb-4">11:00 WIB - 14:00 WIB</p>
        </div>

        {/* Lokasi */}
        <div className="text-center pt-6 border-t-[0.5px] border-gold/20">
          <p className="text-[0.6rem] font-medium text-gold mb-4 uppercase tracking-[0.3em]">Lokasi Penyelenggaraan</p>
          <p className="text-xs/relaxed text-primary/80 mb-8 italic">Hotel Mulia Senayan<br/>Jl. Asia Afrika, Gelora, Jakarta Pusat</p>
          <a href="#" className="inline-block w-full px-6 py-4 border-[0.5px] bg-primary border-primary text-cream tracking-[0.25em] text-[0.65rem] uppercase hover:bg-gold hover:border-gold hover:text-white transition-all duration-500">
            Panduan Peta via Maps
          </a>
        </div>
      </motion.div>
    </section>
  );
}
