'use client';
import { motion } from 'motion/react';
import { Video, Calendar, Palette, Zap, Music, Eye } from 'lucide-react';
import Image from 'next/image';
import type { ServiceSection } from '@/lib/fetchSiteData';

interface ServicesProps {
  readonly data: ServiceSection | null;
}

// Icon mapping
const iconMap = {
  video: Video,
  calendar: Calendar,
  palette: Palette,
  zap: Zap,
  music: Music,
  eye: Eye,
  camera: Video,
  star: Eye,
  scissors: Palette,
  'trending-up': Zap,
};

export function Services({ data }: ServicesProps) {
  if (!data?.services?.length) {
    return null;
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {data.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => {
            // Get icon from iconName or use default
            const IconComponent = service.iconName
              ? iconMap[service.iconName as keyof typeof iconMap] || Video
              : Video;

            const gradients = [
              'from-purple-500 to-pink-500',
              'from-pink-500 to-rose-500',
              'from-rose-500 to-orange-500',
              'from-orange-500 to-yellow-500',
              'from-blue-500 to-purple-500',
              'from-cyan-500 to-blue-500',
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <motion.div
                key={`${service._id || index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div
                  className={`relative h-full rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl ${
                    service.highlight
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-400'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-6`}
                  >
                    {service.icon?.asset?.url ? (
                      <Image
                        src={service.icon.asset.url}
                        alt={service.icon.alt || service.title}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <IconComponent className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

