import { Redis } from '@upstash/redis'

export async function GET() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  const data = await redis.get('twitch-token')

  return Response.json(data)
}
