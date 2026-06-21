import { defineCollection, z } from 'astro:content';

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    evidenceGrade: z.enum(['proven', 'strong-evidence', 'hypothesis', 'marketing-claim']),
    engines: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    canonical: z.string().url().optional(),
  }),
});

const experiments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    status: z.enum(['planned', 'running', 'complete']).default('planned'),
    engines: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    canonical: z.string().url().optional(),
  }),
});

const datasets = defineCollection({
  type: 'data',
  schema: z.array(z.string()),
});

export const collections = { research, experiments, datasets };
