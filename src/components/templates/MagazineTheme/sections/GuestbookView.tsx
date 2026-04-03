'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import FadeIn from '../ui/FadeIn';

type Greeting = {
  id: string;
  guest_name: string;
  greeting_message: string | null;
  created_at: string;
};

interface GuestbookViewProps {
  /** UUID klien — dipakai untuk filter agar hanya tampil ucapan dari klien ini. */
  clientId: string;
}

export default function GuestbookView({ clientId }: GuestbookViewProps) {
  const [greetings, setGreetings] = useState<Greeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGreetings = async () => {
    try {
        const { data, error } = await supabase
            .from('rsvp_responses')
            .select('id, guest_name, greeting_message, created_at')
            .eq('client_id', clientId)          // ← Filter per klien
            .not('greeting_message', 'is', null)
            .neq('greeting_message', '')
            .order('created_at', { ascending: false })
            .limit(50);
            
        if (error) throw error;
        if (data) setGreetings(data as Greeting[]);
    } catch (err) {
        console.error("Gagal mengambil data ucapan:", err);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGreetings();
    
    // Realtime listener — update guestbook tanpa refresh
    const channel = supabase
      .channel(`rsvp-guestbook-${clientId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rsvp_responses',
          filter: `client_id=eq.${clientId}`,   // ← Hanya event dari klien ini
        },
        (payload) => {
          if (payload.new.greeting_message) {
             setGreetings((prev) => [payload.new as Greeting, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  return (
    <section className="w-full py-24 px-6 bg-transparent flex flex-col items-center">
      <FadeIn className="text-center mb-16 px-4">
        <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">Buku Tamu</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light">Untaian Doa</h2>
      </FadeIn>

      {/* Daftar Pesan Guestbook Unstyled */}
      <div className="max-w-lg mx-auto w-full h-[500px] overflow-y-auto pr-4 custom-scrollbar space-y-8 relative">
        {isLoading ? (
            <div className="text-center text-neutral-400 text-[0.65rem] uppercase tracking-widest italic py-16 animate-pulse">
                Membuka lembaran doa...
            </div>
        ) : greetings.length === 0 ? (
            <div className="text-center text-neutral-400 text-[0.65rem] tracking-widest uppercase italic py-16">
                Jadilah yang pertama memberikan doa restu.
            </div>
        ) : (
            greetings.map((greet, idx) => (
                <motion.div 
                    key={greet.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: (idx % 10) * 0.1 }}
                    className="py-6 border-b border-neutral-200 last:border-b-0"
                >
                    <h4 className="font-heading text-2xl text-primary mb-1 italic">{greet.guest_name}</h4>
                    <p className="text-[0.6rem] tracking-[0.2em] text-neutral-400 uppercase mb-4">
                        {new Date(greet.created_at).toLocaleDateString('id-ID', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </p>
                    <p className="text-sm text-primary/80 leading-loose font-light">
                        "{greet.greeting_message}"
                    </p>
                </motion.div>
            ))
        )}
      </div>
    </section>
  );
}
