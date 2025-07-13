// src/pages/api/strava-sync.ts
import type { APIRoute } from 'astro';
import supabase from '@/lib/supabase';
import { getValidStravaToken } from '@/lib/stravaToken';

export const GET: APIRoute = async () => {
  try {
    const token = await getValidStravaToken();

    const res = await fetch('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const activities = await res.json();

    const upserts = activities.map((act: any) => ({
      id: act.id,
      name: act.name,
      distance: act.distance,
      moving_time: act.moving_time,
      start_date_local: act.start_date_local,
      summary_polyline: act.map?.summary_polyline || '',
    }));

    const { error } = await supabase.from('strava_activities').upsert(upserts);

    if (error) {
      console.error('❌ 写入活动数据失败', error);
      return new Response('Failed to sync activities', { status: 500 });
    }

    // ✅ 限制 token 只保留 5 条
    await supabase.rpc('cleanup_old_tokens'); // 见下方 SQL function

    return new Response('✅ Strava 活动同步完成');
  } catch (err) {
    console.error('❌ 同步失败:', err);
    return new Response('Internal Error', { status: 500 });
  }
};