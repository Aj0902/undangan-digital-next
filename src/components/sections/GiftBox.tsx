'use client';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { toast } from 'sonner';

export default function GiftBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    toast.success("Nomor Rekening Berhasil Disalin");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full py-24 px-8 bg-transparent text-center flex flex-col items-center">
      
      <FadeIn className="w-full max-w-sm">
        <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">Tanda Kasih</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light mb-8">Gift</h2>
        <p className="text-sm text-primary/80 mb-16 leading-loose font-light">
          Kehadiran Anda adalah anugerah terindah. Namun jika Anda bermaksud memberikan tanda kasih, dapat mengirimkan melalui amplop digital di bawah ini.
        </p>

        <div className="pt-8 border-t border-neutral-300 w-full">
           <p className="text-[0.65rem] text-neutral-500 tracking-[0.3em] uppercase mb-4">Transfer Bank</p>
           <p className="font-bold text-primary tracking-[0.2em] text-xs uppercase mb-2">BCA</p>
           <p className="text-3xl tracking-widest text-primary mb-2 font-light font-heading">1234 5678 90</p>
           <p className="text-[0.6rem] text-primary/80 uppercase tracking-widest mb-10 font-medium">a/n Romeo Sagara</p>
           
           <button 
             onClick={handleCopy}
             className="px-8 py-5 border border-primary text-primary text-[0.65rem] uppercase tracking-[0.25em] hover:bg-neutral-800 hover:text-white transition-all duration-700 w-full hover:tracking-[0.4em]"
           >
             {copied ? "Berhasil Disalin" : "Salin Nomor Rekening"}
           </button>
        </div>
      </FadeIn>
    </section>
  );
}
