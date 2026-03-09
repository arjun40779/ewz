import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import Testimonial from '@/components/Testimonial';
import { Contact } from '@/components/Contact';
import { DynamicPageRenderer } from '@/components/DynamicPageRenderer';
import { getHomePageData, getHomePage } from '@/lib/fetchSiteData';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageLayoutData = await getHomePage();

  if (pageLayoutData) {
    const metadata: Metadata = {
      title: pageLayoutData.metaTitle || pageLayoutData.title,
      description: pageLayoutData.metaDescription,
    };

    // Add favicon if available from page data
    if (pageLayoutData.favicon?.asset?.url) {
      metadata.icons = {
        icon: pageLayoutData.favicon.asset.url,
      };
    }

    return metadata;
  }

  // Fallback metadata for when page layout data is not available
  return {
    title: 'Home',
    description: 'Welcome to our website',
  };
}

export default async function Home() {
  // Try to get homepage from the new Page Layout system first
  const pageLayoutData = await getHomePage();

  if (pageLayoutData?.sections?.length) {
    // Use the new dynamic page layout system
    return <DynamicPageRenderer sections={pageLayoutData.sections} />;
  }

  // Fallback to the old individual sections approach for backward compatibility
  const { hero, services, portfolio, testimonials, contact } =
    await getHomePageData();

  return (
    <>
      {hero && <Hero data={hero} />}
      {services && <Services data={services} />}
      {portfolio && <Portfolio data={portfolio} />}
      {testimonials && <Testimonial data={testimonials} />}
      <Contact data={contact} />
    </>
  );
}

