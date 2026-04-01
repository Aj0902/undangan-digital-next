'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    pax: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (!formData.name || !formData.attendance || !formData.pax) {
        throw new Error("Mohon lengkapi Nama, Spesifikasi Kehadiran, & Jumlah Tamu.");
      }

      const isAttending = formData.attendance === 'hadir';
      const paxCount = parseInt(formData.pax, 10);

      const { error } = await supabase
        .from('mpv-undangan-digital')
        .insert([
          {
            guest_name: formData.name,
            attendance_status: isAttending,
            pax: paxCount,
            greeting_message: formData.message || null
          }
        ]);

      if (error) {
        console.error("Supabase Error:", error);
        throw new Error("Koneksi gagal tersimpan. Silakan coba sesaat lagi.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan sistem tidak terduga.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-24 px-8 bg-cream border-t-[0.5px] border-primary/5 mb-0 relative overflow-hidden">
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

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="formRsvp"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 relative"
              onSubmit={handleSubmit}
            >
              {errorMsg && (
                <div className="p-4 bg-[#f8f6eb] text-primary/80 text-[0.65rem] text-center border-[0.5px] border-red-900/40 uppercase tracking-widest shadow-sm">
                  {errorMsg}
                </div>
              )}

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Nama Tamu (Sesuai Undangan)" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors placeholder:text-primary/40 text-primary"
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="relative">
                <select 
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors text-primary/70 appearance-none cursor-pointer"
                  required
                  disabled={isSubmitting}
                >
                  <option value="" disabled hidden>Konfirmasi Kehadiran</option>
                  <option value="hadir">Ya, Saya Akan Hadir</option>
                  <option value="tidak">Mohon Maaf, Tidak Bisa Hadir</option>
                </select>
              </div>

              <div className="relative">
                 <select 
                  value={formData.pax}
                  onChange={(e) => setFormData({...formData, pax: e.target.value})}
                  className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors text-primary/70 appearance-none cursor-pointer"
                  required
                  disabled={isSubmitting}
                 >
                  <option value="" disabled hidden>Jumlah Tamu Tersedia</option>
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>
              </div>

              <div className="relative pt-4">
                <textarea 
                  placeholder="Berikan ucapan atau doa yang ingin disampaikan..." 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b-[0.5px] border-primary/30 py-3 text-[0.8rem] focus:outline-none focus:border-gold transition-colors placeholder:text-primary/40 text-primary resize-none"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full py-4 bg-primary border-[0.5px] border-primary text-cream tracking-[0.3em] text-[0.65rem] uppercase mt-8 hover:bg-gold hover:border-gold hover:text-white transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
               >
                 {isSubmitting ? (
                   <span className="animate-pulse tracking-[0.4em]">Mengirim Doa...</span>
                 ) : (
                   "Kirim Konfirmasi"
                 )}
               </button>
            </motion.form>
          ) : (
            <motion.div 
              key="successMsg"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)", y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
              className="px-6 py-16 border-[0.5px] border-gold/40 bg-white/50 backdrop-blur-md text-center shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] relative"
            >
               {/* Ornamen sudut elegan */}
               <div className="absolute top-2 left-2 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-gold" />
               <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-gold" />
               
               <div className="w-16 h-16 rounded-full border-[0.5px] border-gold flex items-center justify-center mx-auto mb-8 bg-cream shadow-sm">
                  <span className="text-gold text-2xl drop-shadow-sm font-light">✓</span>
               </div>
               <h3 className="font-heading text-4xl text-primary mb-4 italic font-light drop-shadow-sm">Terima Kasih</h3>
               <p className="text-[0.65rem] text-primary/70 leading-loose max-w-[200px] mx-auto uppercase tracking-[0.2em] font-medium">
                 Doa tulus & Konfirmasi Anda <br/> Telah Kami Simpan.
               </p>
               
               <button 
                 onClick={() => {
                   setFormData({name: '', attendance: '', pax: '', message: ''});
                   setIsSuccess(false);
                 }}
                 className="mt-8 text-[0.6rem] text-primary/40 underline italic hover:text-gold transition-colors"
               >
                 Kirim ulang data baru
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
