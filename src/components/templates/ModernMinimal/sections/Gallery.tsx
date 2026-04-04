import type { ClientMedia } from '@/types/client';
import { getMedia } from '@/types/client';

interface GalleryProps {
  media: ClientMedia[];
}

export default function Gallery({ media }: GalleryProps) {
  const gallery1 = getMedia(media, 'gallery_1');
  const gallery2 = getMedia(media, 'gallery_2');

  return (
    <section id="gallery" className="bg-slate-50 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Galeri</p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-900">Momen yang ingin kami bagi</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <img
              src={getMedia(media, 'cover') || '/assets/modern-minimal/images/cover-fallback.jpg'}
              alt="Cover image"
              className="h-80 w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <img
              src={gallery1 || '/assets/modern-minimal/images/gallery-fallback-1.jpg'}
              alt="Gallery image 1"
              className="h-80 w-full object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
            <img
              src={gallery2 || '/assets/modern-minimal/images/gallery-fallback-2.jpg'}
              alt="Gallery image 2"
              className="h-80 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
