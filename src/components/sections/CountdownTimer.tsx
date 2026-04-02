'use client';

import { useState, useEffect } from 'react';
import FadeIn from '@/components/ui/FadeIn';

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeftValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeftValues = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeftValues;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null; // Hydration fix

  return (
    <section className="w-full pb-24 px-8 bg-transparent flex flex-col items-center">
      <FadeIn className="w-full max-w-sm" direction="up">
        <div className="flex flex-col items-center border-[0.5px] border-neutral-300 py-12 px-2 relative overflow-hidden">
           
           {/* Elemen Ornamen Sudut */}
           <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neutral-400" />
           <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neutral-400" />
           <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neutral-400" />
           <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-400" />

           <span className="text-[0.6rem] uppercase tracking-[0.4em] text-neutral-500 mb-8 font-medium">
             Menuju Hari Bahagia
           </span>

           <div className="flex gap-4 sm:gap-8 justify-center text-primary w-full px-4">
             <div className="flex flex-col items-center text-center">
               <span className="font-heading text-4xl sm:text-5xl font-light mb-1">{timeLeft.days}</span>
               <span className="text-[0.5rem] tracking-widest uppercase text-neutral-400">Hari</span>
             </div>
             
             <span className="font-heading text-4xl sm:text-5xl font-light text-neutral-300">:</span>
             
             <div className="flex flex-col items-center text-center">
               <span className="font-heading text-4xl sm:text-5xl font-light mb-1">{timeLeft.hours}</span>
               <span className="text-[0.5rem] tracking-widest uppercase text-neutral-400">Jam</span>
             </div>
             
             <span className="font-heading text-4xl sm:text-5xl font-light text-neutral-300">:</span>
             
             <div className="flex flex-col items-center text-center">
               <span className="font-heading text-4xl sm:text-5xl font-light mb-1">{timeLeft.minutes}</span>
               <span className="text-[0.5rem] tracking-widest uppercase text-neutral-400">Mnt</span>
             </div>
             
             <span className="font-heading text-4xl sm:text-5xl font-light text-neutral-300">:</span>
             
             <div className="flex flex-col items-center text-center">
               <span className="font-heading text-4xl sm:text-5xl font-light mb-1">{timeLeft.seconds}</span>
               <span className="text-[0.5rem] tracking-widest uppercase text-neutral-400">Dtk</span>
             </div>
           </div>

        </div>
      </FadeIn>
    </section>
  );
}
