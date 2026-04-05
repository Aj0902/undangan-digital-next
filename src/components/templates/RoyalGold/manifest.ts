export const TEMPLATE_ID = 'royal-gold';

export const MEDIA_MANIFEST = [
  {
    key: 'cover',
    type: 'image' as const,
    label: 'Foto Cover Utama (Hero)',
    required: true,
  },
  {
    key: 'epic_image',
    type: 'image' as const,
    label: 'Foto Monolith (Epic Calling)',
    required: true,
  },
  {
    key: 'groom_photo',
    type: 'image' as const,
    label: 'Foto Mempelai Pria',
    required: true,
  },
  {
    key: 'bride_photo',
    type: 'image' as const,
    label: 'Foto Mempelai Wanita',
    required: true,
  },
  {
    key: 'gallery_1',
    type: 'image' as const,
    label: 'Gallery 1',
    required: false,
  },
  {
    key: 'gallery_2',
    type: 'image' as const,
    label: 'Gallery 2',
    required: false,
  },
  {
    key: 'gallery_3',
    type: 'image' as const,
    label: 'Gallery 3',
    required: false,
  },
  {
    key: 'gallery_4',
    type: 'image' as const,
    label: 'Gallery 4',
    required: false,
  },
  {
    key: 'gallery_5',
    type: 'image' as const,
    label: 'Gallery 5',
    required: false,
  },
  {
    key: 'gallery_6',
    type: 'image' as const,
    label: 'Gallery 6',
    required: false,
  },
  {
    key: 'music',
    type: 'audio' as const,
    label: 'Musik Latar (BGM)',
    required: false,
  }
] as const;
