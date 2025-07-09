import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
import rehypeFigure from 'rehype-figure';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// https://astro.build/config
export default defineConfig({  
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  // Add your domain name here
  integrations: [ sitemap()],  
  markdown: {
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append', // 或 'wrap'，看你想要什么样的结构
          properties: {
            class: 'anchor', // 可加样式
          },
        },
      ],
      [rehypeFigure, { className: 'img-figure', figcaption: true }]
    ]
  }
});