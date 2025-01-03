import { Redis } from '@upstash/redis'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const query = searchParams.get('query')
  const limit = 50
  const categories = '(0,2,8,9)' // 0: main game, 2: expansion, 8: remake, 9: remaster

  if (!query) {
    return Response.json({ error: 'Query is required' }, { status: 400 })
  }

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
      body: `fields slug, name, cover.height, cover.width, cover.image_id; search "${query}"; limit ${limit}; where category = ${categories};`,
    })

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
