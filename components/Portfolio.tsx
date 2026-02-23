'use client';
import { motion } from 'motion/react';
import { Play, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { OurWorkSection } from '@/lib/fetchSiteData';

interface PortfolioProps {
  readonly data: OurWorkSection | null;
}

export function Portfolio({ data }: PortfolioProps) {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handlePlayVideo = (index: number) => {
    setPlayingVideo(index);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  // Don't render if no data
  if (!data?.items?.length) {
    return null;
  }

  return (
    <section
      id="portfolio"
      className="py-24 bg-gradient-to-br from-gray-50 to-gray-100"
    >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            // Use Sanity image URL only
            const imageUrl = item.thumbnail?.asset?.url;
            const videoUrl = item.videoFile?.asset?.url;

            // Only render if we have a thumbnail
            if (!imageUrl) {
              return null;
            }

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
              >
                {playingVideo === index ? (
                  <>
                    {/* Video */}
                    <video
                      src={videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      onEnded={handleCloseVideo}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Close button for video */}
                    <button
                      onClick={handleCloseVideo}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors duration-200 z-10"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <ImageWithFallback
                        src={imageUrl}
                        alt={item.thumbnail?.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 "
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-75 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => handlePlayVideo(index)}
                          className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors duration-200"
                        >
                          <Play className="w-8 h-8 text-white fill-white" />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-semibold mb-2">
                    {item.platform}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                    {item.views} views • {item.likes} likes
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

