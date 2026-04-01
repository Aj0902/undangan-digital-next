'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Greeting = {
  id: string;
  guest_name: string;
  greeting_message: string;
  created_at: string;
};

export default function GuestbookView() {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGreetings();
    
    // Fitur Live: Otomatis mendengarkan ada ucapan baru saat orang RSVP (Realtime)
    const channel = supabase
      .channel('public:mpv-undangan-digital')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mpv-undangan-digital' }, (payload) => {
        if (payload.new.greeting_message && payload.new.greeting_message.trim() !== '') {
          setGreetings((prev) => [payload.new as Greeting, ...prev]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGreetings = async () => {
    try {
      const { data, error } = await supabase
        .from('mpv-undangan-digital')
        .select('id, guest_name, greeting_message, created_at')
        .not('greeting_message', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const validGreetings = (data || []).filter(g => g.greeting_message && g.greeting_message.trim() !== '');
      setGreetings(validGreetings);
    } catch (error) {
      console.error("Error fetching greetings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section className="w-full py-24 px-6 bg-[#f9f8f4] border-t-[0.5px] border-primary/5 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream to-transparent pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <span className="text-[0.6rem] tracking-[0.3em] text-gold mb-4 uppercase block font-medium">Buku Tamu</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-4 italic font-light drop-shadow-sm">Papan Doa</h2>
        <div className="w-16 mx-auto batik-divider opacity-50" />
      </div>

      <div className="max-w-md mx-auto w-full relative z-10">
        {isLoading ? (
          <div className="text-center py-16 text-primary/40 text-sm animate-pulse italic font-light">Membuka lembaran doa...</div>
        ) : greetings.length === 0 ? (
           <div className="text-center py-12 px-6 text-primary/60 text-[0.8rem] italic border-[0.5px] border-gold/30 bg-white/40 backdrop-blur-sm leading-relaxed">
             Lembar doa masih kosong.<br/>Jadilah yang pertama untuk memberikan restu bahagia!
           </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar relative">
            {greetings.map((greet, idx) => (
              <motion.div 
                key={greet.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.6, delay: 0 }}
                className="bg-white/70 p-6 border-[0.5px] border-gold/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative group hover:bg-white/90 transition-colors"
              >
                 {/* Aksen kertas emas */}
                 <div className="absolute -top-[1.5px] -left-[1.5px] w-3 h-3 border-t-[1px] border-l-[1px] border-gold/60" />
                 
                 <p className="text-[0.8rem] text-primary/90 leading-[1.8] font-light mb-6 text-balance">
                    "{greet.greeting_message}"
                 </p>
                 <div className="flex justify-between items-end border-t-[0.5px] border-gold/20 pt-4">
                    <span className="font-heading text-xl text-gold font-light italic">{greet.guest_name}</span>
                    <span className="text-[0.55rem] tracking-[0.2em] uppercase text-primary/40 text-right">
                       {formatDate(greet.created_at)}
                    </span>
                 </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
