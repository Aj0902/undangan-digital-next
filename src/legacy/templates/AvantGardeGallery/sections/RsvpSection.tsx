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
      .channel(`rsvp-avant-${clientId}`)
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
        throw new Error("Mohon identitas dan kepastian kehadiran.");
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

      toast.success("Catatan karya Anda telah disimpan di galeri.");
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Gagal menyisipkan karya. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-stone-50 overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        
        {/* Left Side: Editorial RSVP Form */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1 }}
           className="w-full md:w-1/3"
        >
           <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-stone-400 mb-6 border-b border-stone-200 pb-2">The Guest List</p>
           <h2 className="font-heading text-5xl md:text-6xl text-stone-900 tracking-tighter leading-none lowercase mb-8">Reservation</h2>
           
           <form onSubmit={handleSubmit} className="space-y-8 mt-12">
              <div className="group relative">
                <input 
                  type="text" 
                  placeholder="NAME OF GUEST"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-stone-300 py-4 font-mono text-sm focus:outline-none focus:border-rose-600 transition-colors uppercase tracking-widest text-stone-900 placeholder:text-stone-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="relative">
                    <select 
                      value={formData.attendance}
                      onChange={e => setFormData({...formData, attendance: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-stone-300 py-4 font-mono text-[10px] focus:outline-none focus:border-rose-600 transition-colors uppercase appearance-none cursor-pointer tracking-widest font-bold text-stone-900"
                      required
                    >
                       <option value="" disabled hidden>ATTENDANCE?</option>
                       <option value="hadir">WILL ATTEND</option>
                       <option value="tidak">ABSENT</option>
                    </select>
                 </div>
                 <div className="relative">
                    <select 
                      value={formData.pax}
                      onChange={e => setFormData({...formData, pax: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-stone-300 py-4 font-mono text-[10px] focus:outline-none focus:border-rose-600 transition-colors uppercase appearance-none cursor-pointer tracking-widest font-bold text-stone-900"
                    >
                       <option value="1">1 GUEST</option>
                       <option value="2">2 GUESTS</option>
                    </select>
                 </div>
              </div>

              <div className="relative">
                 <textarea 
                   placeholder="YOUR NOTES / WISHES"
                   rows={3}
                   value={formData.message}
                   onChange={e => setFormData({...formData, message: e.target.value})}
                   className="w-full bg-transparent border-b-2 border-stone-300 py-4 font-mono text-xs focus:outline-none focus:border-rose-600 transition-colors placeholder:text-stone-300 uppercase tracking-widest resize-none text-stone-900"
                 />
              </div>

              <motion.button 
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-6 font-mono text-[10px] tracking-[0.4em] uppercase text-stone-900 border border-stone-900 overflow-hidden hover:text-white transition-colors duration-500 mt-8 font-bold"
              >
                <span className="absolute inset-0 bg-stone-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1] z-0" />
                <span className="relative z-10">{isSubmitting ? 'PROCESSING...' : 'SUBMIT ENTRY'}</span>
              </motion.button>
           </form>
        </motion.div>

        {/* Right Side: The Interactive Mural (Masonry-ish) */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: false, amount: 0.2 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="w-full md:w-2/3 flex flex-col"
        >
           <div className="flex justify-between items-end mb-8 border-b border-stone-200 pb-2">
              <h2 className="font-heading text-4xl text-stone-900 tracking-tighter leading-none lowercase italic text-right w-full mb-4">The Interactive Mural</h2>
           </div>

           <div className="flex-grow max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                 <AnimatePresence mode="popLayout">
                   {isLoadingGreetings ? (
                     <div className="flex justify-center p-8 w-full border border-stone-200 col-span-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 animate-pulse">Loading Canvas...</span>
                     </div>
                   ) : greetings.length === 0 ? (
                     <div className="p-8 border border-stone-200 bg-white">
                        <p className="font-mono text-xs font-bold text-stone-400 uppercase tracking-widest">White Canvas Blank. Be the first creator.</p>
                     </div>
                   ) : (
                     greetings.map((msg, i) => {
                       // Randomized aesthetic blocks for the "mural" vibe
                       const isHighlight = i % 3 === 0;
                       const rotation = i % 2 === 0 ? 'rotate-1' : '-rotate-1';
                       
                       return (
                         <motion.div
                           key={msg.id}
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.8, ease: "easeOut" }}
                           className={`p-6 border border-stone-200 break-inside-avoid shadow-sm transform transition-all hover:scale-105 hover:z-10 ${isHighlight ? 'bg-stone-900 text-stone-50' : 'bg-white text-stone-900'} ${rotation}`}
                         >
                            <div className="flex justify-between items-start mb-4">
                               <h4 className="font-heading text-2xl italic lowercase leading-none">{msg.guest_name}</h4>
                            </div>
                            <p className="font-mono text-[8px] uppercase tracking-[0.2em] mb-4 opacity-50">
                               {new Date(msg.created_at).toLocaleDateString('id-ID', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                            </p>
                            <p className="font-body text-sm leading-relaxed font-light mb-4">
                               "{msg.greeting_message}"
                            </p>
                            <div className="w-full flex justify-end">
                               <span className={`text-[8px] uppercase tracking-[0.3em] font-bold ${msg.attendance_status ? 'text-rose-600' : 'text-stone-400'}`}>
                                  {msg.attendance_status ? 'Marked Present' : 'Absent'}
                               </span>
                            </div>
                         </motion.div>
                       );
                     })
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
