import type { APIRoute } from 'astro';
import { getValidStravaToken } from '@/lib/stravaToken';

export const GET: APIRoute = async () => {
  try {
    const token = await getValidStravaToken();
    return new Response(JSON.stringify(token), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response('获取 token 失败', { status: 500 });
  }
};