// src/content.config.ts — Content Layer API (Astro 5+/7)
// 迁移自旧 src/content/config.ts (legacy content collections API, Astro 6 起移除)
// 注意：glob loader 的 entry.id = 相对 base 的文件路径去扩展名（旧 API 的 slug 同义）
// dot 开头的 .md（Obsidian 草稿）默认被 glob 排除，与旧行为一致
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = {
  title: z.string(),
  description: z.string().max(256).optional(),
  date: z.coerce.date(),
  photos: z.array(z.string()).optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  toc: z.boolean().default(false),
  series: z.string().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.{md,mdx}', '!**/.*'], base: './src/content/blog' }),
  schema: z.object({
    ...baseSchema,
    author: z.string().default('Kaero Zhi'),
    link: z.string().optional(),
  }),
});

const design = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.{md,mdx}', '!**/.*'], base: './src/content/design' }),
  schema: z.object({
    ...baseSchema,
    client: z.string(),
    color: z.string(),
    visit: z.string().optional(),
  }),
});

const photography = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.{md,mdx}', '!**/.*'], base: './src/content/photography' }),
  schema: z.object(baseSchema),
});

const writing = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.{md,mdx}', '!**/.*'], base: './src/content/writing' }),
  schema: z.object(baseSchema),
});

// travels 已并入 blog 作为分类（54 篇物理移动至 src/content/blog）
export const collections = { blog, design, photography, writing };
