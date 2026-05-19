import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['concept', 'math', 'code', 'compare', 'papers']),
    publishDate: z.string(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
