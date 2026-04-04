'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

interface GuestbookPreviewProps {
  initialMessages?: string[];
}

export default function GuestbookPreview({ initialMessages = [] }: GuestbookPreviewProps) {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setMessages((current) => [message.trim(), ...current].slice(0, 5));
    setMessage('');
  }

  return (
    <section className="py-24 bg-[#FEF7EE] text-slate-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Guestbook</p>
            <h2 className="mt-4 text-4xl font-semibold">Tinggalkan pesan hangat</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tulis doa atau harapan terbaikmu..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 focus:border-amber-300 focus:outline-none"
              rows={4}
            />
            <button type="submit" className="inline-flex rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700">
              Kirim Pesan
            </button>
          </form>

          <div className="mt-10 space-y-4">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">Belum ada pesan. Jadilah yang pertama memberikan doa terbaik.</p>
            ) : (
              messages.map((entry, index) => (
                <div key={`${entry}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-700">{entry}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
