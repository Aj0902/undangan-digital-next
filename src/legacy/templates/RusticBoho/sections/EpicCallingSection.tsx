"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Client } from "@/types/client";
import { getMedia } from "@/types/client";

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const portraitUrl = getMedia(media, "gallery_01");

  return (
    <section className="relative w-full py-40 px-8 md:px-16 bg-white overflow-hidden border-b border-stone-100 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center max-w-6xl">
        {/* Left Side: Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col justify-center text-center md:text-left order-2 md:order-1"
        >
          <p className="font-accent text-4xl text-[#D4A373] mb-6  font-extrabold italic">
            Undangan
          </p>
          <h2 className="font-heading text-fluid-h2 text-stone-900 tracking-tighter leading-[0.85] mb-12 ">
            Pernikahan <br />{" "}
            <span className="font-accent text-[0.8em] text-stone-300 align-middle">Suci</span>{" "}
            <br /> Kami
          </h2>

          <div className="w-12 h-px bg-[#D4A373]/30 mb-10 mx-auto md:mx-0" />

          <p className="font-body text-base md:text-lg leading-relaxed text-stone-500 max-w-sm italic mx-auto md:mx-0 font-light">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu istri-istri dari jenismu sendiri supaya kamu merasa tenteram
            kepadanya, dan dijadikan-Nya diantaramu rasa kasih sayang.
            Sesungguhnya pada yang demikian itu terdapat tanda-tanda bagi
            orang-orang yang beriman."
            <br />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] font-bold mt-6 block not-italic">QS. Ar-Rum: 21</span>
          </p>
        </motion.div>

        {/* Right Side: Editorial Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative aspect-[4/5] w-full bg-stone-50 overflow-hidden border-8 border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] rounded-[120px_40px_120px_40px] order-1 md:order-2"
        >
          {portraitUrl ? (
            <img
              src={portraitUrl}
              alt="Portrait Visual"
              className="w-full h-full object-cover filter contrast-[1.05] sepia-[0.1] hover:scale-105 transition-all duration-[4s] ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center italic text-stone-200 text-[10px] uppercase tracking-widest font-light font-body">
              Portrait Placeholder
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
