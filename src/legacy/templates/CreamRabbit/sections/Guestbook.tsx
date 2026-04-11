'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Client } from '@/types/client';
import { MessageCircleHeart } from 'lucide-react';

export default function RsvpSection({ data }: { data: Client }) {
  const { id: clientId, client_details: d } = data;
  
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    pax: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [greetings, setGreetings] = useState<any[]>([]);
  const [isLoadingGreetings, setIsLoadingGreetings] = useState(true);

  useEffect(() => {
    const fetchGreetings = async () => {
      try {
        const { data: res, error } = await supabase
          .from('rsvp_responses')
          .select('id, guest_name, greeting_message, created_at, attendance_status')
          .eq('client_id', clientId)
          .not('greeting_message', 'is', null)
          .neq('greeting_message', '')
          .order('created_at', { ascending: false })
          .limit(20);
        
        if (error) throw error;
        if (res) setGreetings(res);
      } catch (err) {
        console.error("Error fetching greetings:", err);
      } finally {
        setIsLoadingGreetings(false);
      }
    };

    fetchGreetings();

    const channel = supabase
      .channel(`rsvp-cream-${clientId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'rsvp_responses', filter: `client_id=eq.${clientId}` },
        (payload) => {
          if (payload.new.greeting_message) {
            setGreetings(prev => [payload.new, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.attendance) {
        throw new Error("Mohon lengkapi Nama & Konfirmasi Kehadiran. 🐰");
      }

      const { error } = await supabase
        .from('rsvp_responses')
        .insert([{
          client_id: clientId,
          guest_name: formData.name,
          attendance_status: formData.attendance === 'hadir',
          pax: parseInt(formData.pax, 10),
          greeting_message: formData.message || null
        }]);

      if (error) throw error;

      toast.success("Yay! Pesan manismu sudah terkirim! 💖");
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Oops! Gagal mengirim. Coba lagi ya.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#FCD5CE] overflow-hidden">
      
      {/* Decorative Curvy Background */}
      <div className="absolute top-0 right-0 w-full h-[200px] bg-[#FFE5D9] rounded-b-[50%] blur-3xl opacity-50" />

      <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-20">
        
        {/* RSVP FORM (Chunky Style) */}
        <motion.div
           initial={{ opacity: 0, x: -30, rotate: -2 }}
           whileInView={{ opacity: 1, x: 0, rotate: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100 }}
           className="bg-white p-10 md:p-12 rounded-[50px] shadow-[0_12px_0_#F28482] border-4 border-white relative z-10"
        >
           <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 bg-[#FFE5D9] rounded-full flex items-center justify-center text-[#F28482] mb-4">
                 <MessageCircleHeart size={32} />
              </div>
              <h2 className="font-heading text-4xl text-[#4A4E69] tracking-tighter leading-none lowercase mb-2">Are you coming?</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#FFB5A7]">Let us know!</p>
           </div>
           
           <form onSubmit={handleSubmit} className="space-y-6">
              <input 
                type="text" 
                placeholder="YOUR BEAUTIFUL NAME"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#FFF5F5] border-4 border-[#FFE5D9] p-6 rounded-[30px] font-heading text-xl focus:outline-none focus:border-[#FFB5A7] transition-colors placeholder:text-[#FFB5A7]/50 uppercase tracking-tight shadow-inner"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                 <select 
                   value={formData.attendance}
                   onChange={e => setFormData({...formData, attendance: e.target.value})}
                   className="w-full bg-[#FFF5F5] border-4 border-[#FFE5D9] p-6 rounded-[30px] font-heading text-xl focus:outline-none focus:border-[#FFB5A7] transition-colors font-bold text-[#4A4E69] appearance-none cursor-pointer shadow-inner"
                   required
                 >
                    <option value="" disabled hidden>Will You Attend?</option>
                    <option value="hadir">YES I WILL!</option>
                    <option value="tidak">SADLY NO</option>
                 </select>
                 <select 
                   value={formData.pax}
                   onChange={e => setFormData({...formData, pax: e.target.value})}
                   className="w-full bg-[#FFF5F5] border-4 border-[#FFE5D9] p-6 rounded-[30px] font-heading text-xl focus:outline-none focus:border-[#FFB5A7] transition-colors font-bold text-[#4A4E69] appearance-none cursor-pointer shadow-inner"
                 >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                 </select>
              </div>

              <textarea 
                placeholder="SEND YOUR SWEETEST WISHES..."
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#FFF5F5] border-4 border-[#FFE5D9] p-6 rounded-[30px] font-heading text-xl focus:outline-none focus:border-[#FFB5A7] transition-colors placeholder:text-[#FFB5A7]/50 uppercase tracking-tight resize-none shadow-inner"
              />

              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ y: 5 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 mt-4 bg-[#F28482] text-white rounded-full text-[12px] tracking-[0.3em] font-extrabold uppercase shadow-[0_6px_0_#E56B6F] hover:bg-[#F28482] disabled:opacity-50 transition-all border-2 border-white"
              >
                {isSubmitting ? 'SENDING LOVE...' : 'SEND MY RSVP'}
              </motion.button>
           </form>
        </motion.div>

        {/* GUESTBOOK FEED (Bouncy Cards) */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
           className="flex flex-col h-full bg-white/40 p-8 rounded-[40px] border-4 border-white backdrop-blur-sm"
        >
           <h2 className="font-heading text-4xl text-[#4A4E69] tracking-tighter leading-none lowercase mb-2 text-center">Sweet Notes</h2>
           <p className="text-[10px] uppercase font-bold tracking-widest text-[#FFB5A7] mb-8 text-center">From Loved Ones</p>

           <div className="flex-grow space-y-6 overflow-y-auto max-h-[550px] pr-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {isLoadingGreetings ? (
                  <div className="flex justify-center p-8">
                     <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-4 border-[#FFB5A7] border-t-transparent rounded-full" />
                  </div>
                ) : greetings.length === 0 ? (
                  <p className="text-center text-sm font-bold text-[#4A4E69]/50 uppercase tracking-widest p-8">Belum ada pesan, yuk kirim duluan!</p>
                ) : (
                  greetings.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 150, delay: i * 0.1 }}
                      className="p-6 bg-white rounded-[30px] border-2 border-[#FFE5D9] relative shadow-sm"
                    >
                       <div className="flex justify-between items-center mb-3">
                          <h4 className="font-heading text-2xl text-[#4A4E69] italic lowercase">{msg.guest_name}</h4>
                          <span className={`text-[8px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full ${msg.attendance_status ? 'bg-[#FFB5A7]/20 text-[#F28482]' : 'bg-stone-100 text-stone-400'}`}>
                             {msg.attendance_status ? 'YES!' : 'NO :('}
                          </span>
                       </div>
                       <p className="font-body text-xs text-[#FFB5A7] font-bold mb-3">
                          {new Date(msg.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                       </p>
                       <p className="font-body text-sm text-[#4A4E69] leading-relaxed font-medium bg-[#FFF5F5] p-4 rounded-2xl text-balance">
                          {msg.greeting_message}
                       </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
