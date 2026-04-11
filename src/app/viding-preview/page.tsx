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
      variant: "default",
      id: "cover-1",
      isVisible: true,
      background: {
        type: "image",
        value: "#ffffff",
        opacity: 1,
        effect: "none",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      },
      backgroundOverlay: {
        enabled: true,
        color: "#000000",
        opacity: 0.45,
      },
      layout: "center",
      ornaments: [],
    },
  },
  globalSettings: {
    primaryColor: "#1a2e25",
    accentColor: "#d4af37",
    fontFamily: "Cormorant Garamond",
    audioUrl: "",
  },
};

export default function VidingPreviewPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <VidingTemplate 
        document={SAMPLE_DOCUMENT} 
        mode="preview" 
        clientData={{
          id: "dummy",
          slug: "preview",
          client_details: {
            bride_name: "Siti",
            groom_name: "Ahmad",
          }
        } as any}
      />
    </main>
  );
}
