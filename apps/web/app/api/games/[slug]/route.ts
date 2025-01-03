import { Redis } from '@upstash/redis'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug

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
      body: `fields slug, name, involved_companies.company.name, involved_companies.company.parent, cover.height, cover.width, cover.image_id, total_rating, first_release_date, genres.name, summary, platforms.name, screenshots.height, screenshots.width, screenshots.image_id, similar_games.name, similar_games.slug, similar_games.cover.image_id, similar_games.cover.height, similar_games.cover.width; where slug = "${slug}";`,
    })

    const data = await response.json()

    return Response.json(data[0])
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
