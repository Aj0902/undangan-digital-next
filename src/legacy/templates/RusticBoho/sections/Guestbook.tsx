import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { supabase } from "../../../../lib/supabase";
import { toast } from "sonner";
import type { Client } from "../../../../types/client";

export default function RsvpSection({ data }: { data: Client }) {
  const { id: clientId, client_details: d } = data;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrnLeft = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const yOrnRight = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    pax: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [greetings, setGreetings] = useState<any[]>([]);
  const [isLoadingGreetings, setIsLoadingGreetings] = useState(true);

  useEffect(() => {
    const fetchGreetings = async () => {
      try {
        const { data: res, error } = await supabase
          .from("rsvp_responses")
          .select(
            "id, guest_name, greeting_message, created_at, attendance_status",
          )
          .eq("client_id", clientId)
          .not("greeting_message", "is", null)
          .neq("greeting_message", "")
          .order("created_at", { ascending: false })
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
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rsvp_responses",
          filter: `client_id=eq.${clientId}`,
        },
        (payload) => {
          if (payload.new.greeting_message) {
            setGreetings((prev) => [payload.new, ...prev]);
          }
        },
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
        throw new Error("Mohon Lengkapi Nama & Konfirmasi Kehadiran.");
      }

      const { error } = await supabase.from("rsvp_responses").insert([
        {
          client_id: clientId,
          guest_name: formData.name,
          attendance_status: formData.attendance === "Hadir",
          pax: parseInt(formData.pax, 10),
          greeting_message: formData.message || null,
        },
      ]);

      if (error) throw error;

      toast.success("Doa & Konfirmasi Telah Terkirim");
      setFormData({ name: "", attendance: "", pax: "1", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Gagal Mengirim Konfirmasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full py-32 px-8 md:px-16 overflow-hidden border-b border-stone-100">
      {/* Floating Parallax Ornaments - Accurate Placement */}
      <motion.img 
        src="/assets/rustic-boho/images/Or-kiri.svg"
        style={{ y: yOrnLeft, rotate: 15 }}
        className="absolute -left-32 top-10 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kiri"
      />
      <motion.img 
        src="/assets/rustic-boho/images/Or-kanansvg.svg"
        style={{ y: yOrnRight, rotate: -25 }}
        className="absolute -right-32 bottom-20 w-80 md:w-[45rem] opacity-[0.15] pointer-events-none z-0"
        alt="Ornament Kanan"
      />

       {/* Bridge Ornament to Closing */}
       <motion.img 
        src="/assets/rustic-boho/images/or-bawah-tengah.svg"
        style={{ y: yOrnLeft }}
        className="absolute -bottom-24 left-1/4 w-80 opacity-[0.2] pointer-events-none z-20"
        alt="Bridge Ornament"
      />

      <div className="max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-24 relative z-10">
        {/* RSVP FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="bg-white p-10 md:p-14 rounded-[60px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative border border-stone-50"
        >
          <div className="text-center mb-12">
             <p className="font-accent text-4xl text-[#D4A373] mb-[-0.5rem] ">Mohon Doa</p>
             <h2 className="font-heading text-fluid-h3 text-stone-900 tracking-tighter leading-none ">
               Konfirmasi
             </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] text-stone-300 ml-6 font-bold">
                Nama Tamu
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-[30px] font-body text-base focus:outline-none focus:border-[#D4A373] transition-colors placeholder:text-stone-300 tracking-tight"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] text-stone-300 ml-6 font-bold">
                Apakah Anda Akan Hadir?
              </label>
              <select
                value={formData.attendance}
                onChange={(e) =>
                  setFormData({ ...formData, attendance: e.target.value })
                }
                className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-[30px] font-body text-base focus:outline-none focus:border-[#D4A373] transition-colors uppercase appearance-none cursor-pointer tracking-[0.2em] font-bold text-stone-500"
                required
              >
                <option value="" disabled hidden>
                  Silakan Pilih
                </option>
                <option value="Hadir">Ya, Saya Akan Hadir</option>
                <option value="tidak">Maaf, Berhalangan Hadir</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.4em] text-stone-300 ml-6 font-bold">
                Pesan & Doa Restu
              </label>
              <textarea
                placeholder="Tuliskan Doa Terbaik Anda Di Sini..."
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                 className="w-full bg-[#FDFBF7] border border-stone-100 p-6 rounded-[30px] font-body text-base focus:outline-none focus:border-[#D4A373] transition-colors placeholder:text-stone-300 tracking-tight resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-stone-900 text-white rounded-full text-[10px] tracking-[0.5em] uppercase font-bold hover:bg-[#D4A373] transition-all disabled:opacity-50 shadow-2xl"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
            </button>
          </form>
        </motion.div>

        {/* GUESTBOOK FEED */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          className="flex flex-col h-full mt-16 md:mt-0"
        >
          <div className="mb-12">
             <p className="font-accent text-4xl text-[#D4A373] mb-[-0.5rem] ">Warm</p>
             <h2 className="font-heading text-fluid-h3 text-stone-900 tracking-tighter leading-none ">
               Messages
             </h2>
          </div>

          <div className="flex-grow space-y-10 overflow-y-auto max-h-[550px] pr-4 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {isLoadingGreetings ? (
                <p className="text-[10px] uppercase tracking-widest text-stone-300 animate-pulse font-bold">
                  Sedang Memuat Doa...
                </p>
              ) : greetings.length === 0 ? (
                <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold italic">
                  Belum Ada Pesan. Jadilah Yang Pertama Mengirim Doa Terbaik!
                </p>
              ) : (
                greetings.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 bg-white rounded-[40px] border border-stone-50 relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                         <h4 className="font-heading text-lg text-stone-900  tracking-tight">
                           {msg.guest_name}
                         </h4>
                         <p className="font-body text-[10px] text-stone-300 uppercase tracking-widest font-bold">
                           {new Date(msg.created_at).toLocaleDateString("id-ID", {
                             month: "short",
                             day: "numeric",
                             year: "numeric",
                           })}
                         </p>
                      </div>
                      <span
                        className={`text-[8px] uppercase tracking-[0.2em] font-extrabold px-3 py-1.5 rounded-full border ${msg.attendance_status ? "bg-[#D4A373]/10 text-[#D4A373] border-[#D4A373]/20" : "bg-stone-50 text-stone-400 border-stone-100"}`}
                      >
                        {msg.attendance_status ? "Hadir" : "Absen"}
                      </span>
                    </div>
                    <div className="w-8 h-px bg-[#D4A373]/20 mb-6" />
                    <p className="font-body text-sm text-stone-600 leading-relaxed font-light italic">
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
