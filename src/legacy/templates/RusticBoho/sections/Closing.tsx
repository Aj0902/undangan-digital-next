'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';

export default function Closing({ data }: { data: Client }) {
  const { client_details: d } = data;

  return (
    <section className="relative w-full py-48 px-8 md:px-16 bg-white overflow-hidden text-center flex flex-col items-center justify-center">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4A373]/20 to-transparent" />

      {/* Background Decor */}
      <div className="absolute font-accent text-[15rem] text-stone-50 select-none pointer-events-none z-0">
        Thank You
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="max-w-2xl w-full relative z-10"
      >
        <p className="font-body text-base md:text-lg text-stone-500 leading-relaxed italic font-light mb-12">
          "Merupakan Suatu Kebahagiaan Bagi Kami Apabila Bapak/Ibu/Saudara/i Berkenan Hadir Dan Memberikan Doa Restu Kepada Kami. Atas Kehadiran Dan Doa Restunya, Kami Ucapkan Terima Kasih."
        </p>

        <p className="font-heading text-fluid-h3 text-stone-900 tracking-tight leading-none">
          Wassalamu&apos;alaikum Wr. Wb.
        </p>

        <div className="flex flex-col items-center gap-6 py-12">
          <div className="h-px w-12 bg-[#D4A373]/30" />
          <h3 className="font-heading text-fluid-h1 text-stone-900 tracking-tight ">
            {d.bride_name} <span className="font-accent text-5xl align-middle mx-2">&</span> {d.groom_name}
          </h3>
          <div className="h-px w-12 bg-[#D4A373]/30" />
        </div>

        <div className="mt-32">
          <p className="font-heading text-[9px] uppercase tracking-[1.2em] text-stone-300 font-bold">
            Wedding Invitation
          </p>
        </div>
      </motion.div>
    </section>
  );
}
