// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['es', 'en']),
    tags: z.array(z.string()),
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
