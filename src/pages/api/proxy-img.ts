// /src/pages/api/proxy-img.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const target = new URL(url).searchParams.get('url');
  if (!target) return new Response('Missing url', { status: 400 });

  const res = await fetch(target, {
    headers: {
      Referer: 'https://movie.douban.com/', // 冒充豆瓣页面请求
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
    },
  });

  const contentType = res.headers.get('content-type') || 'image/jpeg';
  return new Response(res.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
    },
  });
};
