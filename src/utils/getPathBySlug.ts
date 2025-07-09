import { getCollection } from 'astro:content';
import { collections } from '@/content/config'; // 你项目中定义的 collections 对象

export async function getPathBySlug(slug: string) {
  const collectionNames = Object.keys(collections);

  for (const collection of collectionNames) {
    const posts = await getCollection(collection);
    const matched = posts.find(post => post.slug === slug);
    if (matched) {
      return `/${collection}/${matched.slug}`;
    }
  }

  return null; // 没有找到匹配
}