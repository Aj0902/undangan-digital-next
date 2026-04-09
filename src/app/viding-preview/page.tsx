import React from "react";
import VidingTemplate from "@/templates/viding-v3";
import { VidingDocument } from "@/types/viding-v3";

const SAMPLE_DOCUMENT: VidingDocument = {
  id: "a5f9d3b7-4eb3-4b5e-a97c-58e34b8fcf6b",
  version: "3.0",
  name: "Sample Wedding Invitation",
  description: "A pilot invitation preview for Viding Engine v3.0",
  createdAt: "2026-04-08T00:00:00Z",
  updatedAt: "2026-04-08T00:00:00Z",
  sectionOrder: ["cover-1"],
  sections: {
    "cover-1": {
      type: "cover",
      id: "cover-1",
      title: "Wedding Invitation",
      isVisible: true,
      background: {
        type: "image",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        effect: "none",
        value: "#ffffff",
        opacity: 1,
      },
      backgroundColor: "#1a1f3d",
      backgroundOverlay: {
        enabled: true,
        color: "#000000",
        opacity: 0.45,
      },
      layout: "center",
      content: {
        mainText: "Ahmad & Siti",
        subText: "Undangan Digital Sinematik yang Elegan",
        ctaButton: {
          label: "Buka Undangan",
          action: "scroll",
        },
      },
      ornaments: [
        {
          id: "ornament-1",
          type: "shape",
          name: "#ec4899",
          position: { x: 18, y: 25 },
          size: { width: 48, height: 48 },
          rotation: 0,
          opacity: 0.8,
          zIndex: 2,
          x: 18,
          y: 25,
          scale: 1,
          animate: "none",
          animation: {
            type: "bounce",
            duration: 1.4,
            delay: 0,
            easing: "ease-in-out",
          },
        },
        {
          id: "ornament-2",
          type: "shape",
          name: "#f59e0b",
          position: { x: 78, y: 72 },
          size: { width: 40, height: 40 },
          rotation: 35,
          opacity: 0.65,
          zIndex: 2,
          x: 78,
          y: 72,
          scale: 1,
          animate: "none",
          animation: {
            type: "bounce",
            duration: 1.6,
            delay: 0.4,
            easing: "ease-in-out",
          },
        },
      ],
      motion: {
        entrance: {
          type: "fade",
          duration: 1,
          delay: 0,
          easing: "ease-out",
        },
        elements: {
          type: "slide",
          duration: 0.8,
          delay: 0.3,
          easing: "ease-out",
        },
      },
    },
  },
  globalSettings: {
    primaryColor: "#1a2e25",
    accentColor: "#d4af37",
    fontFamily: "Cormorant Garamond",
  },
};

export default function VidingPreviewPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <VidingTemplate document={SAMPLE_DOCUMENT} mode="preview" />
    </main>
  );
}
