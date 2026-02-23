'use client';
import { motion } from 'motion/react';
import { Star, Quote, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { TestimonialSection } from '@/lib/fetchSiteData';

export default function Testimonial({
  data,
}: {
  readonly data: TestimonialSection | null;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Handle case when data is null or testimonialItems is empty
  if (!data?.testimonialItems?.length) {
    return null;
  }

  // Filter testimonials by type
  const videoTestimonials = data.testimonialItems.filter(
    (t) => t.type === 'video',
  );
  const textTestimonials = data.testimonialItems.filter(
    (t) => t.type === 'text',
  );

  // Fallback images for testimonials
  const fallbackImages = [
    'https://images.unsplash.com/photo-1602566356438-dd36d35e989c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNyZWF0aXZlJTIwZGlyZWN0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE2ODM2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1740871857626-5bc3e36d39b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB2aWRlbyUyMGVkaXRvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTY4MzY1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNjgzNjUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {data.heading}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {data.subHeading}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.map((testimonial, index) => {
            // Use thumbnail if present, otherwise use avatar as thumbnail
            const imageUrl =
              testimonial.thumbnail?.asset?.url ||
              testimonial.avatar?.asset?.url;

            // Only render if we have either thumbnail or avatar
            if (!imageUrl) {
              return null;
            }

            return (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Video Thumbnail */}
                  <ImageWithFallback
                    src={imageUrl}
                    alt={
                      testimonial.thumbnail?.alt ||
                      testimonial.avatar?.alt ||
                      testimonial.name
                    }
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-8 h-8 text-purple-600 fill-purple-600 ml-1" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                    <span className="text-white text-xs font-semibold">
                      0:45
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 left-3 flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={`video-star-${testimonial._id}-${i}`}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Client Info - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-bold text-sm mb-0.5">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">
                      {testimonial.position}
                    </p>
                    <p className="text-white/90 text-xs line-clamp-2 leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Click any video to watch the full testimonial
          </p>
        </motion.div>

        {/* Text Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {textTestimonials.map((testimonial, index) => {
            const imageUrl =
              testimonial.avatar?.asset?.url ||
              fallbackImages[index % fallbackImages.length];

            return (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-16 h-16 text-purple-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={`text-star-${testimonial._id}-${i}`}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                    &quot;{testimonial.content}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={imageUrl}
                        alt={testimonial.avatar?.alt || testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>

                  {/* Gradient Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

