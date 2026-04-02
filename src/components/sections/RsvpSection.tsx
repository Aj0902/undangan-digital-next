'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import FadeIn from '@/components/ui/FadeIn';

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
    <section className="w-full py-24 px-8 bg-transparent flex flex-col items-center">
      <FadeIn className="max-w-sm mx-auto w-full relative z-10 px-4">
        <div className="text-center mb-16">
          <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">Kepastian Hadir</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light">Reservasi</h2>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="formRsvp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative"
              onSubmit={handleSubmit}
            >
              {errorMsg && (
                <div className="p-4 bg-neutral-100 text-primary text-[0.65rem] text-center uppercase tracking-[0.2em]">
                  {errorMsg}
                </div>
              )}

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Nama Tamu (Sesuai Undangan)" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-[0.75rem] uppercase tracking-wider focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400 text-primary"
                  required 
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="relative">
                <select 
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-[0.75rem] uppercase tracking-wider focus:outline-none focus:border-primary transition-colors text-primary appearance-none cursor-pointer"
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
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-[0.75rem] uppercase tracking-wider focus:outline-none focus:border-primary transition-colors text-primary appearance-none cursor-pointer"
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
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-[0.75rem] tracking-wider focus:outline-none focus:border-primary transition-colors placeholder:text-neutral-400 text-primary resize-none"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full py-5 bg-primary text-white tracking-[0.3em] text-[0.65rem] uppercase mt-12 hover:bg-primary/90 transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
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
              className="py-16 text-center"
            >
               <h3 className="font-heading text-4xl text-primary mb-6 italic font-light drop-shadow-sm">Terima Kasih</h3>
               <p className="text-[0.65rem] text-primary/80 leading-loose max-w-[200px] mx-auto uppercase tracking-[0.2em] font-medium">
                 Doa tulus & Konfirmasi Anda <br/> Telah Kami Simpan.
               </p>
               
               <button 
                 onClick={() => {
                   setFormData({name: '', attendance: '', pax: '', message: ''});
                   setIsSuccess(false);
                 }}
                 className="mt-12 text-[0.6rem] text-neutral-400 underline uppercase tracking-widest hover:text-primary transition-colors"
               >
                 Kirim ulang data baru
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </FadeIn>
    </section>
  );
}
