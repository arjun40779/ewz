import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import Testimonial from '@/components/Testimonial';
import { Contact } from '@/components/Contact';
import { getHomePageData } from '@/lib/fetchSiteData';

export const revalidate = 60;

export default async function Home() {
  const { hero, services, portfolio, testimonials, contact } =
    await getHomePageData();
  console.log('Contact data:', contact);

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

