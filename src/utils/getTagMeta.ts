import { getAllEntries } from './getAllEntries';
import { slugify } from './slugify';

export async function getTagMeta() {
  const allEntries = await getAllEntries();

  const tagMap = new Map<string, {
    label: string;
    slug: string;
    count: number;
    cover: string | null;
    updated: string;
  }>();

  for (const entry of allEntries) {
    const tags = entry.data.tags || [];
    const date = entry.data.date || '';
    const photos = entry.data.photos || [];

    for (const tag of tags) {
      const slug = slugify(tag);
      const existing = tagMap.get(slug);

      if (!existing) {
        tagMap.set(slug, {
          label: tag,
          slug,
          count: 1,
          cover: photos?.[0] || null,
          updated: date,
        });
      } else {
        existing.count++;
        if (new Date(date) > new Date(existing.updated)) {
          existing.cover = photos?.[0] || existing.cover;
          existing.updated = date;
        }
      }
    }
  }

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
}
