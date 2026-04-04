import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import Prologue from './sections/Prologue';
import CountdownCard from './sections/CountdownCard';
import SectionHeader from './ui/SectionHeader';

export default function CreamRabbitTemplate({ data }: { data: Client }) {
  const { client_details: details, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <main className="min-h-screen bg-[#F9F5EF] text-slate-900">
      <section className="relative overflow-hidden bg-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Cream Rabbit</p>
              <h1 className="text-5xl font-serif tracking-tight text-slate-900 md:text-7xl">{details.bride_name} & {details.groom_name}</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Sebuah undangan digital yang menghadirkan rasa mewah, hangat, dan tak lekang oleh waktu untuk hari istimewa Anda.
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src={coverUrl || '/assets/cream-rabbit/images/cover-fallback.jpg'}
                alt="Classic Elegant Cover"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionHeader
        title="Cerita Cinta"
        description="Temukan detail acara, doa, dan rangkaian momen yang telah disiapkan khusus untuk perayaan cinta Anda."
      />

      <Prologue details={details} />
      <CountdownCard details={details} />
    </main>
  );
}
