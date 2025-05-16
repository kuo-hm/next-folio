export function getImageUrl(imageUrl: string) {
  const backEndUrl = process.env.NEXT_PUBLIC_API_IMAGES_URL;
  if (!backEndUrl) {
    return imageUrl;
  }
  return `${backEndUrl}${imageUrl}`;
}
