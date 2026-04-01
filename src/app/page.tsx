import HeroCover from "@/components/sections/HeroCover";
import CoupleInfo from "@/components/sections/CoupleInfo";
import EventDetails from "@/components/sections/EventDetails";
import GalleryView from "@/components/sections/GalleryView";
import GiftBox from "@/components/sections/GiftBox";
import RsvpSection from "@/components/sections/RsvpSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-cream flex justify-center overflow-hidden">
      
      {/* Container Lebar: Layout akan terbelah eksklusif di Desktop, bersatu di HP */}
      <div className="w-full flex flex-col lg:flex-row max-w-[1920px]">
        
        {/* =======================================================
            PANEL KIRI (TERKUNCI DI DESKTOP - UNTUK FOTO/GRAPHIC)
            ======================================================= */}
        <div className="hidden lg:flex lg:w-[60%] lg:h-screen lg:sticky top-0 relative overflow-hidden bg-primary items-center justify-center border-r-[0.5px] border-gold/30">
          {/* Ornamen Latar Tipis Emas (Pengganti Foto Sementara) */}
          <div className="absolute inset-0 bg-batik-pattern opacity-[0.4] invert pointer-events-none mix-blend-overlay" />
          
          <div className="z-10 text-center flex flex-col items-center">
            <span className="text-cream/50 uppercase tracking-[0.4em] font-medium text-xs mb-8 block">Pernikahan Suci</span>
            <span className="font-heading text-8xl xl:text-9xl text-cream italic font-light drop-shadow-2xl">Romeo &amp; Juliet</span>
            <div className="w-40 batik-divider my-10 opacity-70 invert" />
            <p className="text-gold uppercase tracking-[0.5em] font-light text-sm">12 . 12 . 2026</p>
          </div>
        </div>

        {/* =======================================================
            PANEL KANAN (UNDANGAN UTAMA YANG BISA DI-SCROLL)
            ======================================================= */}
        <main className="w-full lg:w-[40%] max-w-[500px] mx-auto min-h-screen bg-cream shadow-[0_0_60px_-15px_rgba(0,0,0,0.25)] relative overflow-x-hidden flex-shrink-0">
          <HeroCover />
          <CoupleInfo />
          <EventDetails />
          <GalleryView />
          <GiftBox />
          <RsvpSection />
          
          <footer className="w-full py-12 text-center border-t-[0.5px] border-gold/40 bg-cream">
             <p className="text-[0.55rem] tracking-[0.4em] uppercase text-primary/40 font-medium mb-2">
                Dengan penuh cinta
             </p>
             <p className="font-heading text-xl text-gold italic font-light">Romeo &amp; Juliet</p>
             <p className="text-[0.45rem] tracking-wider text-primary/30 mt-8 uppercase block">
                &copy; 2026 Crafted with Excellence
             </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
