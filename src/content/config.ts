import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  category: z.string(),
  author: z.string().default("Grow Lot Team"),
  image: z.string().optional(),
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),
});

const blog = defineCollection({ type: 'content', schema: postSchema });
const blog_en = defineCollection({ type: 'content', schema: postSchema });

export const collections = { blog, blog_en };
