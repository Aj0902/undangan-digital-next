export const TEMPLATE_ID = 'cream-rabbit';

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
    key: 'music',
    type: 'audio' as const,
    label: 'Musik Latar',
    required: false,
  },
] as const;
