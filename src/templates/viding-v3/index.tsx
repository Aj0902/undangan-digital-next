"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VidingDocument, Section } from "@/types/viding-v3";
import { Client } from "@/types/client";
import { DUMMY_CLIENT_DATA } from "@/viding-builder/lib/dummy-data";
import { SectionWrapper } from "@/viding-builder/widgets/SectionWrapper";
import { getWidgetComponent } from "@/viding-builder/widgets/registry";
import { AudioPlayer } from "@/viding-builder/components/AudioPlayer";

interface VidingTemplateProps {
  document: VidingDocument;
  mode?: "preview" | "edit";
  onSectionSelect?: (sectionId: string) => void;
  onOrnamentSelect?: (ornamentId: string) => void;
  selectedSectionId?: string;
  selectedOrnamentId?: string;
  clientData?: Client;
  isOpenedExternal?: boolean;
  onOpenExternal?: () => void;
}

export function VidingTemplate({
  document,
  mode = "preview",
  onSectionSelect,
  onOrnamentSelect,
  selectedSectionId,
  selectedOrnamentId,
  clientData: propClientData,
  isOpenedExternal,
  onOpenExternal,
}: VidingTemplateProps) {
  const [internalOpened, setInternalOpened] = useState(false);
  const isOpened = isOpenedExternal !== undefined ? isOpenedExternal : internalOpened;

  const handleOpen = () => {
    if (onOpenExternal) {
      onOpenExternal();
    } else {
      setInternalOpened(true);
    }
  };

  // Gunakan Dummy Data sebagai fallback kalau nggak dikasih dari luar (Mode Pabrik Preset)
  const clientData = propClientData || (DUMMY_CLIENT_DATA as Client);

  const renderSection = (section: Section | undefined) => {
    if (!section) return null;
    const isActive = selectedSectionId === section.id;
    
    // Ambil komponen variasi dari Registry berdasarkan tipe dan variannya
    const WidgetComponent = getWidgetComponent(section.type, section.variant);

    // Determine if this is the Cover section — pass isOpened/onOpen
    const isCover = section.type === 'cover';

    return (
      <SectionWrapper
        key={section.id}
        section={section}
        globalSettings={document.globalSettings}
        isActive={isActive}
        mode={mode}
        onSelect={() => onSectionSelect?.(section.id)}
        onOrnamentSelect={onOrnamentSelect}
        selectedOrnamentId={selectedOrnamentId}
      >
        {WidgetComponent ? (
          <WidgetComponent 
            clientData={clientData} 
            section={section}
            accentColor={document.globalSettings?.accentColor}
            primaryColor={document.globalSettings?.primaryColor}
            isSelected={isActive}
            // Cover-specific props for integrated Opening
            {...(isCover ? { isOpened, onOpen: handleOpen } : {})}
          />
        ) : (
          <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h2 className="text-red-400 font-bold">Unregistered Widget Component</h2>
            <p className="text-[10px] text-red-400/60 uppercase">Type: {section.type} | Variant: {section.variant}</p>
          </div>
        )}
      </SectionWrapper>
    );
  };

  // Cover section is always rendered (handles both Opening overlay & normal display)
  // Other sections only render after invitation is opened
  const coverSectionId = document.sectionOrder.find(id => document.sections[id]?.type === 'cover');
  const otherSectionIds = document.sectionOrder.filter(id => {
    const sec = document.sections[id];
    return sec && sec.type !== 'cover' && sec.type !== 'opening'; // skip deprecated opening sections
  });

  return (
    <div id="viding-canvas-area" className={mode === "edit" ? "relative w-full max-w-[420px] h-full shadow-2xl bg-black overflow-y-auto custom-scrollbar pb-64 scroll-smooth" : "relative min-h-screen bg-black overflow-x-hidden"}>
      <AudioPlayer 
        url={document.globalSettings?.audioUrl || ""} 
        isInvitationOpened={isOpened} 
      />

      {/* Cover Section — Always visible, handles Opening overlay internally */}
      {coverSectionId && renderSection(document.sections[coverSectionId])}

      {/* Other Sections — Only visible after invitation opened */}
      <AnimatePresence mode="wait">
        {isOpened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {otherSectionIds
              .map((sectionId) => renderSection(document.sections[sectionId]))
              .filter(Boolean)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VidingTemplate;
