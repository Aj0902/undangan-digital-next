'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Client } from '@/types/client';

export default function GiftAndRsvp({ data }: { data: Client }) {
  const { id: clientId, client_details: details } = data;
  const bankAccounts = details.bank_accounts ?? [];

  const [copied, setCopied] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    pax: '1',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<{name: string, message: string, date: string, attendance: boolean}[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!clientId) return;
      const { data } = await supabase
        .from('rsvp_responses')
        .select('guest_name, greeting_message, created_at, attendance_status')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });
      
      if (data) {
        setMessages(data.filter(d => d.greeting_message).map(d => ({
          name: d.guest_name,
          message: d.greeting_message || '',
          date: d.created_at,
          attendance: d.attendance_status
        })));
      }
    };
    fetchMessages();
  }, [clientId]);

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

      if (formData.message) {
        setMessages(prev => [{
          name: formData.name,
          message: formData.message,
          date: new Date().toISOString(),
          attendance: isAttending
        }, ...prev]);
      }

      toast.success("RSVP Berhasil Dikirim");
      setFormData({ name: '', attendance: '', pax: '1', message: '' });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengirim RSVP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="bg-white border-t border-slate-300">
      {/* Gift Section */}
      {bankAccounts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] border-b border-slate-300">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-300 flex flex-col justify-center bg-slate-50">
            <h2 className="font-sans font-black text-4xl md:text-6xl text-slate-900 tracking-tighter uppercase mb-4">Digital<br/>Gift</h2>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Doa restu Anda merupakan hadiah terindah. Namun jika bermaksud memberi tanda kasih, dapat melalui:
            </p>
          </div>
          <div className="p-0 grid grid-cols-1 md:grid-cols-2">
            {bankAccounts.map((acc, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                className={`p-8 md:p-12 flex flex-col justify-between ${idx % 2 === 0 ? 'border-b md:border-b-0 md:border-r border-slate-300' : 'border-b border-slate-300 md:border-b-0'}`}
              >
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">{acc.bank}</p>
                  <p className="font-sans text-2xl font-black tracking-tight text-slate-900 uppercase">{acc.name}</p>
                </div>
                <div className="mt-12">
                  <p className="font-sans text-4xl font-light tracking-tighter text-slate-900 mb-4">{acc.number}</p>
                  <button 
                    onClick={() => handleCopy(acc.number)}
                    className="w-full border border-slate-900 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    {copied === acc.number ? 'Tersalin' : 'Salin Rekening'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* RSVP & Guestbook Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* RSVP Form */}
        <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-slate-300 bg-slate-900 text-white">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.2 }}
           >
             <h2 className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase mb-4">RSVP</h2>
             <p className="font-sans text-sm text-slate-400 mb-12">Mohon kesediaan Anda untuk memberikan konfirmasi kehadiran.</p>
             
             <form onSubmit={handleSubmit} className="space-y-8">
               <div>
                 <input 
                   type="text" 
                   placeholder="NAMA LENGKAP" 
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-transparent border-b border-slate-700 py-4 font-sans text-lg focus:outline-none focus:border-white transition-colors placeholder:text-slate-600 uppercase"
                   required
                 />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <select 
                   value={formData.attendance}
                   onChange={e => setFormData({...formData, attendance: e.target.value})}
                   className="w-full bg-slate-900 border-b border-slate-700 py-4 font-sans text-lg focus:outline-none focus:border-white transition-colors text-white uppercase appearance-none cursor-pointer"
                   required
                 >
                   <option value="" disabled hidden className="text-slate-600">KEHADIRAN</option>
                   <option value="hadir">HADIR</option>
                   <option value="tidak">TIDAK HADIR</option>
                 </select>
                 <select 
                   value={formData.pax}
                   onChange={e => setFormData({...formData, pax: e.target.value})}
                   className="w-full bg-slate-900 border-b border-slate-700 py-4 font-sans text-lg focus:outline-none focus:border-white transition-colors text-white uppercase appearance-none cursor-pointer"
                 >
                   <option value="1">1 ORANG</option>
                   <option value="2">2 ORANG</option>
                   <option value="3">3 ORANG</option>
                   <option value="4">4 ORANG</option>
                 </select>
               </div>
               <div>
                 <textarea 
                   placeholder="PESAN & DOA" 
                   rows={3}
                   value={formData.message}
                   onChange={e => setFormData({...formData, message: e.target.value})}
                   className="w-full bg-transparent border-b border-slate-700 py-4 font-sans text-lg focus:outline-none focus:border-white transition-colors placeholder:text-slate-600 uppercase resize-none"
                 />
               </div>
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full bg-white text-slate-900 py-6 font-sans text-sm font-bold uppercase tracking-[0.4em] hover:bg-slate-200 transition-colors disabled:opacity-50 mt-8"
               >
                 {isSubmitting ? 'MENGIRIM...' : 'KIRIM KONFIRMASI'}
               </button>
             </form>
           </motion.div>
        </div>

        {/* Guestbook List */}
        <div className="p-8 md:p-16 bg-slate-50 relative">
          {/* Subtle noise or texture could go here */}
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase mb-12 text-slate-900"
          >
            PUJIAN & <br/> HARAPAN
          </motion.h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-300">
            {messages.length === 0 ? (
              <p className="font-sans text-sm text-slate-500 uppercase tracking-widest">BELUM ADA PESAN.</p>
            ) : (
              messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  key={idx} 
                  className="p-6 border border-slate-300 bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-sans font-bold text-lg text-slate-900 uppercase tracking-tight">{msg.name}</h4>
                      <p className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                        {new Date(msg.date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${msg.attendance ? 'border-green-600 text-green-600' : 'border-slate-400 text-slate-500'}`}>
                      {msg.attendance ? 'Hadir' : 'Absen'}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-slate-700 leading-relaxed uppercase">{msg.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
