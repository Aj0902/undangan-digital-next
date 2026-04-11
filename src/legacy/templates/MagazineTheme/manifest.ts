export const TEMPLATE_ID = 'magazine-theme';

export const MEDIA_MANIFEST = [
  {
    key: 'cover',
    type: 'image' as const,
    label: 'Main Editorial Cover',
    required: true,
  },
  {
    key: 'gallery_1',
    type: 'image' as const,
    label: 'Protagonist 01 (Bride/Left Photo)',
    required: true,
  },
  {
    key: 'gallery_2',
    type: 'image' as const,
    label: 'Protagonist 02 (Groom/Right Photo)',
    required: true,
  },
  {
    key: 'image_1',
    type: 'image' as const,
    label: 'Feature Story Portrait',
    required: false,
  },
  {
    key: 'music',
    type: 'audio' as const,
    label: 'Background Score (Magazine Vibe)',
    required: false,
  },
] as const;
