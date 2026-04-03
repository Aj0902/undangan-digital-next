import FadeIn from '../ui/FadeIn';

export default function ColophonSection() {
  return (
    <section className="w-full px-8 py-32 sm:py-40 bg-transparent text-center flex flex-col items-center justify-center">
      <FadeIn className="w-full max-w-lg mx-auto flex flex-col items-center">
        <div className="w-full border-t border-neutral-300 my-12" />

        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light mb-10">
          Mengiringi Langkah,<br />Menghimpun Doa.
        </h2>
        
        <p className="text-sm sm:text-base text-primary/80 leading-loose font-light mb-16 text-balance">
          Lembaran ini hanyalah awal dari cerita kami. Dari lubuk hati terdalam, kami mengucapkan terima kasih atas segala doa yang mengiringi langkah kami.
        </p>
        
        <span className="text-[0.65rem] sm:text-xs tracking-[0.2em] font-medium text-primary mb-12 block">
          Wassalamu’alaikum Warahmatullahi Wabarakatuh.
        </span>

        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-medium">Kami yang berbahagia,</p>
        <span className="font-heading text-4xl text-primary italic font-light mb-24 block">Siti &amp; Zaed</span>

        <p className="uppercase text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-400 font-medium tracking-widest">
          VOL. I — SITI &amp; ZAED — MMXXVI
        </p>
      </FadeIn>
    </section>
  );
}
