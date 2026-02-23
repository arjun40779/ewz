"use client"
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import type { FooterData } from '@/lib/fetchSiteData';

interface FooterProps {
  data: FooterData | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
};

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {(data?.brandName ?? 'ViralEdits').charAt(0)}
                </span>
              </div>
              <span className="text-xl font-bold">ViralEdits</span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              {data?.description ??
                'Professional video editing team specializing in TikTok, Instagram Reels, and YouTube Shorts. We transform your content into viral sensations.'}
            </p>
            <div className="flex gap-4">
              {(data?.socialLinks ?? []).map((link) => {
                const Icon = iconMap[link.platform] ?? Instagram;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {(data?.quickLinks ?? [
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Team', href: '#team' },
                { label: 'Contact', href: '#contact' },
              ]).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{data?.primaryEmail ?? 'hello@viraledits.com'}</li>
              <li>{data?.secondaryEmail ?? 'support@viraledits.com'}</li>
              <li>{data?.availability ?? 'Available 24/7'}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 ViralEdits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
