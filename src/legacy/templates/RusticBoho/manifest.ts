export const TEMPLATE_ID = 'rustic-boho';

export const MEDIA_MANIFEST = [
  {
    key: 'cover',
    type: 'image' as const,
    label: 'Foto Cover Utama',
    required: true,
  },
  {
    key: 'gallery_1',
    type: 'image' as const,
    label: 'Galeri Foto 1',
    required: false,
  },
  {
    key: 'gallery_2',
    type: 'image' as const,
    label: 'Galeri Foto 2',
    required: false,
  },
] as const;
