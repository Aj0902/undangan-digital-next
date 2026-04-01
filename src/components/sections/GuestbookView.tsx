'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

type Greeting = {
  id: string;
  guest_name: string;
  greeting_message: string;
  created_at: string;
};

export default function GuestbookView() {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGreetings = async () => {
    try {
        const { data, error } = await supabase
            .from('mpv-undangan-digital')
            .select('id, guest_name, greeting_message, created_at')
            .not('greeting_message', 'is', null)
            .neq('greeting_message', '')
            .order('created_at', { ascending: false })
            .limit(50);
            
        if (error) throw error;
        if (data) setGreetings(data);
    } catch (err) {
        console.error("Gagal mengambil data ucapan:", err);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGreetings();
    
    // Memberikan Real-time Listener (Opsional, agar update tanpa refresh)
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mpv-undangan-digital',
        },
        (payload) => {
          // Hanya masukkan ke state jika ucapan tidak kosong
          if (payload.new.greeting_message) {
             setGreetings((prev) => [payload.new as Greeting, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="w-full py-24 px-6 bg-cream border-t-[0.5px] border-primary/5">
      <div className="text-center mb-12">
        <span className="text-[0.6rem] tracking-[0.3em] text-gold mb-4 uppercase block font-medium">Buku Tamu</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary mb-4 italic font-light drop-shadow-sm">Untaian Doa</h2>
        <div className="w-16 mx-auto batik-divider opacity-50 mb-8" />
      </div>

      {/* Box Transparan Melayang untuk Membungkus Pesan */}
      <div className="max-w-md mx-auto w-full h-[450px] overflow-y-auto pr-2 custom-scrollbar space-y-4 relative">
        {isLoading ? (
            <div className="text-center text-primary/40 text-[0.65rem] uppercase tracking-widest italic py-16 animate-pulse">
                Membuka lembaran doa...
            </div>
        ) : greetings.length === 0 ? (
            <div className="text-center text-primary/50 text-[0.65rem] tracking-widest uppercase italic py-16">
                Jadilah yang pertama memberikan doa restu.
            </div>
        ) : (
            greetings.map((greet, idx) => (
                <motion.div 
                    key={greet.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: (idx % 10) * 0.1 }}
                    className="p-5 border-[0.5px] border-gold/30 bg-white/40 backdrop-blur-sm shadow-sm relative group hover:bg-white/60 transition-colors"
                >
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        {/* Motif Sudut Geometris Kecil */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                           <path d="M12 2L2 12l10 10 10-10L12 2z"/>
                        </svg>
                    </div>
                    
                    <h4 className="font-heading text-xl text-primary mb-1">{greet.guest_name}</h4>
                    <p className="text-[0.5rem] tracking-wider text-primary/40 uppercase mb-4 border-b-[0.5px] border-primary/10 pb-2 inline-block">
                        {new Date(greet.created_at).toLocaleDateString('id-ID', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </p>
                    <p className="text-[0.75rem] text-primary/80 leading-loose font-light italic">
                        "{greet.greeting_message}"
                    </p>
                </motion.div>
            ))
        )}
      </div>
    </section>
  );
}
