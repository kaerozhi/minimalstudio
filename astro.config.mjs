import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite'; // 这里你导入的是 tailwindcss
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

// 自定义 Remark 插件：将 ::: 语法转换为带类名的 div
function markdownMediaDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        const data = node.data || (node.data = {});
        const name = node.name;
        
        if (name === 'album') { // 原 gallery 改名为 album
          data.hName = 'div';
          data.hProperties = { class: 'media-album-container not-prose' };
        }
        if (name === 'gallery') { // 新的瀑布流 gallery
          data.hName = 'div';
          data.hProperties = { class: 'media-gallery-masonry not-prose' };
        }
        if (name === 'slider') {
          data.hName = 'div';
          data.hProperties = {
            class: 'media-slider-container not-prose swiper my-6 overflow-hidden'
          };
        }
      }
    });
  };
}

export default defineConfig({  
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()], // Tailwind v4 已经在这里通过 Vite 插件启用了
  },
  // 修正点：去掉了 integrations 里的 tailwind()，因为它已经在上面的 vite 插件里处理了
  integrations: [mdx(), sitemap()],  
  markdown: {
    remarkPlugins: [
      remarkDirective, 
      markdownMediaDirective
    ],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            class: 'anchor',
          },
        },
      ],
    ]
  }
});