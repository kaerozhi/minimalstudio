// 提取 Markdown 中的所有图片链接（如 ![alt](url)）
export function extractMarkdownImages(content: string): string[] {
  const matches = [...content.matchAll(/!\[.*?\]\((.*?)\)/g)];
  return matches.map((match) => match[1]);
}