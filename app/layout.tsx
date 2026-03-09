import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getHomePage } from '@/lib/fetchSiteData';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getHomePage();

  const metadata: Metadata = {
    title: 'ViralEdits — Professional Short-Form Video Editing',
    description:
      'Expert video editing for TikTok, Instagram Reels, and YouTube Shorts. Transform your raw footage into scroll-stopping content.',
  };

  // Add favicon if available from Sanity
  if (homepageData?.favicon?.asset?.url) {
    metadata.icons = {
      icon: homepageData.favicon.asset.url,
    };
  }

  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

