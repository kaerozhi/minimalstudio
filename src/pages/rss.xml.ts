// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
  // 所有 collection
  const collections = ['blog', 'design', 'travels', 'writings', 'gallery'];

  const allEntries = [];

  for (const name of collections) {
    const entries = await getCollection(name);
    const visible = entries.filter(e => !e.data.draft);
    allEntries.push(...visible.map(e => ({
      ...e,
      collection: name,
    })));
  }

  // 排序：按日期倒序
  allEntries.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Kaero Zhi - Flaming in the dark.',
    description: 'Kaero 的个人网站，内容包含设计、摄影、个人生活以及各种不着调的个人经验。',
    site: 'https://kaerozhi.com',
    items: allEntries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description,
      link: `/${entry.collection}/${entry.slug}`,
    })),
  });
}