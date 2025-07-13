import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const params = new URLSearchParams({
    client_id: import.meta.env.STRAVA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: import.meta.env.STRAVA_REDIRECT_URI,
    scope: 'activity:read_all',
    approval_prompt: 'force',
  });

  return Response.redirect(
    `https://www.strava.com/oauth/authorize?${params.toString()}`,
    302
  );
};