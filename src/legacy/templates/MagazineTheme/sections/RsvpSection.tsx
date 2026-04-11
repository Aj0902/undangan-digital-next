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
      .channel(`rsvp-magazine-${clientId}`)
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

      toast.success("Konfirmasi & Doa Telah Terkirim");
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengirim RSVP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-24 px-8 md:px-16 bg-stone-50 overflow-hidden border-b border-stone-200">
      <div className="max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-24">
        
        {/* Left Column: RSVP Form */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
        >
           <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-4 block italic">The RSVP</span>
           <h2 className="font-heading text-5xl text-stone-900 tracking-tighter uppercase mb-6">Reservation</h2>
           <p className="text-[10px] leading-relaxed tracking-[0.1em] text-stone-500 uppercase mb-12">
              Mohon konfirmasi kehadiran Anda demi kelancaran acara kami.
           </p>

           <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="FULL NAME"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-stone-200 py-4 font-heading text-lg focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300 uppercase tracking-tight"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="relative">
                    <select 
                      value={formData.attendance}
                      onChange={e => setFormData({...formData, attendance: e.target.value})}
                      className="w-full bg-transparent border-b border-stone-200 py-4 font-heading text-lg focus:outline-none focus:border-stone-900 transition-colors uppercase appearance-none cursor-pointer tracking-tight"
                      required
                    >
                      <option value="" disabled hidden>ATTENDANCE</option>
                      <option value="hadir">WILL ATTEND</option>
                      <option value="tidak">CAN'T ATTEND</option>
                    </select>
                 </div>
                 <div className="relative">
                    <select 
                      value={formData.pax}
                      onChange={e => setFormData({...formData, pax: e.target.value})}
                      className="w-full bg-transparent border-b border-stone-200 py-4 font-heading text-lg focus:outline-none focus:border-stone-900 transition-colors uppercase appearance-none cursor-pointer tracking-tight"
                    >
                      <option value="1">1 PERSON</option>
                      <option value="2">2 PERSONS</option>
                    </select>
                 </div>
              </div>

              <div className="relative">
                 <textarea 
                   placeholder="YOUR WISHES & MESSAGE"
                   rows={3}
                   value={formData.message}
                   onChange={e => setFormData({...formData, message: e.target.value})}
                   className="w-full bg-transparent border-b border-stone-200 py-4 font-heading text-lg focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300 uppercase tracking-tight resize-none"
                 />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-stone-900 text-white text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-black transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'SENDING...' : 'CONFIRM ATTENDANCE'}
              </button>
           </form>
        </motion.div>

        {/* Right Column: Guestbook */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           className="flex flex-col h-full"
        >
           <span className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mb-4 block italic">The Reader's Corner</span>
           <h2 className="font-heading text-5xl text-stone-900 tracking-tighter uppercase mb-12">Wishes</h2>

           <div className="flex-grow space-y-12 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {isLoadingGreetings ? (
                  <p className="text-[10px] uppercase tracking-widest text-stone-300 animate-pulse">Loading messages...</p>
                ) : greetings.length === 0 ? (
                  <p className="text-[10px] uppercase tracking-widest text-stone-300">No messages yet.</p>
                ) : (
                  greetings.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-l-2 border-stone-200 pl-8 relative"
                    >
                       <div className="flex justify-between items-start mb-2">
                          <h4 className="font-heading text-2xl text-stone-900 italic serif">{msg.guest_name}</h4>
                          <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 border ${msg.attendance_status ? 'border-stone-900 text-stone-900' : 'border-stone-300 text-stone-400'}`}>
                             {msg.attendance_status ? 'Attending' : 'Absent'}
                          </span>
                       </div>
                       <p className="text-xs text-stone-500 font-mono tracking-widest uppercase mb-4">
                          {new Date(msg.created_at).toLocaleDateString('id-ID', { month: 'short', day: '2-digit' })}
                       </p>
                       <p className="font-body text-sm text-stone-700 leading-relaxed italic uppercase tracking-tight">
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
