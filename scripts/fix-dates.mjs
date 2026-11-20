import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.resolve('src/content');

function normalizeDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function processFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---/);

  if (!match) return;

  let fm = match[1];
  const dateMatch = fm.match(/^date:\s*(.+)$/m);
  if (!dateMatch) return;

  const normalized = normalizeDate(dateMatch[1]);
  if (!normalized) return;

  const updated = raw.replace(
    dateMatch[0],
    `date: "${normalized}"`
  );

  if (updated !== raw) {
    fs.writeFileSync(file, updated);
    console.log('✔ fixed', file);
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.md') || p.endsWith('.mdx')) processFile(p);
  }
}

walk(CONTENT_DIR);
