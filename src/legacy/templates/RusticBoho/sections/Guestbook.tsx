'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Client } from '@/types/client';

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
      .channel(`rsvp-rustic-${clientId}`)
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
        throw new Error("Mohon lengkapi Nama & Konfirmasi Kehadiran.");
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

      toast.success("Doa & Konfirmasi Telah Terkirim");
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengirim RSVP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#FDFBF7] overflow-hidden border-b border-stone-100">
      <div className="max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-24">
        
        {/* RSVP FORM */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="bg-white p-12 rounded-[50px] shadow-2xl relative border border-stone-50"
        >
           <span className="text-[10px] tracking-[0.4em] text-[#D4A373] uppercase font-bold mb-4 block italic text-center">RSVP</span>
           <h2 className="font-heading text-5xl text-stone-900 tracking-tighter leading-none lowercase mb-12 text-center">Reservasi</h2>
           
           <form onSubmit={handleSubmit} className="space-y-8">
              <input 
                type="text" 
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-3xl font-heading text-xl focus:outline-none focus:border-[#D4A373] transition-colors placeholder:text-stone-300 uppercase tracking-tight shadow-inner"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                 <select 
                   value={formData.attendance}
                   onChange={e => setFormData({...formData, attendance: e.target.value})}
                   className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-3xl font-heading text-xl focus:outline-none focus:border-[#D4A373] transition-colors uppercase appearance-none cursor-pointer tracking-tight shadow-inner"
                   required
                 >
                    <option value="" disabled hidden>Will You Attend?</option>
                    <option value="hadir">I Will Attend</option>
                    <option value="tidak">Can&apos;t Attend</option>
                 </select>
                 <select 
                   value={formData.pax}
                   onChange={e => setFormData({...formData, pax: e.target.value})}
                   className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-3xl font-heading text-xl focus:outline-none focus:border-[#D4A373] transition-colors uppercase appearance-none cursor-pointer tracking-tight shadow-inner"
                 >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                 </select>
              </div>

              <textarea 
                placeholder="SEND YOUR SINCERE WISHES"
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-3xl font-heading text-xl focus:outline-none focus:border-[#D4A373] transition-colors placeholder:text-stone-300 uppercase tracking-tight resize-none shadow-inner"
              />

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-[#D4A373] text-white rounded-full text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#BC8A5F] transition-all disabled:opacity-50 shadow-xl"
              >
                {isSubmitting ? 'SENDING...' : 'CONFIRM ATTENDANCE'}
              </button>
           </form>
        </motion.div>

        {/* GUESTBOOK FEED */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="flex flex-col h-full mt-12 md:mt-0"
        >
           <span className="text-[10px] tracking-[0.4em] text-[#D4A373] uppercase font-bold mb-4 block italic">Wishes From Heart</span>
           <h2 className="font-heading text-5xl text-stone-900 tracking-tighter leading-none lowercase mb-12">Buku Tamu</h2>

           <div className="flex-grow space-y-12 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {isLoadingGreetings ? (
                  <p className="text-[10px] uppercase tracking-widest text-stone-300 animate-pulse font-bold">Loading messages...</p>
                ) : greetings.length === 0 ? (
                  <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">No messages yet. Be the first!</p>
                ) : (
                  greetings.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 bg-white/50 rounded-[40px] border border-stone-100 relative shadow-lg"
                    >
                       <div className="flex justify-between items-center mb-4">
                          <h4 className="font-heading text-2xl text-stone-900 italic lowercase">{msg.guest_name}</h4>
                          <span className={`text-[8px] uppercase tracking-widest font-bold px-3 py-2 rounded-full border ${msg.attendance_status ? 'bg-[#D4A373]/10 text-[#D4A373] border-[#D4A373]/20' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>
                             {msg.attendance_status ? 'Attending' : 'Absent'}
                          </span>
                       </div>
                       <p className="font-body text-xs text-stone-500 italic mb-4 font-light">
                          {new Date(msg.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                       </p>
                       <div className="w-8 h-px bg-[#D4A373]/30 mb-4" />
                       <p className="font-body text-sm text-stone-700 leading-relaxed font-light italic text-balance">
                          &ldquo;{msg.greeting_message}&rdquo;
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
