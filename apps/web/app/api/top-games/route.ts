import { Redis } from '@upstash/redis'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const offset = searchParams.get('offset')

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    const accessToken = await redis.get('twitch-token')

    const response = await fetch(`${process.env.IGDB_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID as string,
        Authorization: `Bearer ${accessToken}`,
      },
      body: `fields slug; offset ${offset}; limit 50; where total_rating > 95; where total_rating_count > 1000;`,
    })

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
