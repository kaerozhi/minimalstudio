import { getCollection } from 'astro:content';
import { collections } from '@/content/config';

export async function getAllEntries() {
  const collectionNames = Object.keys(collections);

  let all = [];
  for (const name of collectionNames) {
    const entries = await getCollection(name);
    const visible = entries.filter((entry) => !entry.data.draft);
    all.push(...visible.map((e) => ({ ...e, collection: name })));
  }

  return all.sort((a, b) => Date.parse(b.data.date) - Date.parse(a.data.date));
}
