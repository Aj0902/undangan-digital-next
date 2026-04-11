"use client";

import { useEffect, useRef } from "react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { VidingDocument } from "@/types/viding-v3";
import { Client } from "@/types/client";

interface BuilderHydratorProps {
  idOrSlug: string;
  config: VidingDocument | null;
  mode?: "client" | "preset";
  clientData?: Client | null; // Full client object (details + media) for widget data binding
}

/**
 * Komponen ini berfungsi sebagai jembatan untuk memasukkan data yang di-fetch 
 * di Server Component ke dalam Zustand Store yang berjalan di Client Side.
 * 
 * Untuk mode "client": clientData berisi data riil (nama, foto, venue, dll).
 * Untuk mode "preset": clientData di-skip (store akan pakai DUMMY_CLIENT_DATA).
 */
export function BuilderHydrator({ idOrSlug, config, mode = "client", clientData = null }: BuilderHydratorProps) {
  const initDocument = useBuilderStore((state) => state.initDocument);
  const hasInited = useRef(false);

  useEffect(() => {
    // Pastikan inisialisasi hanya terjadi satu kali (Strict Mode safe)
    if (!hasInited.current) {
      console.log(`[BuilderHydrator] Hydrating for ${mode}: ${idOrSlug}, clientData: ${clientData ? 'PROVIDED' : 'DUMMY'}`);
      initDocument(idOrSlug, config, mode, clientData);
      hasInited.current = true;
    }
  }, [idOrSlug, config, initDocument, mode, clientData]);

  return null;
}
