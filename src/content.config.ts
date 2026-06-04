import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topics = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    domain: z.string(),
    summary: z.string(),
    status: z.enum(['stub', 'draft', 'complete']).default('stub'),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { topics };
