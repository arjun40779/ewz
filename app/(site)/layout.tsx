import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import PreviewBanner from '@/components/PreviewBanner';
import VisualEditingProvider from '@/components/VisualEditingProvider';
import { getLayoutData } from '@/lib/fetchSiteData';
import { isDraftMode } from '@/sanity/lib/client-draft';

export const revalidate = 60;

interface SiteLayoutProps {
  children: React.ReactNode;
  searchParams?: Promise<{ visual?: string }>;
}

export default async function SiteLayout({
  children,
  searchParams,
}: Readonly<SiteLayoutProps>) {
  const { header, footer } = await getLayoutData();
  const isPreview = await isDraftMode();
  const params = await searchParams;
  const isVisualEditing = params?.visual === 'true' || false;
  
  console.log(header, footer);

  return (
    <VisualEditingProvider isEnabled={isVisualEditing || isPreview}>
      {isPreview && <PreviewBanner />}
      <div id="top" style={isPreview ? { paddingTop: '3rem' } : {}} />
      <Header data={header} />
      {children}
      <Footer data={footer} />
    </VisualEditingProvider>
  );
}

