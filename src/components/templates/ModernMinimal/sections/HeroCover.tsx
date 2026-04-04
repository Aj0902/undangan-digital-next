import type { ClientDetails } from '@/types/client';

interface HeroCoverProps {
  details: ClientDetails;
  coverUrl: string;
}

export default function HeroCover({ details, coverUrl }: HeroCoverProps) {
  return (
    <section className="min-h-screen bg-white text-slate-900">
      <div className="container mx-auto px-6 py-24 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">The luxury wedding</p>
            <h1 className="text-5xl font-serif uppercase tracking-tight text-slate-900 md:text-7xl">
              {details.bride_name} & {details.groom_name}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
              Undangan digital yang bersih, elegan, dan siap memukau tamu Anda dengan detail acara yang penuh makna.
            </p>
            <div className="space-y-3 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
              <a href="#event" className="inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Detail Acara
              </a>
              <a href="#gallery" className="inline-flex rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300">
                Lihat Galeri
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
            <img
              src={coverUrl || '/assets/modern-minimal/images/cover-fallback.jpg'}
              alt="Cover Undangan"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-6 text-white">
              <p className="text-sm uppercase tracking-[0.35em] opacity-80">Save the date</p>
              <p className="mt-2 text-2xl font-semibold">
                {details.akad_datetime ? new Date(details.akad_datetime).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Tanggal segera hadir'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
