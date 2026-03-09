import { getClient } from '@/sanity/lib/client-draft';

export interface Image {
  asset?: {
    url: string;
  };
  alt?: string;
}

// Shared types
export interface NavLink {
  label: string;
  href: string;
}

export interface CtaButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

// Header / Footer
export interface HeaderData {
  logo?: Image;
  logoText?: string;
  logoLink?: string;
  navigation: NavLink[];
  cta?: CtaButton | null;
}

export interface FooterSocialLink {
  platform: string;
  url: string;
}

export interface FooterQuickLink {
  label: string;
  href: string;
}

export interface FooterData {
  brandName: string;
  description?: string;
  socialLinks: FooterSocialLink[];
  quickLinks: FooterQuickLink[];
  primaryEmail?: string;
  secondaryEmail?: string;
  availability?: string;
  copyrightText?: string;
}

// Hero
export interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  headline: string;
  subheading?: string;
  badgeText?: string;
  buttons: HeroButton[];
  stats: HeroStat[];
  backgroundImage?: Image;
  backgroundVideo?: {
    asset?: {
      url?: string;
    };
  };
  backgroundVideoUrl?: string;
  overlayOpacity?: number;
}

// Services

export interface ServiceSection {
  title: string;
  subtitle?: string;
  services: Service[];
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon?: Image;
  iconName?: string;
  highlight?: boolean;
}

// Portfolio / Our Work
export interface OurWorkSection {
  title: string;
  subtitle?: string;
  backgroundImage?: Image;
  items: WorkItem[];
}

export interface WorkItem {
  _id?: string;
  title: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  thumbnail: Image;
  videoFile?: {
    asset?: {
      url?: string;
    };
  };
  videoUrl?: string;
  views?: string;
  likes?: string;
}

export interface TestimonialSection {
  heading: string;
  subHeading?: string;
  testimonialItems: TestimonialItem[];
}

// Testimonials
export type TestimonialType = 'video' | 'text';

export interface TestimonialItem {
  _id: string;
  type: TestimonialType;
  name: string;
  position?: string;
  rating: number;
  content: string;
  avatar?: Image;
  thumbnail?: Image;
  videoUrl?: string;
  videoFile?: {
    asset?: {
      url?: string;
    };
  };
}

// Contact Section
export interface ContactSection {
  heading: string;
  subheading?: string;
  formEmail: string;
  emailSection: {
    title: string;
    primaryEmail: string;
    supportEmail?: string;
  };
  liveChatSection: {
    title: string;
    description: string;
    buttonText: string;
  };
  quickTurnaroundSection: {
    title: string;
    description: string;
    availabilityStatus: string;
    isAvailable: boolean;
  };
}

// Legacy types for backward compatibility
export interface HomePageData {
  hero: HeroData | null;
  services: ServiceSection | null;
  portfolio: OurWorkSection | null;
  testimonials: TestimonialSection | null;
  contact: ContactSection | null;
}

export interface LayoutData {
  header: HeaderData;
  footer: FooterData;
}

// Page Layout Types
export interface PageSection {
  _type: string;
  _id: string;
}

export interface PageLayoutData {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  favicon?: Image;
  isHomepage?: boolean;
  sections: Array<
    {
      _id: string;
      _type: string;
    } & (
      | HeroData
      | ServiceSection
      | OurWorkSection
      | TestimonialSection
      | ContactSection
    )
  >;
}

// Layout data
export interface LayoutData {
  header: HeaderData;
  footer: FooterData;
}

// Home page data
export interface HomePageData {
  hero: HeroData | null;
  services: ServiceSection | null;
  portfolio: OurWorkSection | null;
  testimonials: TestimonialSection | null;
  contact: ContactSection | null;
}

