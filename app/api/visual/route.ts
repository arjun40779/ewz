import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '/';

  // Check if the secret is valid
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Check if required environment variables are set
  if (!process.env.SANITY_API_READ_TOKEN) {
    return new Response('Missing SANITY_API_READ_TOKEN environment variable', { status: 500 });
  }

  try {
    // Enable draft mode
    const draft = await draftMode();
    draft.enable();
    console.log('Visual editing mode enabled');
  } catch (error) {
    console.error('Visual editing error:', error);
    return new Response(`Error enabling visual editing: ${error}`, { status: 500 });
  }

  // Redirect to the path with visual editing enabled
  const url = new URL(slug, request.url);
  url.searchParams.set('visual', 'true');
  redirect(url.toString());
}