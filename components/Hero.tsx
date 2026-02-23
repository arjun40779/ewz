'use client';
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import type { HeroData } from '@/lib/fetchSiteData';

interface HeroProps {
  readonly data: HeroData | null;
}

export function Hero({ data }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fallback if no data
  if (!data) {
    return null;
  }

  const primaryButton =
    data?.buttons?.find((button) => button.variant === 'primary') ??
    data.buttons?.[0];
  const secondaryButton =
    data.buttons?.find((button) => button.variant === 'outline') ??
    (data.buttons && data.buttons.length > 1 ? data.buttons[1] : undefined);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-8 border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">
              {data.badgeText}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {data.headline}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            {data.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryButton && (
              <Button
                size="lg"
                onClick={() =>
                  primaryButton.href &&
                  scrollToSection(primaryButton.href.replace('#', ''))
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                {primaryButton.label}
              </Button>
            )}
            {secondaryButton && (
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  secondaryButton.href &&
                  scrollToSection(secondaryButton.href.replace('#', ''))
                }
                className="border-2 border-purple-600 text-purple-600  text-lg px-8 py-6 bg-transparent"
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>

          {/* Stats */}
          {data.stats && data.stats.length > 0 && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {data.stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

