import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import Testimonial from '@/components/Testimonial';
import { Contact } from '@/components/Contact';
import { DynamicPageRenderer } from '@/components/DynamicPageRenderer';
import { getHomePageData, getHomePage } from '@/lib/fetchSiteData';

export const revalidate = 60;

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
  console.log('Using fallback approach - Contact data:', contact);

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

