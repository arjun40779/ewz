import type { StructureResolver } from 'sanity/structure';

// Custom structure for ViralEdits content
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Site Content')
    .items([
      // Global sections
      S.listItem()
        .title('Global')
        .child(
          S.list()
            .title('Global')
            .items([
              S.documentTypeListItem('header').title('Header'),
              S.documentTypeListItem('footer').title('Footer'),
            ]),
        ),

      S.divider(),

      // Home page sections
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.documentTypeListItem('hero').title('Hero'),
              S.documentTypeListItem('servicesSection').title('Services'),
              S.documentTypeListItem('ourWorkSection').title('Our Work'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('contactSection').title('Contact'),
            ]),
        ),

      S.divider(),

      // Fallback: any other document types
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return (
          id &&
          ![
            'header',
            'footer',
            'hero',
            'servicesSection',
            'ourWorkSection',
            'testimonial',
            'contactSection',
          ].includes(id)
        );
      }),
    ]);