export async function getLayoutData(): Promise<LayoutData> {
  const client = await getClient();
  const query = `
    {
      "header": *[_type == "header"][0]{
        logo{
          asset->{
            url
          },
          alt
        },
        logoText,
        logoLink,
        "navigation": navigation[]{
          label,
          href
        },
        "cta": select(
          defined(cta) => {
            "label": cta.label,
            "href": cta.href,
            "variant": cta.variant
          },
          null
        )
      },
      "footer": *[_type == "footer"][0]{
        brandName,
        description,
        "socialLinks": socialLinks[]{
          platform,
          url
        },
        "quickLinks": quickLinks[]{
          label,
          href
        },
        primaryEmail,
        secondaryEmail,
        copyrightText,
        availability
      }
    }
  `;

  const data = await client.fetch<LayoutData>(
    query,
    {},
    { cache: 'force-cache', next: { revalidate: 60 } },
  );
  return data;
}

// Legacy function for backward compatibility
export async function getHomePageData(): Promise<HomePageData> {
  const client = await getClient();

  const query = `
  {
    "hero": *[_type == "hero"][0]{
      headline,
      subheading,
      badgeText,
      "buttons": buttons[]{
        label,
        href,
        variant
      },
      "stats": stats[]{
        value,
        label
      },
      backgroundImage{
        asset->{
          url
        },
        alt
      },
      backgroundVideo{
        asset->{
          url
        }
      },
      backgroundVideoUrl,
      overlayOpacity
    },

    "services": *[_type == "servicesSection"][0]{
      title,
      subtitle,
      "services": services[]{
        title,
        description,
        icon{
          asset->{
            url
          },
          alt
        },
        iconName,
        highlight
      }
    }, 

    "portfolio": *[_type == "ourWorkSection"][0]{
      title,
      subtitle,
      backgroundImage{
        asset->{
          url
        },
        alt
      },
      "items": items[]{
        _id,
        title,
        platform,
        thumbnail{
          asset->{
            url
          },
          alt
        },
        videoFile{
          asset->{
            url
          }
        },
        videoUrl,
        views,
        likes
      }
    },

    "testimonials": *[_type == "testimonial"][0]{
      heading,
      subHeading,
      "testimonialItems": testimonialItems[]{
        _id,
        type,
        name,
        position,
        rating,
        content,
        avatar{
          asset->{
            url
          },
          alt
        },
        thumbnail{
          asset->{
            url
          },
          alt
        },
        videoUrl,
        videoFile{
          asset->{
            url
          }
        }
      }
    },

    "contact": *[_type == "contactSection"][0]{
      heading,
      subheading,
      formEmail,
      emailSection{
        title,
        primaryEmail,
        supportEmail
      },
      liveChatSection{
        title,
        description,
        buttonText
      },
      quickTurnaroundSection{
        title,
        description,
        availabilityStatus,
        isAvailable
      }
    }
  }
  `;

  const data = await client.fetch<HomePageData>(
    query,
    {},
    { cache: 'force-cache', next: { revalidate: 60 } },
  );
  return data;
}

export async function getAllPageSlugs(): Promise<string[]> {
  const client = await getClient();

  const query = `
    *[_type == "pageLayout" && defined(slug.current) && !isHomepage]{
      "slug": slug.current
    }
  `;

  const pages = await client.fetch<{ slug: string }[]>(
    query,
    {},
    { cache: 'force-cache', next: { revalidate: 3600 } },
  );

  return pages.map((page) => page.slug).filter(Boolean);
}

