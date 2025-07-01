import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content?: string;
};

const parser = new Parser<{}, FeedItem>();

export const GET: APIRoute = async () => {
  const feed = await parser.parseURL('https://www.douban.com/feed/people/2237229/interests');
  const latest = feed.items?.[0];

  if (!latest) {
    return new Response(JSON.stringify({ error: 'No entries found' }), { status: 404 });
  }

  const cleanTitle = latest.title.replace(/^看过\s*/, '');
  const html = latest.content || '';

  // 推荐等级 -> 星级映射
  const ratingTextMatch = html.match(/推荐[:：] ?(力荐|推荐|还行|较差|很差)/);
  const ratingMap: Record<string, string> = {
    '力荐': '★★★★★',
    '推荐': '★★★★',
    '还行': '★★★',
    '较差': '★★',
    '很差': '★',
  };
  const rating = ratingMap[ratingTextMatch?.[1] || ''] || '暂无评分';

  // 提取图片
  const imgMatch = html.match(/<img src="([^"]+)"/);
  const poster = imgMatch?.[1] || '';

  // 时间格式
  const rawDate = new Date(latest.pubDate);
  const formattedDate = rawDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return new Response(
    JSON.stringify({
      title: cleanTitle,
      link: latest.link,
      rating,
      poster,
      pubDate: formattedDate,
    }),
    { status: 200 }
  );
};
