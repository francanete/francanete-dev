import { getCollection } from 'astro:content';
import { siteUrl } from '../lib/site';

export async function GET() {
  const research = await getCollection('research');
  const items = research
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((entry) => `
        <item>
          <title>${entry.data.title}</title>
          <link>${siteUrl}/research/${entry.slug}/</link>
          <description>${entry.data.description}</description>
          <pubDate>${entry.data.date.toUTCString()}</pubDate>
        </item>`)
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>francanete.dev</title>
    <link>${siteUrl}</link>
    <description>GEO research and experiments</description>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
