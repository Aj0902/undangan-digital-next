import FadeIn from '@/components/ui/FadeIn';

export default function PrologueSection() {
  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-8 py-32 sm:py-40 bg-transparent text-center">
      <FadeIn className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <span className="uppercase text-[0.65rem] tracking-[0.3em] font-medium text-neutral-500 mb-12">
          The Prologue
        </span>
        
        <h2 className="font-heading text-3xl sm:text-5xl text-primary italic font-light leading-snug mb-16">
          "Dan di antara tanda-tanda kekuasaan-Nya, diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri..."
        </h2>
        
        <p className="text-sm sm:text-base text-primary/80 leading-loose font-light max-w-lg mx-auto">
          Sebuah babak baru dimulai. Bukan sekadar penyatuan dua nama, melainkan pertautan dua takdir dalam harmoni dan rida Ilahi.
        </p>
      </FadeIn>
    </section>
  );
}
