import { siteUrl } from '../lib/site';

export async function GET() {
  const body = `# francanete.dev\n\nAI software lab site with articles, experiments, and methods pages.\n\n## Main sections\n- ${siteUrl}/\n- ${siteUrl}/articles/\n- ${siteUrl}/experiments/\n- ${siteUrl}/methods/\n- ${siteUrl}/about/\n\n## Optional support pages\n- ${siteUrl}/glossary/\n- ${siteUrl}/sources/\n\n## Source of truth\n- geo-research.md\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
