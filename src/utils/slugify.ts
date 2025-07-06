export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_]+/g, '-')                       // 空格 & 下划线 -> 连字符
    .replace(/[^a-z0-9\u4e00-\u9fa5\-]+/g, '')     // 保留中文、字母、数字、连字符
    .replace(/\-\-+/g, '-')                        // 合并多个连字符
    .replace(/^-+/, '')                            // 去除开头 -
    .replace(/-+$/, '');                           // 去除结尾 -
}