import { getCollection } from 'astro:content';
import { siteUrl } from '../lib/site';

export async function GET() {
  const [research, experiments] = await Promise.all([getCollection('research'), getCollection('experiments')]);
  const items = [...research, ...experiments]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((entry) => {
      const base = research.includes(entry) ? '/research/' : '/experiments/';
      return `
        <item>
          <title>${entry.data.title}</title>
          <link>${siteUrl}${base}${entry.slug}/</link>
          <description>${entry.data.description}</description>
          <pubDate>${entry.data.date.toUTCString()}</pubDate>
        </item>`;
    })
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
