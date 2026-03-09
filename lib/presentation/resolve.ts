import type {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation';

export const mainDocuments = (prev: DocumentLocationsState) => {
  return prev.filter((item) => item._type === 'pageLayout');
};

export const locations: DocumentLocationResolver = (params, context) => {
  switch (params.type) {
    case 'pageLayout':
      const slug = (params as any).slug?.current;
      if (!slug) {
        return context.defaultLocations;
      }

      return {
        message: 'This document is used on this page',
        tone: 'positive',
        locations: [
          {
            title:
              slug === 'home' || !slug ? 'Homepage' : params.title || 'Page',
            href: slug === 'home' || !slug ? '/' : `/${slug}`,
          },
        ],
      };

    case 'hero':
    case 'servicesSection':
    case 'ourWorkSection':
    case 'testimonial':
    case 'contactSection':
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

    case 'header':
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

    case 'footer':
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

    default:
      return context.defaultLocations;
  }
};
