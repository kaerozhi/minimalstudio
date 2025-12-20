---
title: Astro 的配置文件
date: "2025-06-29"
description: 从 Wordpress 时代养成的好习惯，建站的第一时间先搞定网站的基本配置文件，保证高频信息的一致性。
categories:
  - Sitelog
  - Coding
tags:
  - astro
---
Astro 根目录下有 `astro.config.mjs`，主要用于管理插件。但除此之外，必要但系统并不默认生成的配置文件，我们需要自行搞定。

一般在 `/src/` 目录下新建 `site.config`，这个文件用于管理网站的基本信息，主要包括：

- 网站的基本信息：网站名称，Slogan，url / favicon / logo 等；
- SEO 相关信息：description / keywords / og:image 等；
- 网站的导航配置：以及社交网站的链接。如果有友情链接的需要，也可以在这里配置；
- 功能开关：列表页文章数 / 是否打开 TOC、评论系统、内置相册等等，根据自己的需要来。

Astro 的 Markdown 文件一般放在 `/src/content/` 目录下，我们需要在此新建 `config.ts` 来配置 collection，这个文件范例如下：

```javascript
import { defineCollection, z } from 'astro:content';

// 定义 'blog' 内容集合
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(128), // 标题，最长128字符
    date: z.date(), // 日期，注意格式
    description: z.string().max(256).optional(), // 描述，最长256字符，可选
    author: z.string().default('Kaero Zhi'), // 作者，默认值为 '匿名作者'
    tags: z.array(z.string()).default([]), // 标签数组，默认为空数组
    categories: z.array(z.string()).default([]), // 分类数组，默认为空数组
    photos: z.array(z.string()).optional(), // 图片路径数组，可选
    draft: z.boolean().default(false), // 是否为草稿，默认为 false
    featured: z.boolean().default(false), // 是否为精选，默认为 false
    toc: z.boolean().default(false), // 是否打开目录，默认为 false
  }),
});

// 导出所有内容集合
export const collections = { blog };
```

正常配置 blog 一个 collection 足矣，不太正常的人会配置五六七八个，自行复制修改即可。