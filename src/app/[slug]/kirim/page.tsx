import { notFound } from "next/navigation";
import { getClientBySlug } from "@/lib/getClientData";
import ShareTool from "./ShareTool";

export const dynamic = "force-dynamic";

export default async function KirimUndanganPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const client = await getClientBySlug(slug);

  if (!client) {
    notFound();
  }

  const { bride_name, groom_name } = client.client_details;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-aurora -z-20 opacity-50" />
      <div className="noise-overlay fixed inset-0 opacity-20 pointer-events-none" />
      
      {/* Arctic Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full point-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full point-events-none -z-10" />

      <main className="container max-w-2xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <header className="text-center mb-12 space-y-4">
          <div className="inline-block p-px rounded-full bg-gradient-to-r from-emerald-500/50 to-emerald-500/0 mb-4">
            <div className="px-4 py-1 rounded-full bg-black/80 backdrop-blur-xl border border-white/5">
              <span className="text-[10px] font-bold tracking-[0.4em] text-emerald-400 uppercase">
                Guest Link Generator
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
            Bagikan Kebahagiaan
          </h1>
          <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
            {bride_name} <span className="text-emerald-500/30">&</span> {groom_name}
          </p>
        </header>

        <ShareTool 
          slug={slug} 
          brideName={bride_name} 
          groomName={groom_name} 
        />

        <footer className="mt-20 text-center">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">
            Powered by Viding Engine v3.0
          </p>
        </footer>
      </main>
    </div>
  );
}
