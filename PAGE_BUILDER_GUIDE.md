# Page Layout Builder - Usage Guide

## Overview

Your Sanity Studio now has a flexible page builder that allows you to create pages with draggable, reorderable sections.

## How to Use

### 1. Creating a New Page

1. Go to Sanity Studio
2. Navigate to "📄 Page Builder" > "Pages"
3. Click "Create" > "Page Layout"
4. Fill in the basic page information:
   - **Page Title**: The display name for your page
   - **Slug**: URL-friendly version (auto-generated from title)
   - **Meta Title**: SEO title (max 60 characters)
   - **Meta Description**: SEO description (max 160 characters)
   - **Is Homepage**: Check if this should be your homepage

### 2. Adding Sections

1. In the "Page Sections" field, click the "+" button
2. Choose from available section types:
   - **Hero Section**: Main landing area with headlines, buttons, and stats
   - **Services Section**: Showcase your services with cards
   - **Our Work Section**: Display portfolio/work items
   - **Testimonial Section**: Customer reviews and testimonials
   - **Contact Section**: Contact form and information

### 3. Reordering Sections

- **Drag and Drop**: Simply drag sections up or down using the drag handle (⋮⋮)
- **Visual Feedback**: You'll see a blue line indicating where the section will be placed
- **Live Preview**: Changes are reflected immediately in the preview

### 4. Section Configuration

Each section has its own configuration options:

#### Hero Section

- Badge text, headline, subheading
- Action buttons (max 2)
- Statistics display (max 4)
- Background image
- Section visibility toggle

#### Services Section

- Title and subtitle
- Service cards (1-12 items)
- Background style options
- Section visibility toggle

#### Our Work Section

- Title and subtitle
- Work items (1-12 items)
- Layout options (grid, masonry, slider)
- Section visibility toggle

#### Testimonial Section

- Title and subtitle
- Testimonials (1-10 items)
- Display style (carousel, grid, featured)
- Background image option
- Section visibility toggle

#### Contact Section

- Heading and subheading
- Contact information (email, phone, address)
- Form configuration
- Section visibility toggle

### 5. Section Features

- **Section ID**: Add custom IDs for navigation/linking
- **Visibility Toggle**: Show/hide sections without deleting
- **Live Preview**: See changes in real-time
- **Validation**: Required fields are enforced

### 6. Managing Multiple Pages

- **Homepage Marking**: Mark one page as the homepage
- **Page Organization**: Pages are sorted with homepage first, then alphabetically
- **Duplicate Prevention**: Slug validation prevents URL conflicts

## Best Practices

### Content Strategy

1. **Homepage**: Use Hero → Services → Our Work → Testimonials → Contact flow
2. **Landing Pages**: Start with Hero, add relevant sections based on page purpose
3. **About Pages**: Use Hero → Services → Testimonials structure

### SEO Optimization

- Always fill in meta titles and descriptions
- Use descriptive, keyword-rich page titles
- Keep meta titles under 60 characters
- Keep meta descriptions under 160 characters

### Content Management

- Use section visibility toggles for A/B testing
- Add section IDs for navigation links
- Keep content concise and focused per section

### Performance

- Limit sections per page (5-8 recommended)
- Optimize images in all sections
- Use background images sparingly

## Technical Notes

### Schema Structure

- `pageLayout`: Main document type for pages
- Section objects: `heroSection`, `servicesPageSection`, etc.
- All sections inherit from existing individual section schemas
- Drag-and-drop enabled with `sortable: true`

### Integration

- Pages can be queried by slug for routing
- Section order is preserved in the `sections` array
- Each section type has consistent structure for frontend rendering

## Troubleshooting

### Common Issues

1. **Can't reorder sections**: Make sure you're dragging by the handle (⋮⋮)
2. **Section not showing**: Check the "Show Section" toggle
3. **Missing content**: Verify all required fields are filled
4. **Slug conflicts**: Each page needs a unique slug

### Support

- All section types use the existing object schemas
- Preview functionality shows section count and type
- Validation ensures content quality and completeness
