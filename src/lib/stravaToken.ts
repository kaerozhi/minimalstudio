import supabase from './supabase';

export async function getValidStravaToken() {
  const { data, error } = await supabase
    .from('strava_tokens')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    throw new Error('❌ 无法获取 Strava token');
  }

  const now = Math.floor(Date.now() / 1000);

  if (data.expires_at > now) {
    return data;
  }

  // 已过期，刷新 token
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.STRAVA_CLIENT_ID,
      client_secret: import.meta.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: data.refresh_token,
    }),
  });

  const refreshed = await res.json();

  if (!refreshed.access_token) {
    throw new Error('❌ 刷新 Strava token 失败');
  }

  await supabase.from('strava_tokens').insert({
    access_token: refreshed.access_token,
    refresh_token: refreshed.refresh_token,
    expires_at: refreshed.expires_at,
  });

  return refreshed;
}