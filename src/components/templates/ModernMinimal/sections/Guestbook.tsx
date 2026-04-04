export default function Guestbook() {
  const messages = [
    'Semoga bahagia selalu dan langgeng hingga akhir hayat.',
    'Doa terbaik untuk pasangan yang indah ini.',
    'Selamat menempuh hidup baru, semoga penuh berkah dan cinta.'
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Guestbook</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900">Doa & Harapan</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Pesan hangat Anda akan menjadi kenangan berharga untuk hari mereka.</p>
          </div>
          <div className="space-y-4">
            {messages.map((entry, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-base text-slate-700">{entry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
