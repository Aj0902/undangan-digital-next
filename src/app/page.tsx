import Link from "next/link";

export default function AgencyLandingPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center p-8 text-neutral-800">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
          Wedding Dreams<br />
          <span className="italic opacity-80">Invitation</span>
        </h1>
        
        <p className="text-neutral-500 uppercase tracking-[0.2em] text-sm hidden md:block">
          Premium Digital Invitation Platform
        </p>

        <div className="pt-8">
          <Link 
            href="/katalog" 
            className="inline-block px-10 py-4 bg-neutral-900 text-white uppercase tracking-[0.2em] text-sm hover:bg-neutral-800 transition-colors duration-300"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
