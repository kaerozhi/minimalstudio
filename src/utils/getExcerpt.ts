export function getSmartExcerpt(content: string, maxWeight = 100) {
  if (!content) return "";

  // 1. 清理 HTML 和 Markdown（逻辑同前）
  const cleanText = content
    .replace(/<[^>]*>/g, '') 
    .replace(/!\[.*?\]\(.*?\)/g, '') 
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') 
    .replace(/[#*`_~]/g, '') 
    .replace(/\s+/g, ' ')
    .trim();

  const firstParagraph = cleanText.split('\n').find(p => p.trim().length > 0) || "";

  // 2. 加权计算截断位置
  let currentWeight = 0;
  let truncateIndex = firstParagraph.length;

  for (let i = 0; i < firstParagraph.length; i++) {
    const charCode = firstParagraph.charCodeAt(i);
    // 中文字符或全角符号权重为 1，英文字符/半角符号权重为 0.4
    currentWeight += (charCode > 255) ? 1 : 0.4;

    if (currentWeight > maxWeight) {
      truncateIndex = i;
      break;
    }
  }

  // 3. 基础截断
  const truncated = firstParagraph.slice(0, truncateIndex);

  // 4. 智能句号优化 (针对中文)
  const lastFullStop = truncated.lastIndexOf('。');
  if (lastFullStop !== -1 && lastFullStop > truncateIndex * 0.6) {
    return truncated.slice(0, lastFullStop + 1);
  }

  // 5. 针对英文的截断优化：避免截断单词
  if (currentWeight > maxWeight) {
    // 如果最后一位是英文字母，回退到上一个空格，防止单词被劈开
    const lastSpace = truncated.lastIndexOf(' ');
    if (/[a-zA-Z]/.test(firstParagraph[truncateIndex]) && lastSpace > 0) {
      return truncated.slice(0, lastSpace).trim() + "...";
    }
    return truncated.trim() + "...";
  }

  return truncated;
}