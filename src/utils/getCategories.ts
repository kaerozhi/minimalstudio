import { getCollection } from 'astro:content';
import { collections } from '@/content/config';
import { slugify } from './slugify';

export async function getCategories(collectionName?: string) {
  // 如果未传入 collection 名称，默认使用所有集合
  const collectionNames = collectionName
    ? [collectionName]
    : Object.keys(collections);

  const categoryMap = new Map<string, { label: string; count: number }>();

  for (const name of collectionNames) {
    const AllEntries = await getCollection(name);
    const entries = AllEntries.filter((entry) => entry.data.draft !== true); // 不显示草稿
    for (const post of entries) {
      const categories = post.data.categories ?? [];
      for (const raw of categories) {
        const normalized = slugify(raw);
        const existing = categoryMap.get(normalized);
        if (existing) {
          existing.count += 1;
        } else {
          categoryMap.set(normalized, { label: raw, count: 1 });
        }
      }
    }
  }

  // 输出结构：按文章数降序排序
  return Array.from(categoryMap.entries())
    .map(([slug, data]) => ({ slug, ...data }))
    .sort((a, b) => b.count - a.count);
}