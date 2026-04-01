'use client';
import { motion } from 'framer-motion';

export default function RsvpSection() {
  return (
    <section className="w-full py-24 px-8 bg-cream border-t-[0.5px] border-primary/5 mb-0 relative">
      <div className="absolute inset-0 bg-batik-pattern opacity-[0.06] pointer-events-none mix-blend-multiply" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-sm mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <span className="text-[0.6rem] tracking-[0.3em] text-gold mb-4 uppercase block font-medium">Kepastian Akan Hadir</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-4 italic font-light drop-shadow-sm">Reservasi</h2>
        </div>

        <form className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nama Tamu (Sesuai Undangan)" 
              className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors placeholder:text-primary/40 text-primary"
              required 
            />
          </div>
          
          <div className="relative">
            <select defaultValue="" className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors text-primary/70 appearance-none cursor-pointer">
              <option value="" disabled hidden>Konfirmasi Kehadiran</option>
              <option value="hadir">Ya, Saya Akan Hadir</option>
              <option value="tidak">Mohon Maaf, Tidak Bisa Hadir</option>
            </select>
          </div>

          <div className="relative">
             <select defaultValue="" className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors text-primary/70 appearance-none cursor-pointer">
              <option value="" disabled hidden>Jumlah Tamu Tersedia</option>
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>

          <div className="relative pt-4">
            <textarea 
              placeholder="Berikan ucapan atau doa yang ingin disampaikan..." 
              rows={4}
              className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors placeholder:text-primary/40 text-primary resize-none"
            ></textarea>
          </div>

          <button 
             type="button"
             className="w-full py-4 bg-primary border-[0.5px] border-primary text-cream tracking-[0.3em] text-[0.65rem] uppercase mt-8 hover:bg-gold hover:border-gold hover:text-white transition-all duration-700"
           >
             Kirim Konfirmasi
           </button>
        </form>

      </motion.div>
    </section>
  );
}
