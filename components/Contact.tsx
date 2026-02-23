'use client';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import type { ContactSection } from '@/lib/fetchSiteData';

interface ContactProps {
  readonly data?: ContactSection | null;
}

export function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  // Don't render section if no data
  if (!data) {
    return null;
  }

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {(data.heading || data.subheading) && (
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {data.heading && (
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {data.heading}
                  </h2>
                )}
                {data.subheading && (
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {data.subheading}
                  </p>
                )}
              </motion.div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Project Details
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your project..."
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {data.emailSection && (
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      {data.emailSection.title && (
                        <h3 className="font-bold text-lg mb-2">
                          {data.emailSection.title}
                        </h3>
                      )}
                      {data.emailSection.primaryEmail && (
                        <p className="text-gray-600">
                          {data.emailSection.primaryEmail}
                        </p>
                      )}
                      {data.emailSection.supportEmail && (
                        <p className="text-gray-600">
                          {data.emailSection.supportEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {data.liveChatSection && (
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      {data.liveChatSection.title && (
                        <h3 className="font-bold text-lg mb-2">
                          {data.liveChatSection.title}
                        </h3>
                      )}
                      {data.liveChatSection.description && (
                        <p className="text-gray-600 mb-3">
                          {data.liveChatSection.description}
                        </p>
                      )}
                      {data.liveChatSection.buttonText && (
                        <Button
                          variant="outline"
                          className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent cursor-pointer"
                        >
                          {data.liveChatSection.buttonText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {data.quickTurnaroundSection && (
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                  {data.quickTurnaroundSection.title && (
                    <h3 className="font-bold text-xl mb-3">
                      {data.quickTurnaroundSection.title}
                    </h3>
                  )}
                  {data.quickTurnaroundSection.description && (
                    <p className="mb-4">
                      {data.quickTurnaroundSection.description}
                    </p>
                  )}
                  {data.quickTurnaroundSection.isAvailable &&
                    data.quickTurnaroundSection.availabilityStatus && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>
                          {data.quickTurnaroundSection.availabilityStatus}
                        </span>
                      </div>
                    )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

