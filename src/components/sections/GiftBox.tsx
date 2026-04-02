'use client';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { toast } from 'sonner';

export default function GiftBox() {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} BERHASIL DISALIN`);
  };

  return (
    <section className="w-full py-24 px-8 bg-transparent text-center flex flex-col items-center">
      
      <FadeIn className="w-full max-w-sm">
        <span className="text-[0.65rem] tracking-[0.3em] text-neutral-500 mb-4 uppercase block font-medium">Tanda Kasih</span>
        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light mb-8">Gift</h2>
        <p className="text-sm text-primary/80 mb-16 leading-loose font-light">
          Doa restu Anda adalah karunia terbesar bagi kami. Namun, apabila Bapak/Ibu/Saudara/i bermaksud memberikan tanda kasih, kami menyediakannya melalui detail berikut. Terima kasih atas segala bentuk perhatian dan kasih sayang Anda.
        </p>

        {/* BCA */}
        <div className="pt-8 pb-10 border-t border-neutral-300 w-full relative">
           <span className="absolute top-10 right-0 font-heading text-6xl text-neutral-200 opacity-[0.2] select-none pointer-events-none z-[-1]">01</span>
           <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] font-bold uppercase mb-4">Transfer Bank 1</p>
           <p className="font-bold text-primary tracking-[0.2em] text-xs uppercase mb-2">BCA</p>
           <p className="text-3xl tracking-widest text-primary mb-2 font-light font-heading">8765432109</p>
           <p className="text-[0.6rem] text-primary/80 uppercase tracking-widest mb-8 font-medium">a.n Zaed Ramadhan</p>
           <button onClick={() => handleCopy("8765432109", "Nomor Rekening")} className="px-8 py-4 border border-primary bg-primary text-white text-[0.65rem] uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all duration-700 w-full hover:tracking-[0.4em]">
             Salin Rekening
           </button>
        </div>

        {/* Mandiri */}
        <div className="pt-8 pb-10 border-t border-neutral-300 w-full relative">
           <span className="absolute top-10 right-0 font-heading text-6xl text-neutral-200 opacity-[0.2] select-none pointer-events-none z-[-1]">02</span>
           <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] font-bold uppercase mb-4">Transfer Bank 2</p>
           <p className="font-bold text-primary tracking-[0.2em] text-xs uppercase mb-2">Mandiri</p>
           <p className="text-3xl tracking-widest text-primary mb-2 font-light font-heading">1098765432</p>
           <p className="text-[0.6rem] text-primary/80 uppercase tracking-widest mb-8 font-medium">a.n Siti Aisyah Prameswari</p>
           <button onClick={() => handleCopy("1098765432", "Nomor Rekening")} className="px-8 py-4 border border-primary bg-primary text-white text-[0.65rem] uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all duration-700 w-full hover:tracking-[0.4em]">
             Salin Rekening
           </button>
        </div>

        {/* QRIS */}
        <div className="pt-8 pb-10 border-t border-neutral-300 w-full relative">
           <span className="absolute top-10 right-0 font-heading text-6xl text-neutral-200 opacity-[0.2] select-none pointer-events-none z-[-1]">03</span>
           <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] font-bold uppercase mb-8">Scan QRIS</p>
           <div className="w-48 h-48 mx-auto border border-neutral-300 mb-6 flex items-center justify-center bg-neutral-100/50 p-4 relative">
             <span className="text-[0.6rem] uppercase tracking-widest text-neutral-400">SCAN QRIS</span>
             {/* Tambahkan Image disini nanti: <Image src="/images/qris.jpg" fill className="object-contain" alt="QRIS" /> */}
           </div>
           <p className="text-[0.6rem] text-primary/80 uppercase tracking-widest font-medium">a.n Siti &amp; Zaed Wedding</p>
        </div>

        {/* Alamat Fisik */}
        <div className="pt-8 pb-8 border-t border-neutral-300 w-full relative">
           <span className="absolute top-10 right-0 font-heading text-6xl text-neutral-200 opacity-[0.2] select-none pointer-events-none z-[-1]">04</span>
           <p className="text-[0.65rem] text-neutral-500 tracking-[0.2em] font-bold uppercase mb-6">Kirim Hadiah Belanja</p>
           <p className="text-[0.65rem] leading-loose tracking-[0.1em] text-primary/90 mb-6 px-4">
             Tatar Jingganagara Blok B No. 8 <br /> Kota Baru Parahyangan, Padalarang <br /> Kabupaten Bandung Barat, 40553
           </p>
           <p className="text-[0.55rem] uppercase text-primary/70 tracking-widest mb-8">Penerima: Zaed Ramadhan (0812-3456-7890)</p>
           <button onClick={() => handleCopy("Tatar Jingganagara Blok B No. 8, Kota Baru Parahyangan, Padalarang, Kabupaten Bandung Barat, 40553 (Penerima: Zaed Ramadhan 0812-3456-7890)", "Alamat")} className="px-8 py-4 border border-primary bg-primary text-white text-[0.65rem] uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all duration-700 w-full hover:tracking-[0.4em]">
             Salin Alamat
           </button>
        </div>

      </FadeIn>
    </section>
  );
}
