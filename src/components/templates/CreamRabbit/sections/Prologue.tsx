import type { ClientDetails } from '@/types/client';

interface PrologueProps {
  details: ClientDetails;
}

export default function Prologue({ details }: PrologueProps) {
  return (
    <section className="bg-[#F8F4ED] py-24 text-slate-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-700">Prologue</p>
          <blockquote className="mt-6 text-3xl leading-[1.1] font-serif text-slate-900">
            {details.prologue_text || 'Cinta adalah janji yang ditulis oleh dua hati dalam kesadaran bersama.'}
          </blockquote>
          <p className="mt-6 text-sm text-slate-500">— {details.bride_name} & {details.groom_name}</p>
        </div>
      </div>
    </section>
  );
}
