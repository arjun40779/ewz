import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret, tag, path } = body;

    // Check secret
    if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Revalidate specific tag or path
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    } else if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    } else {
      // Revalidate the entire site
      revalidatePath('/', 'layout');
      console.log('Revalidated entire site');
    }

    return Response.json({
      revalidated: true,
      now: Date.now(),
      tag,
      path,
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return new Response('Error revalidating', { status: 500 });
  }
}
