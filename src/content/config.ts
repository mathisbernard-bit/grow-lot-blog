import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    author: z.string().default("Équipe Grow Lot"),
    image: z.string().optional(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
  }),
});

export const collections = { blog };
