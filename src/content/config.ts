import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['concept', 'math', 'code', 'compare', 'papers']),
    publishDate: z.string(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).optional().default([]),
    ogImage: z.string().optional(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().optional(),
      type: z.string().optional(),
    })).optional().default([]),
    references: z.array(z.object({
      title: z.string(),
      url: z.string().optional(),
      type: z.string().optional(),
    })).optional().default([]),
  }),
});

export const collections = { articles };
