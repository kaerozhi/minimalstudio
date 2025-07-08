import { getCollection } from 'astro:content';
import { slugify } from './slugify';

export async function getCategories(collectionName: string) {
  const entries = await getCollection(collectionName);

  // key: 归一化后的分类名
  const categoryMap = new Map<string, { label: string; count: number }>();

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

  // 按照 count 降序排列
  return Array.from(categoryMap.entries())
    .map(([slug, data]) => ({ slug, ...data }))
    .sort((a, b) => b.count - a.count);
}