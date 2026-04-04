'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Client } from '@/types/client';

export default function RsvpSection({ data }: { data: Client }) {
  const { id: clientId } = data;
  
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
      .channel(`rsvp-monarchy-${clientId}`)
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
        throw new Error("Mohon isi formulir dengan lengkap.");
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

      toast.success("Kehadiran Anda telah dicatat di The Royal Ledger.");
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan sistem. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-[#0A0A0A] overflow-hidden border-b border-[#E5E4E2]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 relative z-10 w-full">
        
        {/* Left Side: The Royal Ledger Form */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="w-full md:w-1/2"
        >
           <h2 className="font-heading text-4xl md:text-5xl text-[#E5E4E2] tracking-tighter leading-none lowercase mb-8">The Royal Ledger</h2>
           <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-500 mb-16 border-b border-stone-800 pb-4">Formal RSVP Entry</p>
           
           <form onSubmit={handleSubmit} className="space-y-12">
              <div className="relative">
                <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#E5E4E2]/30 mb-2">Subject Name</p>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-stone-800 py-2 font-body text-xl md:text-2xl focus:outline-none focus:border-[#E5E4E2] transition-colors text-[#E5E4E2] placeholder:text-stone-700"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-12">
                 <div className="relative">
                    <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#E5E4E2]/30 mb-2">Status</p>
                    <select 
                      value={formData.attendance}
                      onChange={e => setFormData({...formData, attendance: e.target.value})}
                      className="w-full bg-[#0A0A0A] border-b border-stone-800 py-2 font-mono text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-[#E5E4E2] transition-colors text-[#E5E4E2] appearance-none cursor-pointer"
                      required
                    >
                       <option value="" disabled hidden>Select</option>
                       <option value="hadir">Attending</option>
                       <option value="tidak">Declined</option>
                    </select>
                 </div>
                 <div className="relative">
                    <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#E5E4E2]/30 mb-2">Personnel</p>
                    <select 
                      value={formData.pax}
                      onChange={e => setFormData({...formData, pax: e.target.value})}
                      className="w-full bg-[#0A0A0A] border-b border-stone-800 py-2 font-mono text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-[#E5E4E2] transition-colors text-[#E5E4E2] appearance-none cursor-pointer"
                    >
                       <option value="1">1 Person</option>
                       <option value="2">2 Persons</option>
                    </select>
                 </div>
              </div>

              <div className="relative">
                 <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[#E5E4E2]/30 mb-2">Declaration</p>
                 <textarea 
                   rows={1}
                   value={formData.message}
                   onChange={e => setFormData({...formData, message: e.target.value})}
                   className="w-full bg-transparent border-b border-stone-800 py-2 font-body text-base focus:outline-none focus:border-[#E5E4E2] transition-colors text-[#E5E4E2] placeholder:text-stone-700 resize-none overflow-hidden"
                   placeholder="Write here..."
                   onInput={(e) => {
                     const target = e.target as HTMLTextAreaElement;
                     target.style.height = 'auto';
                     target.style.height = target.scrollHeight + 'px';
                   }}
                 />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 font-mono text-[10px] tracking-[0.5em] uppercase border border-stone-800 hover:border-[#E5E4E2]/50 text-[#E5E4E2] transition-colors duration-1000 mt-8 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Constitute Entry'}
              </button>
           </form>
        </motion.div>

        {/* Right Side: The Document Feed */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
           className="w-full md:w-1/2 flex flex-col"
        >
           <h2 className="font-heading text-xl text-[#E5E4E2] tracking-tighter leading-none lowercase mb-8 text-right">Ledger Archives</h2>

           <div className="flex-grow max-h-[600px] overflow-y-auto pr-4 custom-scrollbar space-y-px bg-stone-800">
              <AnimatePresence>
                {isLoadingGreetings ? (
                  <div className="p-8 text-center bg-[#0A0A0A]">
                     <span className="font-mono text-[8px] uppercase tracking-widest text-[#E5E4E2]/30 animate-pulse">Retrieving Archives...</span>
                  </div>
                ) : greetings.length === 0 ? (
                  <div className="p-8 text-center bg-[#0A0A0A]">
                     <span className="font-mono text-[8px] uppercase tracking-widest text-[#E5E4E2]/30">The Ledger is Empty.</span>
                  </div>
                ) : (
                  greetings.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="p-8 bg-[#0A0A0A] relative group"
                    >
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#E5E4E2]/30 mb-2">Subject</p>
                             <h4 className="font-heading text-2xl text-[#E5E4E2] italic lowercase leading-none">{msg.guest_name}</h4>
                          </div>
                          <div className="text-right">
                             <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#E5E4E2]/30 mb-2">Status</p>
                             <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${msg.attendance_status ? 'text-emerald-800' : 'text-stone-700'}`}>
                                {msg.attendance_status ? 'Confirmed' : 'Declined'}
                             </span>
                          </div>
                       </div>
                       
                       <div className="border-l border-stone-800 pl-4 py-2">
                          <p className="font-body text-sm leading-relaxed text-[#E5E4E2]/60 font-light">
                             {msg.greeting_message}
                          </p>
                       </div>
                       
                       <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-stone-600 mt-6 pt-4 border-t border-stone-800">
                          Log. {new Date(msg.created_at).toISOString()}
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
