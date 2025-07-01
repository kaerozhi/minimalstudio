// src/pages/api/strava.ts
import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_FILE = path.resolve('./strava-tokens.json');

async function readToken() {
  const raw = await fs.readFile(TOKEN_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function saveToken(tokenData: any) {
  await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
}

async function refreshToken(refresh_token: string) {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.STRAVA_CLIENT_ID,
      client_secret: import.meta.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });
  const data = await res.json();
  await saveToken(data);
  return data.access_token;
}

export const GET: APIRoute = async () => {
  const now = Math.floor(Date.now() / 1000);
  let tokenData = await readToken();

  if (tokenData.expires_at <= now) {
    tokenData.access_token = await refreshToken(tokenData.refresh_token);
    tokenData = await readToken();
  }

  const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=20`, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const activities = await res.json();

  // 找到第一个 type 为 Ride 的活动
  const rideActivity = activities.find((a: any) => a.type === 'Ride');

  if (!rideActivity) {
    return new Response(JSON.stringify({ error: '没有找到骑行活动' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(rideActivity), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
