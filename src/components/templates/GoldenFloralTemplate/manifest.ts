export const TEMPLATE_ID = 'golden-floral-template';

export const MEDIA_MANIFEST = [
  {
    key: 'hero_image',
    type: 'image' as const,
    label: 'Foto Cover Utama (Hero)',
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
  }
] as const;
