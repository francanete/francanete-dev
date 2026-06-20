import { getCollection } from 'astro:content';
import { siteUrl } from '../lib/site';

export async function GET() {
  const research = await getCollection('research');
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/research/`,
    `${siteUrl}/methodology/`,
    `${siteUrl}/glossary/`,
    ...research.map((entry) => `${siteUrl}/research/${entry.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
