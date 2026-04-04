import type { ClientDetails } from '@/types/client';

interface HeroCoverProps {
  details: ClientDetails;
  coverUrl: string;
}

export default function HeroCover({ details, coverUrl }: HeroCoverProps) {
  return (
    <section className="min-h-screen bg-[#F8F1E7] text-slate-900">
      <div className="container mx-auto px-6 py-24 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-600">Rustic Boho</p>
            <h1 className="text-5xl font-serif tracking-tight text-slate-900 md:text-7xl">
              {details.bride_name} & {details.groom_name}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Undangan rustic boho dengan detail alami, tekstur hangat, dan energi kenyamanan yang mendalam.
            </p>
            <div className="inline-flex items-center gap-4">
              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">Pernikahan Intim</span>
              <span className="text-sm text-slate-500">Tanggal: {details.akad_datetime ? new Date(details.akad_datetime).toLocaleDateString('id-ID') : 'Segera diumumkan'}</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
            <img
              src={coverUrl || '/assets/rustic-boho/images/cover-fallback.jpg'}
              alt="Rustic Boho Cover"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-6 py-6 text-white">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-200">Save the Date</p>
              <p className="mt-2 text-2xl font-semibold">{details.akad_datetime ? new Date(details.akad_datetime).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : 'TBA'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