export async function getPageBySlug(
  slug: string,
): Promise<PageLayoutData | null> {
  const client = await getClient();

  const query = `
    *[_type == "pageLayout" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      metaTitle,
      metaDescription,
      favicon{
        asset->{
          url
        },
        alt
      },
      isHomepage,
      "sections": sections[]->{
        _id,
        _type,
        
        // Hero section data
        _type == "hero" => {
          headline,
          subheading,
          badgeText,
          "buttons": buttons[]{
            label,
            href,
            variant
          },
          "stats": stats[]{
            value,
            label
          },
          backgroundImage{
            asset->{
              url
            },
            alt
          },
          backgroundVideo{
            asset->{
              url
            }
          },
          backgroundVideoUrl,
          overlayOpacity
        },
        
        // Services section data
        _type == "servicesSection" => {
          title,
          subtitle,
          "services": services[]{
            title,
            description,
            icon{
              asset->{
                url
              },
              alt
            },
            iconName,
            highlight
          }
        },
        
        // Our Work section data
        _type == "ourWorkSection" => {
          title,
          subtitle,
          backgroundImage{
            asset->{
              url
            },
            alt
          },
          "items": items[]{
            _id,
            title,
            platform,
            thumbnail{
              asset->{
                url
              },
              alt
            },
            videoFile{
              asset->{
                url
              }
            },
            videoUrl,
            views,
            likes
          }
        },
        
        // Testimonial section data
        _type == "testimonial" => {
          heading,
          subHeading,
          "testimonialItems": testimonialItems[]{
            _id,
            type,
            name,
            position,
            rating,
            content,
            avatar{
              asset->{
                url
              },
              alt
            },
            thumbnail{
              asset->{
                url
              },
              alt
            },
            videoUrl,
            videoFile{
              asset->{
                url
              }
            }
          }
        },
        
        // Contact section data
        _type == "contactSection" => {
          heading,
          subheading,
          formEmail,
          emailSection{
            title,
            primaryEmail,
            supportEmail
          },
          liveChatSection{
            title,
            description,
            buttonText
          },
          quickTurnaroundSection{
            title,
            description,
            availabilityStatus,
            isAvailable
          }
        }
      }
    }
  `;

  const data = await client.fetch<PageLayoutData>(
    query,
    { slug },
    { cache: 'force-cache', next: { revalidate: 60 } },
  );
  return data;
}

export async function getHomePage(): Promise<PageLayoutData | null> {
  const client = await getClient();

  const query = `
    *[_type == "pageLayout" && isHomepage == true][0]{
      _id,
      title,
      slug,
      metaTitle,
      metaDescription,
      favicon{
        asset->{
          url
        },
        alt
      },
      isHomepage,
      "sections": sections[]->{
        _id,
        _type,
        
        // Hero section data
        _type == "hero" => {
          headline,
          subheading,
          badgeText,
          "buttons": buttons[]{
            label,
            href,
            variant
          },
          "stats": stats[]{
            value,
            label
          },
          backgroundImage{
            asset->{
              url
            },
            alt
          },
          backgroundVideo{
            asset->{
              url
            }
          },
          backgroundVideoUrl,
          overlayOpacity
        },
        
        // Services section data
        _type == "servicesSection" => {
          title,
          subtitle,
          "services": services[]{
            title,
            description,
            icon{
              asset->{
                url
              },
              alt
            },
            iconName,
            highlight
          }
        },
        
        // Our Work section data
        _type == "ourWorkSection" => {
          title,
          subtitle,
          backgroundImage{
            asset->{
              url
            },
            alt
          },
          "items": items[]{
            _id,
            title,
            platform,
            thumbnail{
              asset->{
                url
              },
              alt
            },
            videoFile{
              asset->{
                url
              }
            },
            videoUrl,
            views,
            likes
          }
        },
        
        // Testimonial section data
        _type == "testimonial" => {
          heading,
          subHeading,
          "testimonialItems": testimonialItems[]{
            _id,
            type,
            name,
            position,
            rating,
            content,
            avatar{
              asset->{
                url
              },
              alt
            },
            thumbnail{
              asset->{
                url
              },
              alt
            },
            videoUrl,
            videoFile{
              asset->{
                url
              }
            }
          }
        },
        
        // Contact section data
        _type == "contactSection" => {
          heading,
          subheading,
          formEmail,
          emailSection{
            title,
            primaryEmail,
            supportEmail
          },
          liveChatSection{
            title,
            description,
            buttonText
          },
          quickTurnaroundSection{
            title,
            description,
            availabilityStatus,
            isAvailable
          }
        }
      }
    }
  `;

  const data = await client.fetch<PageLayoutData>(
    query,
    {},
    { cache: 'force-cache', next: { revalidate: 60 } },
  );
  return data;
}

