'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Send, CheckCircle2 } from 'lucide-react';
import type { Client } from '@/types/client';

interface RsvpSectionProps {
  data: Client;
}

export default function RsvpSection({ data }: RsvpSectionProps) {
  const { id: clientId } = data;
  
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    pax: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.attendance) {
        throw new Error("Mohon lengkapi Nama & Konfirmasi Kehadiran.");
      }

      const isAttending = formData.attendance === 'hadir';
      const paxCount = parseInt(formData.pax, 10);

      const { error } = await supabase
        .from('rsvp_responses')
        .insert([
          {
            client_id: clientId,
            guest_name: formData.name,
            attendance_status: isAttending,
            pax: paxCount,
            greeting_message: formData.message || null
          }
        ]);

      if (error) throw error;

      toast.success("Terima kasih atas konfirmasi Anda!");
      setIsSuccess(true);
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengirim konfirmasi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 px-8 bg-[#FDFDFD] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url(/assets/template-classic/paper-texture.png)] bg-cover" />
      
      <div className="max-w-xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-body mb-4">Reservation</p>
          <h2 className="font-heading text-5xl md:text-6xl text-primary font-light mb-6">Konfirmasi Kehadiran</h2>
          <p className="font-body text-xs md:text-sm text-primary/60 tracking-wider leading-relaxed">
            Kehadiran Anda adalah kado terindah bagi kami. Mohon kesediaan Anda untuk memberikan konfirmasi kehadiran.
          </p>
        </motion.div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 border border-gold/20 bg-cream shadow-xl text-center"
          >
            <CheckCircle2 size={48} className="text-gold mb-6" />
            <h3 className="font-heading text-2xl text-primary font-light mb-2">Terima Kasih</h3>
            <p className="font-body text-xs text-primary/60 tracking-widest uppercase">Pesan Anda telah kami simpan.</p>
            <button 
               onClick={() => setIsSuccess(false)}
               className="mt-8 text-[10px] uppercase tracking-[0.3em] text-gold hover:text-primary transition-colors border-b border-gold/30 pb-1"
            >
               Kirim Pesan Lain
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Nama Lengkap" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-gold/30 pt-4 pb-2 text-sm font-body text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-gray-300 placeholder:italic"
                required 
              />
            </div>

            <div className="relative">
              <select 
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                className="w-full bg-transparent border-b border-gold/30 pt-4 pb-2 text-sm font-body text-primary focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                required
              >
                <option value="" disabled hidden className="italic text-gray-300">Konfirmasi Kehadiran</option>
                <option value="hadir">Berkenan Hadir</option>
                <option value="tidak">Mohon Maaf, Berhalangan Hadir</option>
              </select>
            </div>

            <div className="relative">
              <select 
                value={formData.pax}
                onChange={(e) => setFormData({...formData, pax: e.target.value})}
                className="w-full bg-transparent border-b border-gold/30 pt-4 pb-2 text-sm font-body text-primary focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                required
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang</option>
              </select>
            </div>

            <div className="relative">
              <textarea 
                placeholder="Ucapan & Doa Tulus" 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-gold/30 pt-4 pb-2 text-sm font-body text-primary focus:outline-none focus:border-gold transition-colors placeholder:text-gray-300 placeholder:italic resize-none"
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-5 bg-primary text-white font-body text-[10px] uppercase tracking-[0.4em] hover:bg-gold transition-all duration-500 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {isSubmitting ? "MENGIRIM..." : <><Send size={14} /> KIRIM KONFIRMASI</>}
            </motion.button>
          </form>
        )}

        {/* Decorative Divider */}
        <div className="mt-24 opacity-20 flex justify-center">
           <img src="/assets/template-classic/gold-divider.png" alt="" className="w-48" />
        </div>
      </div>
    </section>
  );
}
