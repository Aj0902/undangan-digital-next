export const TEMPLATE_ID = 'rustic-boho';

export const MEDIA_MANIFEST = [
  {
    key: 'cover',
    type: 'image' as const,
    label: 'Foto Cover Utama',
    required: true,
  },
  {
    key: 'bride_photo',
    type: 'image' as const,
    label: 'mempelai pria',
    required: false,
  },
  {
    key: 'groom_photo',
    type: 'image' as const,
    label: 'mempelai wanita',
    required: false,
  },
    {
    key: 'gallery_01',
    type: 'image' as const,
    label: 'card foto',
    required: false,
  },
] as const;
