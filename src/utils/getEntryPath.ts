/**
 * collection → URL 前缀映射
 *
 * 新架构三分区：Project / 写作 / Blog
 * - project 区集合（photography、design，以及未来的 aigc、novel）统一挂在 /project/ 下
 * - blog、writing 保持顶级路径
 * 新增 project 区集合时只需在这里加一行映射。
 */
const urlPrefixes: Record<string, string> = {
  photography: '/project/photography',
  design: '/project/design',
  blog: '/blog',
  writing: '/writing',
};

/** 由 entry 的 collection 与 id 生成规范 URL */
export function getEntryPath(collection: string, id: string): string {
  const prefix = urlPrefixes[collection] ?? `/${collection}`;
  return `${prefix}/${id}`;
}
