"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Client } from "@/types/client";
import { Section } from "@/types/viding-v3";
import { Send, User, Users, MessageSquare, CheckCircle2 } from "lucide-react";

interface RSVPDefaultProps {
  clientData: Client;
  section: Section;
  accentColor?: string;
}

export default function RSVPDefault({ clientData, section, accentColor = "#D4AF37" }: RSVPDefaultProps) {
  const clientId = clientData.id;
  
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    pax: "1",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [greetings, setGreetings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Greetings
  useEffect(() => {
    const fetchGreetings = async () => {
      // Don't fetch if it's a dummy ID (for builder preview)
      if (!clientId || clientId.startsWith("00000000")) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("rsvp_responses")
          .select("*")
          .eq("client_id", clientId)
          .order("created_at", { ascending: false })
          .limit(10);
        
        if (error) throw error;
        setGreetings(data || []);
      } catch (err: any) {
        console.error("Error fetching rsvp:", err.message || err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGreetings();

    // Subscribe to new RSVP
    const channel = supabase
      .channel(`rsvp-${clientId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvp_responses", filter: `client_id=eq.${clientId}` },
        (payload) => {
          setGreetings(prev => [payload.new, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.attendance) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("rsvp_responses")
        .insert([{
          client_id: clientId,
          guest_name: formData.name,
          attendance_status: formData.attendance === "hadir",
          pax: parseInt(formData.pax),
          greeting_message: formData.message || null
        }]);

      if (error) throw error;
      setFormData({ name: "", attendance: "", pax: "1", message: "" });
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 space-y-16 relative z-10 text-white">
      {/* RSVP FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl mb-2" style={{ color: accentColor }}>Konfirmasi Kehadiran</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Berikan Doa Restu & Konfirmasi Kehadiran Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl focus:outline-none focus:border-white/30 transition-all text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <CheckCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <select
                value={formData.attendance}
                onChange={e => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl focus:outline-none focus:border-white/30 transition-all text-sm appearance-none"
                required
              >
                <option value="" disabled className="bg-zinc-900">Konfirmasi Kehadiran</option>
                <option value="hadir" className="bg-zinc-900">Saya Akan Hadir</option>
                <option value="tidak" className="bg-zinc-900">Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>
            <div className="relative">
              <Users className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <select
                value={formData.pax}
                onChange={e => setFormData({ ...formData, pax: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl focus:outline-none focus:border-white/30 transition-all text-sm appearance-none"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n} className="bg-zinc-900">{n} Orang</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-5 top-6 opacity-30" size={18} />
            <textarea
              placeholder="Tulis ucapan & doa restu..."
              rows={4}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl focus:outline-none focus:border-white/30 transition-all text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.4em] shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            {isSubmitting ? "Mengirim..." : (
              <>
                <Send size={16} /> Kirim Konfirmasi
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* GUESTBOOK FEED */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl opacity-80 italic font-serif">Doa & Ucapan</h3>
          <div className="h-px w-12 bg-white/20 mx-auto mt-4"></div>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <p className="text-center text-[10px] uppercase tracking-widest opacity-30 py-10">Memuat ucapan...</p>
            ) : greetings.length === 0 ? (
              <p className="text-center text-[10px] uppercase tracking-widest opacity-30 py-10 border border-dashed border-white/10 rounded-3xl">Belum ada ucapan. Jadilah yang pertama!</p>
            ) : (
              greetings.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-sm text-white/90">{msg.guest_name}</h4>
                      <p className="text-[9px] opacity-40 uppercase tracking-wider">{new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    {msg.attendance_status ? (
                      <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">Hadir</span>
                    ) : (
                      <span className="text-[8px] bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full border border-red-500/20 font-bold uppercase tracking-widest">Absen</span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed italic">&ldquo;{msg.greeting_message}&rdquo;</p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
