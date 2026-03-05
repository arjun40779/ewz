'use client';

import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import Testimonial from '@/components/Testimonial';
import { Contact } from '@/components/Contact';
import type {
  HeroData,
  ServiceSection,
  OurWorkSection,
  TestimonialSection,
  ContactSection,
} from '@/lib/fetchSiteData';

type SectionData = {
  _id: string;
  _type: string;
} & (HeroData | ServiceSection | OurWorkSection | TestimonialSection | ContactSection);

interface DynamicSectionRendererProps {
  readonly section: SectionData;
}

export function DynamicSectionRenderer({
  section,
}: DynamicSectionRendererProps) {
  const { _type } = section;

  switch (_type) {
    case 'hero':
      return <Hero data={section as unknown as HeroData} />;

    case 'servicesSection':
      return <Services data={section as unknown as ServiceSection} />;

    case 'ourWorkSection':
      return <Portfolio data={section as unknown as OurWorkSection} />;

    case 'testimonial':
      return <Testimonial data={section as unknown as TestimonialSection} />;

    case 'contactSection':
      return <Contact data={section as unknown as ContactSection} />;

    default:
      console.warn(`Unknown section type: ${_type}`);
      return null;
  }
}

interface DynamicPageRendererProps {
  readonly sections: SectionData[];
}

export function DynamicPageRenderer({ sections }: DynamicPageRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No sections configured for this page.</p>
      </div>
    );
  }

  return (
    <>
      {sections.map((section, index) => {
        if (!section?._type) {
          console.warn('Invalid section data at index:', index);
          return null;
        }

        return (
          <DynamicSectionRenderer
            key={section._id || `section-${index}`}
            section={section}
          />
        );
      })}
    </>
  );
}
