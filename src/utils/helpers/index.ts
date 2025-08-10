export function getImageUrl(imageUrl: string) {
  const backEndUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backEndUrl) {
    return imageUrl;
  }
  //uri encoding
  const encodedImageUrl = encodeURIComponent(imageUrl);
  console.log(`${backEndUrl}/public/image?path=${encodedImageUrl}`);
  return `${backEndUrl}/public/image?path=${encodedImageUrl}`;
}

export function getPdfUrl(pdfUrl: string) {
  const backEndUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backEndUrl) {
    return pdfUrl;
  }
  //uri encoding
  const encodedPdfUrl = encodeURIComponent(pdfUrl);
  console.log(`${backEndUrl}/public/pdf?path=${encodedPdfUrl}`);
  return `${backEndUrl}/public/pdf?path=${encodedPdfUrl}`;
}
