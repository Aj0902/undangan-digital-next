'use client';

import { useState } from 'react';
import type { BankAccount } from '@/types/client';
import CopyButton from '../ui/CopyButton';

interface GiftAndRsvpProps {
  bankAccounts: BankAccount[];
}

export default function GiftAndRsvp({ bankAccounts }: GiftAndRsvpProps) {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <section id="gift" className="py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Hadiah Digital</p>
            <h2 className="mt-4 text-4xl font-semibold">Bagikan kasih sayang Anda</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Kirimkan doa dan dukungan melalui transfer kepada keluarga pengantin. Salin nomor rekening dengan cepat dan pastikan semua detail tercatat.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {bankAccounts.map((account) => (
              <div key={account.number} className="rounded-[1.75rem] bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{account.bank}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{account.name}</h3>
                <p className="mt-2 text-lg text-slate-200">{account.number}</p>
                <CopyButton
                  value={account.number}
                  label={`Salin nomor ${account.bank}`}
                  onCopied={() => setCopied(account.number)}
                />
                {copied === account.number ? (
                  <p className="mt-3 text-sm text-emerald-300">Tersalin!</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
