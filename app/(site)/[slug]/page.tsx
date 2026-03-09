import { notFound } from 'next/navigation';
import { DynamicPageRenderer } from '@/components/DynamicPageRenderer';
import { getPageBySlug, getAllPageSlugs } from '@/lib/fetchSiteData';
import type { Metadata } from 'next';

export const revalidate = 60;

interface PageProps {
  readonly params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageData = await getPageBySlug(params.slug);

  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  const metadata: Metadata = {
    title: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription,
  };

  // Add favicon if available from page data
  if (pageData.favicon?.asset?.url) {
    metadata.icons = {
      icon: pageData.favicon.asset.url,
    };
  }

  return metadata;
}

export default async function DynamicPage({ params }: PageProps) {
  const pageData = await getPageBySlug(params.slug);

  if (!pageData) {
    notFound();
  }

  if (!pageData.sections || pageData.sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{pageData.title}</h1>
          <p className="text-gray-500">This page has no configured sections.</p>
        </div>
      </div>
    );
  }

  return <DynamicPageRenderer sections={pageData.sections} />;
}

