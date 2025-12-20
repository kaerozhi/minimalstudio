import { getCollection } from 'astro:content';
import { collections } from '@/content/config';

export async function getAllEntries() {
  const collectionNames = Object.keys(collections);
  const all = [];

  for (const name of collectionNames) {
    const entries = await getCollection(name);

    for (const entry of entries) {
      if (!entry?.data) continue;
      if (entry.data.draft === true) continue;
      if (!(entry.data.date instanceof Date)) continue;

      all.push({
        ...entry,
        collection: name,
      });
    }
  }

  return all.sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime()
  );
}