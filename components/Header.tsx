"use client"
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import type { HeaderData } from '@/lib/fetchSiteData';

interface HeaderProps {
  data: HeaderData | null;
}

export function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="flex items-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {data?.logoText?.charAt(0) ?? 'V'}
                </span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {data?.logoText ?? 'ViralEdits'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {(data?.navigation ?? []).map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href.replace('#', ''))}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            {data?.cta && (
              <Button
                onClick={() =>
                  scrollToSection(data.cta!.href.replace('#', ''))
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {data.cta.label}
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {(data?.navigation ?? []).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href.replace('#', ''))}
                  className="text-gray-700 hover:text-purple-600 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              {data?.cta && (
                <Button
                  onClick={() =>
                    scrollToSection(data.cta!.href.replace('#', ''))
                  }
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full"
                >
                  {data.cta.label}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
