/** @type {import('next').NextConfig} */
let imageDomain = process.env.NEXT_PUBLIC_API_DOMAIN || 'localhost';
imageDomain = imageDomain.split('://')[1] || imageDomain; // Ensure we only use the hostname
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'http', hostname: imageDomain },
      { protocol: 'https', hostname: imageDomain },
    ],
  },
  experimental: { taint: true },
};

module.exports = nextConfig;
