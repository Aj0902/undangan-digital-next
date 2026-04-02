import FadeIn from '@/components/ui/FadeIn';

export default function ColophonSection() {
  return (
    <section className="w-full px-8 py-32 sm:py-40 bg-transparent text-center flex flex-col items-center justify-center">
      <FadeIn className="w-full max-w-lg mx-auto flex flex-col items-center">
        <div className="w-full border-t border-neutral-300 my-12" />

        <h2 className="font-heading text-4xl sm:text-5xl text-primary font-light mb-10">
          Mengiringi Langkah,<br />Menghimpun Doa.
        </h2>
        
        <p className="text-sm sm:text-base text-primary/80 leading-loose font-light mb-20 text-balance">
          Kehadiran dan doa restu Anda adalah lembaran paling bermakna dalam awal kisah kami. Dari lubuk hati terdalam, kami mengucapkan terima kasih.
        </p>
        
        <span className="uppercase text-[0.6rem] sm:text-xs tracking-[0.25em] font-medium text-primary mb-24 block">
          Wassalamu'alaikum Warahmatullahi Wabarakatuh
        </span>

        <p className="uppercase text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-400 font-medium">
          VOL. I — ROMEO &amp; JULIET — MMXXVI
        </p>
      </FadeIn>
    </section>
  );
}
