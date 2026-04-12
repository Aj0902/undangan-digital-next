"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Client } from "@/types/client";
import { getMedia } from "@/types/client";

export default function EpicCallingSection({ data }: { data: Client }) {
  const { client_details: d, client_media: media } = data;
  const portraitUrl = getMedia(media, "gallery_01");

  return (
    <section className="relative w-full py-32 px-8 md:px-16 bg-white overflow-hidden border-b border-stone-100 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center max-w-5xl">
        {/* Left Side: Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <span className="text-[10px] tracking-[0.4em] text-[#D4A373] uppercase font-bold mb-8 italic">
            Invitation
          </span>
          <h2 className="font-heading text-5xl md:text-7xl text-stone-900 tracking-tighter leading-tight mb-12 lowercase">
            We Are <br />{" "}
            <span className="italic font-light text-stone-300">Getting</span>{" "}
            <br /> Married
          </h2>

          <div className="w-12 h-px bg-[#D4A373] mb-8 mx-auto md:mx-0" />

          <p className="font-body text-sm md:text-base leading-relaxed text-stone-600 max-w-sm italic mx-auto md:mx-0 font-light">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu istri-istri dari jenismu sendiri supaya kamu merasa tenteram
            kepadanya, dan dijadikan-Nya diantaramu rasa kasih sayang.
            Sesungguhnya pada yang demikian itu terdapat tanda-tanda bagi
            orang-orang yang beriman.(QS. Ar-Rum: 21)"
          </p>
        </motion.div>

        {/* Right Side: Editorial Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden border border-stone-200 shadow-2xl rounded-tr-[100px] rounded-bl-[100px]"
        >
          {portraitUrl ? (
            <img
              src={portraitUrl}
              alt="Portrait Visual"
              className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%] hover:grayscale-0 hover:scale-105 transition-all duration-1000"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center italic text-stone-300 text-[10px] uppercase tracking-widest font-light">
              Portrait Placeholder
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
