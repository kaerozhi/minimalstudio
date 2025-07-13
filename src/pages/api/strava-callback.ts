import type { APIRoute } from 'astro';
import supabase from '@/lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) return new Response('Missing code', { status: 400 });

  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.STRAVA_CLIENT_ID,
      client_secret: import.meta.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    return new Response('获取 token 失败', { status: 500 });
  }

  await supabase.from('strava_tokens').insert({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
  });

  return new Response('✅ Token 已保存到 Supabase');
};