'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import FadeIn from '@/components/ui/FadeIn';
import { toast } from 'sonner';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    pax: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      toast.success("DOA TULUS & KONFIRMASI ANDA TELAH KAMI SUTING");
      setFormData({ name: '', attendance: '', pax: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan sistem tidak terduga.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-24 px-8 bg-transparent flex flex-col items-center">
      <FadeIn className="max-w-sm mx-auto w-full relative z-10 px-4">
        <div className="text-center mb-16 px-4">
          <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">Kepastian Hadir</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light mb-8">Reservasi</h2>
          <p className="text-sm text-primary/80 leading-loose font-light">
            Mohon kesediaan Anda untuk mengonfirmasi kehadiran serta meninggalkan pesan singkat untuk melengkapi hari bahagia kami.
          </p>
        </div>

        <form 
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
             className="w-full py-5 bg-primary text-white tracking-[0.3em] text-[0.65rem] uppercase mt-12 hover:bg-neutral-800 hover:tracking-[0.4em] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
           >
             {isSubmitting ? (
               <span className="animate-pulse tracking-[0.4em]">Mengirim Doa...</span>
             ) : (
               "Kirim Konfirmasi"
             )}
           </button>
        </form>
      </FadeIn>
    </section>
  );
}
