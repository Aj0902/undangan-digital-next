"use client";

import React, { useState } from 'react';
import { Music, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';

import HeroGate from './sections/HeroGate';
import EpicCalling from './sections/EpicCalling';
import Prolog from './sections/Prolog';
import Couple from './sections/Couple';
import EventCountdown from './sections/EventCountdown';
import Gallery from './sections/Gallery';
import DigitalGift from './sections/DigitalGift';
import Rsvp from './sections/Rsvp';
import Closing from './sections/Closing';

export default function RoyalGoldTemplate({ data, guestName }: { data: Client, guestName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { client_details: d, client_media: media } = data;

  // Asset Mapping
  const coverUrl = getMedia(media, 'cover') || 'https://images.unsplash.com/photo-1510076857177-7470076d4098';
  const epicImageUrl = getMedia(media, 'epic_image') || 'https://images.unsplash.com/photo-1520854221256-17451cc331bf';
  const groomPhoto = getMedia(media, 'groom_photo') || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf';
  const bridePhoto = getMedia(media, 'bride_photo') || 'https://images.unsplash.com/photo-1549333321-22f83d97bb3d';
  const musicUrl = getMedia(media, 'music');

  const galleryImages = [
    getMedia(media, 'gallery_1') || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    getMedia(media, 'gallery_2') || "https://images.unsplash.com/photo-1519741497674-611481863552",
    getMedia(media, 'gallery_3') || "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8",
    getMedia(media, 'gallery_4') || "https://images.unsplash.com/photo-1522673607200-1648832cee98",
    getMedia(media, 'gallery_5') || "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    getMedia(media, 'gallery_6') || "https://images.unsplash.com/photo-1465495910483-3407a2398c2d"
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#B89F5D] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@200;400;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-bodoni { font-family: 'Bodoni Moda', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        
        .marble-texture {
          background-image: url("https://www.transparenttextures.com/patterns/white-diamond.png");
          opacity: 0.5;
        }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #B89F5D, transparent);
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #B89F5D; }
      `}</style>

      {/* Floating Audio (Hidden Audio Element) */}
      {musicUrl && isPlaying && (
        <audio src={musicUrl} autoPlay loop />
      )}

      <HeroGate 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        setIsPlaying={setIsPlaying}
        groomName={d.groom_name}
        brideName={d.bride_name}
        guestName={guestName}
        coverUrl={coverUrl}
      />

      {isOpen && (
        <main className="relative">
          {/* Floating BGM Button */}
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed bottom-10 right-10 z-50 w-14 h-14 bg-white border border-stone-200 shadow-2xl rounded-full flex items-center justify-center text-[#B89F5D]"
          >
            {isPlaying ? <Music size={20} className="animate-spin" style={{ animationDuration: '6s' }} /> : <Pause size={20} />}
          </motion.button>

          <EpicCalling epicImageUrl={epicImageUrl} />
          <Prolog />
          <Couple 
            groomName={d.groom_name}
            brideName={d.bride_name}
            groomParents={d.groom_parents}
            brideParents={d.bride_parents}
            groomPhoto={groomPhoto}
            bridePhoto={bridePhoto}
          />
          <EventCountdown 
            targetDate={d.akad_datetime}
            akadTime="08.00 - 10.00"   /* Bisa dibuat dinamis jika kolom tersedia di DB */
            resepsiTime="11.00 - 14.00" 
            venueName={d.resepsi_venue_name}
            venueAddress={d.resepsi_venue_address}
          />
          <Gallery images={galleryImages} />
          <DigitalGift accounts={d.bank_accounts || []} />
          <Rsvp clientId={data.id} />
          <Closing groomName={d.groom_name} brideName={d.bride_name} />
        </main>
      )}
    </div>
  );
}
