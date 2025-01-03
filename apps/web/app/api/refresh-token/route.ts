import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

interface RefreshTokenResponse {
  access_token: string
  expires_in: number // seconds
  token_type: string
}

// Vercel needs a GET request to trigger the cron job
// This is executed every Sunday at 00:00, see vercel.json
export async function GET() {
  const headersList = await headers()
  const authHeader = headersList.get('authorization')
  // Secure the endpoint with a secret key
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
      }
    )
    const data: RefreshTokenResponse = await response.json()

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })

    await redis.set('twitch-token', data.access_token)

    return Response.json('Token refreshed successfully')
  } catch (error) {
    console.error('Error refreshing token', error)
    return Response.json('Error refreshing token', { status: 500 })
  }
}
