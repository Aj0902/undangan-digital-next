export const getMedia = (media: any[], key: string) => {
  return media?.find((m) => m.media_key === key)?.cloudinary_url || '';
};
