import type { ClientDetails } from '@/types/client';
import { formatDate, formatTime } from '@/types/client';

interface EventSummaryProps {
  details: ClientDetails;
}

export default function EventSummary({ details }: EventSummaryProps) {
  return (
    <section id="event" className="bg-slate-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-sm uppercase tracking-[0.35em] text-slate-500">Akad</h2>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatDate(details.akad_datetime)}</p>
            <p className="mt-1 text-sm text-slate-500">{formatTime(details.akad_datetime)}</p>
            <p className="mt-5 text-sm text-slate-600">{details.resepsi_venue_name || 'Gedung acara'} - {details.resepsi_venue_address || 'Alamat akan segera ditambahkan'}</p>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-sm uppercase tracking-[0.35em] text-slate-500">Resepsi</h2>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{formatDate(details.resepsi_datetime)}</p>
            <p className="mt-1 text-sm text-slate-500">{formatTime(details.resepsi_datetime)}</p>
            <p className="mt-5 text-sm text-slate-600">{details.resepsi_venue_address || 'Lokasi akan dikonfirmasi'}</p>
          </article>

          <article className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-sm uppercase tracking-[0.35em] text-slate-500">Pengantin</h2>
            <p className="mt-4 text-xl font-semibold text-slate-900">{details.bride_name}</p>
            <p className="mt-1 text-sm text-slate-600">Putri dari {details.bride_parents || 'orang tua tercinta'}</p>
            <p className="mt-6 text-xl font-semibold text-slate-900">{details.groom_name}</p>
            <p className="mt-1 text-sm text-slate-600">Putra dari {details.groom_parents || 'orang tua tercinta'}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
