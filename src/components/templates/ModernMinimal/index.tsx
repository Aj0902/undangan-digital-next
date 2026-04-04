import type { Client } from '@/types/client';
import { getMedia } from '@/types/client';
import HeroCover from './sections/HeroCover';
import EventSummary from './sections/EventSummary';
import GiftAndRsvp from './sections/GiftAndRsvp';

export default function ModernMinimalTemplate({ data }: { data: Client }) {
  const { client_details: details, client_media: media } = data;
  const coverUrl = getMedia(media, 'cover');

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HeroCover details={details} coverUrl={coverUrl} />
      <EventSummary details={details} />
      <GiftAndRsvp bankAccounts={details.bank_accounts ?? []} />
    </main>
  );
}
