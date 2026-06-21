import { siteUrl } from '../lib/site';

export async function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap-index.xml`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
