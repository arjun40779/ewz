import type {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation';

export const mainDocuments = (prev: any) => {
  return prev.filter((item: any) => item._type === 'pageLayout');
};

export const locations: DocumentLocationResolver = (params) => {
  switch (params.type) {
    case 'pageLayout': {
      const slug = (params as { slug?: { current?: string } }).slug?.current;
      if (!slug) {
        return null;
      }

      return {
        message: 'This document is used on this page',
        tone: 'positive',
        locations: [
          {
            title: slug === 'home' || !slug ? 'Homepage' : 'Page',
            href: slug === 'home' || !slug ? '/' : `/${slug}`,
          },
        ],
      };
    }

    case 'hero':
    case 'servicesSection':
    case 'ourWorkSection':
    case 'testimonial':
    case 'contactSection': {
      return {
        message: 'This section appears on pages that reference it',
        tone: 'positive',
        locations: [
          {
            title: 'Find on website',
            href: '/',
          },
        ],
      };
    }

    case 'header': {
      return {
        message: 'This header appears on all pages',
        tone: 'positive',
        locations: [
          {
            title: 'Header (all pages)',
            href: '/',
          },
        ],
      };
    }

    case 'footer': {
      return {
        message: 'This footer appears on all pages',
        tone: 'positive',
        locations: [
          {
            title: 'Footer (all pages)',
            href: '/',
          },
        ],
      };
    }

    default:
      return null;
  }
};

