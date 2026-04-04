import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import HeroCover from './sections/HeroCover';
import GuestbookPreview from './sections/GuestbookPreview';
import AccentBar from './ui/AccentBar';

export default function RusticBohoTemplate({ data }: { data: Client }) {
  const { client_details: details, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <main className="min-h-screen bg-[#F7EFE1] text-slate-900">
      <HeroCover details={details} coverUrl={coverUrl} />
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <AccentBar label="Detail Acara" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-10 shadow-sm">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Akad</p>
              <h3 className="mt-4 text-3xl font-semibold text-slate-900">{details.bride_name} & {details.groom_name}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">Tanggal: {details.akad_datetime ? new Date(details.akad_datetime).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Segera diumumkan'}</p>
              <p className="mt-2 text-sm text-slate-500">Lokasi: {details.resepsi_venue_address || 'Belum tersedia'}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-10 shadow-sm">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Doa & Cerita</p>
              <p className="mt-4 text-base leading-7 text-slate-600">{details.gift_message || 'Kami menantikan doa dan kehadiran Anda yang penuh makna pada hari pernikahan kami.'}</p>
            </div>
          </div>
        </div>
      </section>
      <GuestbookPreview />
    </main>
  );
}
