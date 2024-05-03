import '@styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from '@components/ui/toaster';
import { cn } from '@utils/tailwind';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Footer from '@components/footer';
import Navbar from '@components/navbar';
import { BackToTopButton } from '@components/ui/clientbutton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "Oussama's Portfolio",
    template: "%s | Oussama's Portfolio",
  },
  category: 'technology',
  description:
    'Hi! I am a full stack developer and hobbist gamer based in Morocco! Interested to learn more? Check out my portfolio!',
  keywords: [
    'portfolio',
    'nextjs',
    'tailwindcss',
    'vercel',
    'react',
    'typescript',
    'programmer',
    'coding',
    'developer',
    'full-stack',
    'software',
    'singapore',
    'sg',
  ],
  applicationName: "Oussama's Portfolio",
  authors: [{ name: 'Oussama', url: 'https://hmoura.com' }],
  creator: 'Oussama Hmoura',
  publisher: 'Oussama Hmoura',
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://hmoura.com',
  },
  openGraph: {
    title: "Oussama's Portfolio ",
    description:
      'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
    url: 'https://hmoura.com',
    siteName: 'hmoura.com',
    images: [
      {
        url: 'https://hmoura.com/images/siteImage.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Oussama's Portfolio ",
    description:
      'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
    card: 'summary_large_image',
    images: 'https://hmoura.com/images/siteImage.png',
  },
  appleWebApp: {
    title: "Oussama's Portfolio ",
    capable: true,
    statusBarStyle: 'default',
  },
  metadataBase: new URL('https://hmoura.com'),
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/dark.svg',
        href: '/images/dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/light.svg',
        href: '/images/light.svg',
      },
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'scroll-smooth',
          'flex min-h-screen min-w-full max-w-full flex-col',
          'text-text-light dark:text-text-dark',
          'bg-background-light dark:bg-background-dark',
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex w-full max-w-full grow">
            {children}
            <BackToTopButton />
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};
export default RootLayout;
export const revalidate = 1800; // Revalidate cache every ~30mins
