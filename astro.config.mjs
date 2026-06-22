import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://francanete.dev',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/research': '/articles',
    '/research/high-confidence-geo-factors/': '/articles/high-confidence-geo-factors/',
    '/research/how-ai-search-systems-select-and-cite-sources/': '/articles/how-ai-search-systems-select-and-cite-sources/',
  },
});
