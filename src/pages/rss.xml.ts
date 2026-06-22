import { getCollection } from 'astro:content';
import { siteUrl } from '../lib/site';

export async function GET() {
  const [articles, experiments] = await Promise.all([getCollection('articles'), getCollection('experiments')]);
  const items = [
    ...articles.map((entry) => ({ entry, base: '/articles/' })),
    ...experiments.map((entry) => ({ entry, base: '/experiments/' })),
  ]
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime())
    .map(({ entry, base }) => `
        <item>
          <title>${entry.data.title}</title>
          <link>${siteUrl}${base}${entry.slug}/</link>
          <description>${entry.data.description}</description>
          <pubDate>${entry.data.date.toUTCString()}</pubDate>
        </item>`)
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>francanete.dev</title>
    <link>${siteUrl}</link>
    <description>AI software lab articles and experiments</description>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
