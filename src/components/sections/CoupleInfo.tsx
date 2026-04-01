'use client';
import { motion } from 'framer-motion';

export default function CoupleInfo() {
  return (
    <section className="w-full py-24 px-8 text-center bg-cream flex flex-col items-center relative z-10 border-t-[0.5px] border-primary/5">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-md mx-auto w-full"
      >
        <span className="text-[0.6rem] tracking-[0.3em] text-gold mb-4 uppercase block font-medium">Sang Mempelai</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-16 italic font-light drop-shadow-sm">Dua Insan, Satu Cinta</h2>
        
        {/* Mempelai Pria */}
        <div className="mb-16">
          <h3 className="font-heading text-4xl sm:text-5xl text-gold mb-3 tracking-wide">Romeo Sagara</h3>
          <p className="text-xs text-primary/70 mb-4 leading-loose tracking-wider uppercase font-medium">Putra Utama dari <br/> <span className="text-primary/90">Bpk. [Nama Ayah] & Ibu [Nama Ibu]</span></p>
          <a href="#" className="inline-block border-b-[0.5px] border-primary/30 pb-1 text-[0.65rem] text-primary/60 italic tracking-widest hover:text-gold transition-colors">
            @romeosagara
          </a>
        </div>

        {/* Pemisah Simbolis */}
        <div className="flex items-center justify-center gap-4 mb-16 opacity-50">
          <div className="w-8 h-[0.5px] bg-gold"></div>
          <span className="font-heading text-3xl text-gold italic font-light">&amp;</span>
          <div className="w-8 h-[0.5px] bg-gold"></div>
        </div>

        {/* Mempelai Wanita */}
        <div className="mb-8">
          <h3 className="font-heading text-4xl sm:text-5xl text-gold mb-3 tracking-wide">Juliet Kinanti</h3>
          <p className="text-xs text-primary/70 mb-4 leading-loose tracking-wider uppercase font-medium">Putri Bungsu dari <br/> <span className="text-primary/90">Bpk. [Nama Ayah] & Ibu [Nama Ibu]</span></p>
          <a href="#" className="inline-block border-b-[0.5px] border-primary/30 pb-1 text-[0.65rem] text-primary/60 italic tracking-widest hover:text-gold transition-colors">
            @julietkinanti
          </a>
        </div>
      </motion.div>
    </section>
  );
}
