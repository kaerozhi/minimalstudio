#!/usr/bin/env node
/**
 * 发布前 frontmatter 预检
 *
 * 为什么需要它：Astro 的 schema 校验发生在内容层 sync 阶段，对**所有**条目生效，
 * 包括 draft: true 的草稿。所以一篇草稿只要 frontmatter 非法，整个构建就会中断，
 * Vercel 上线随之失败。这个脚本在 commit 之前把这些错误抓出来。
 *
 * 用法：
 *   npm run check:fm           # 全量体检（推荐发布前跑）
 *   npm run check:fm:changed   # 只查未提交/已修改的文件（日常用）
 *   node scripts/check-frontmatter.mjs <文件...>
 *
 * 退出码：只要有 BREAK 就是 1。
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import matter from 'gray-matter';

const CONTENT_DIR = 'src/content';

// 各集合的必填字段，与 src/content/config.ts 保持一致。
// 改了 config.ts 记得同步这里。
const REQUIRED = {
  blog: ['title', 'date'],
  design: ['title', 'client', 'color', 'date'],
  gallery: ['title', 'date'],
  travels: ['title', 'date'],
  writings: ['title', 'date'],
};

const args = process.argv.slice(2);
const onlyChanged = args.includes('--changed');
const explicit = args.filter((a) => !a.startsWith('--'));

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    // 前导 . 是草稿约定（Astro 同样忽略），前导 _ 是模板/私有目录
    if (e.name.startsWith('.') || e.name.startsWith('_')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(e.name)) out.push(full);
  }
  return out;
}

function gitChanged() {
  try {
    const out = execFileSync(
      'git',
      ['-c', 'core.quotepath=false', 'ls-files', '-o', '-m', '--exclude-standard', '-z', '--', CONTENT_DIR],
      { encoding: 'buffer' }
    );
    return out
      .toString('utf8')
      .split('\0')
      .filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }
}

let files;
if (explicit.length) files = explicit;
else if (onlyChanged) files = gitChanged();
else files = walk(CONTENT_DIR);

files = [...new Set(files.map((f) => f.replace(/\\/g, '/')))].sort();

// 前导 . = 草稿约定，前导 _ = 模板/私有目录。Astro 两者都不加载，
// 所以它们既不参与构建，也不该被当成构建阻断来报。git 并不知道这个约定，
// 因此必须在这里过滤掉（--changed 模式下尤其重要）。
const isDraftOrPrivate = (f) => {
  const rel = f.split(CONTENT_DIR + '/')[1] || f;
  return rel.split('/').some((seg) => seg.startsWith('.') || seg.startsWith('_'));
};
const skipped = files.filter(isDraftOrPrivate);
files = files.filter((f) => !isDraftOrPrivate(f));

if (!files.length) {
  console.log('没有需要检查的文件。' + (skipped.length ? '（已跳过 ' + skipped.length + ' 个点前缀草稿）' : ''));
  process.exit(0);
}

let breaks = 0;
let warns = 0;
const lines = [];

for (const f of files) {
  const parts = f.split('/');
  const coll = parts[parts.length - 2];
  const bad = [];
  const warn = [];

  let raw;
  try {
    raw = fs.readFileSync(f, 'utf8');
  } catch (e) {
    if (e && e.code === 'ENOENT') lines.push('DEL    ' + f + '  （文件已删除，跳过）');
    else lines.push('SKIP   ' + f + '  （读不到: ' + (e && e.message) + '）');
    continue;
  }

  if (!raw.trimStart().startsWith('---')) {
    lines.push('BREAK  ' + f + '  → 完全没有 frontmatter（Astro 会因缺 title/date 中断构建）');
    breaks++;
    continue;
  }

  let parsed;
  try {
    parsed = matter(raw);
  } catch (e) {
    lines.push('BREAK  ' + f + '  → YAML 解析失败: ' + e.message);
    breaks++;
    continue;
  }

  const d = parsed.data || {};
  if (Object.keys(d).length === 0) {
    lines.push('BREAK  ' + f + '  → frontmatter 是空的');
    breaks++;
    continue;
  }

  const req = REQUIRED[coll];
  if (req) {
    for (const k of req) if (!(k in d)) bad.push('缺必填字段 ' + k);
  } else {
    warn.push('未知集合: ' + coll);
  }

  if ('title' in d && typeof d.title === 'string' && !d.title.trim()) warn.push('title 是空字符串');
  if ('date' in d && isNaN(new Date(d.date).getTime())) bad.push('date 非法: ' + JSON.stringify(d.date));

  // photos 是历史事故高发区：模板里的空列表项会被解析成 null
  if ('photos' in d) {
    const p = d.photos;
    if (p === null) bad.push('photos 为 null');
    else if (!Array.isArray(p)) bad.push('photos 不是数组');
    else {
      p.forEach((v, i) => {
        if (v === null || v === undefined) bad.push('photos[' + i + '] 为 null ← 构建杀手');
        else if (typeof v !== 'string') bad.push('photos[' + i + '] 非字符串');
        else if (!v.trim()) warn.push('photos[' + i + '] 是空字符串');
      });
      if (p.length === 0) warn.push('photos 是空数组');
    }
  }

  for (const k of ['tags', 'categories']) {
    const v = d[k];
    if (v === null) bad.push(k + ' 为 null（空着不填请写 []）');
    else if (Array.isArray(v)) {
      const empties = v.filter((x) => typeof x === 'string' && !x.trim()).length;
      if (empties) warn.push(k + ' 含 ' + empties + ' 个空字符串');
      if (v.some((x) => x === null)) bad.push(k + ' 含 null');
    }
  }

  if (!parsed.content.trim()) warn.push('正文为空');

  if (bad.length) {
    lines.push('BREAK  ' + f + '  → ' + bad.join('; '));
    if (warn.length) lines.push('        另外: ' + warn.join('; '));
    breaks++;
  } else if (warn.length) {
    lines.push('WARN   ' + f + '  → ' + warn.join('; '));
    warns++;
  } else {
    lines.push('OK     ' + f);
  }
}

console.log(lines.join('\n'));
console.log(
  '--- 阻断构建: ' + breaks + ' | 仅告警: ' + warns + ' | 已检查: ' + files.length +
    (skipped.length ? ' | 跳过草稿: ' + skipped.length : '') + ' ---'
);
if (breaks) {
  console.log('存在会阻断构建的问题，先修好再提交。');
}
process.exit(breaks ? 1 : 0);
