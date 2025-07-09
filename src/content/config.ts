// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 定义 'blog' 内容集合
const blog = defineCollection({
  // 类型：'content' 表示 Markdown/MDX，'data' 表示 JSON/YAML
  type: 'content',
  schema: z.object({
    title: z.string().max(128), // 标题，最长128字符
    date: z.date(),
    description: z.string().max(256).optional(), // 描述，最长256字符，可选
    // date 字段应为 Date 对象，脚本已确保
    author: z.string().default('Kaero Zhi'), // 作者，默认值为 '匿名作者'
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    photos: z.array(z.string()).optional(), // 图片路径数组，可选
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
    toc: z.boolean().default(false), // 是否打开目录，默认为 false
    link: z.string().optional(), // 是否外链
  }),
});

// 定义 'design' 内容集合
const design = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    color: z.string(),
    description: z.string().optional(),
    date: z.date(),
    // photos 字段应为字符串数组，脚本已确保
    photos: z.array(z.string()).optional(), // 图片路径数组，可选
    visit: z.string().optional(), // 项目链接，可选且必须是有效的
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
  }),
});

// 定义 'gallery' 内容集合
const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    photos: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
  }),
});

// 定义 'travels' 内容集合
const travels = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    photos: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    series: z.string().optional(),
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    toc: z.boolean().default(false), // 是否打开目录，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
  }),
});

// 定义 'writings' 内容集合 (可以作为短文或随笔)
const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    // 对于短文，可能不需要 photos 字段，或者可以定义为可选
    series: z.string().optional(),
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    toc: z.boolean().default(false), // 是否打开目录，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
  }),
});

// 导出所有内容集合
export const collections = { blog, design, gallery, travels, writings };