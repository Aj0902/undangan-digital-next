import type { ClientDetails } from '@/types/client';
import { formatDate, formatTime } from '@/types/client';

interface CountdownCardProps {
  details: ClientDetails;
}

export default function CountdownCard({ details }: CountdownCardProps) {
  const eventDate = details.resepsi_datetime || details.akad_datetime;
  const eventLabel = details.resepsi_datetime ? 'Resepsi' : 'Acara Utama';

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200">{eventLabel}</p>
            <h2 className="mt-4 text-5xl font-serif tracking-[-0.04em]">{formatDate(eventDate)}</h2>
            <p className="mt-3 text-lg text-slate-300">{formatTime(eventDate)}</p>
            <p className="mt-8 max-w-xl text-base leading-7 text-slate-300">
              Sambut hari indah bersama keluarga dan sahabat, di gedung yang dirancang untuk menciptakan momen tak terlupakan.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Lokasi</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">{details.resepsi_venue_name || 'Lokasi akan diumumkan'}</h3>
            <p className="mt-3 text-base text-slate-600">{details.resepsi_venue_address || 'Alamat belum tersedia'}</p>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Keterangan</p>
              <p className="mt-3 text-sm leading-7">Detail acara selalu diperbarui di halaman ini. Pastikan tamu Anda menerima undangan digital dengan akses easy-to-share.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
