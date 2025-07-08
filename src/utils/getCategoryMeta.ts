// src/utils/getCategoryMeta.ts
import { getAllEntries } from './getAllEntries';
import { slugify } from './slugify';

interface CategoryMeta {
  label: string;
  slug: string;
  count: number;
  cover: string | null;
  updated: string;
  source?: string;
}

export async function getCategoryMeta(): Promise<CategoryMeta[]> {
  const allEntries = await getAllEntries();

  const categoryMap = new Map<string, {
    label: string;
    slug: string;
    count: number;
    coverCandidates: { date: string; photo: string; slug: string }[];
  }>();

  for (const entry of allEntries) {
    if (entry.data.draft === true) continue;

    const categories = entry.data.categories || [];
    const date = entry.data.date || '';
    const photos = entry.data.photos || [];
    const firstPhoto = photos[0] || null;

    for (const cat of categories) {
      const slug = slugify(cat);
      const existing = categoryMap.get(slug);

      if (!existing) {
        categoryMap.set(slug, {
          label: cat,
          slug,
          count: 1,
          coverCandidates: firstPhoto
            ? [{ date, photo: firstPhoto, slug: entry.slug }]
            : [],
        });
      } else {
        existing.count++;
        if (firstPhoto) {
          existing.coverCandidates.push({
            date,
            photo: firstPhoto,
            slug: entry.slug,
          });
        }
      }
    }
  }

  // 组装最终的分类信息，选出最新封面图
  const result: CategoryMeta[] = [];

  for (const meta of categoryMap.values()) {
    let cover: string | null = null;
    let updated = '';
    let source;

    if (meta.coverCandidates.length > 0) {
      const sorted = meta.coverCandidates.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      cover = sorted[0].photo;
      updated = sorted[0].date;
      source = sorted[0].slug;
    }

    result.push({
      label: meta.label,
      slug: meta.slug,
      count: meta.count,
      cover,
      updated,
      source,
    });
  }

  return result.sort((a, b) => b.count - a.count);
}