import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getLayoutData } from "@/lib/fetchSiteData";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { header, footer } = await getLayoutData();
  console.log(header, footer);  

  return (
    <>
      <div id="top" />
      <Header data={header} />
      {children}
      <Footer data={footer} />
    </>
  );
}

