import { getTopGames } from '@repo/utils'
import { EnvironmentTypes } from '@repo/utils/types'
import type { MetadataRoute } from 'next'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const topGames1 = await getTopGames(
    0,
    process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
  )
  await delay(1000)
  const topGames2 = await getTopGames(
    50,
    process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
  )
  await delay(1000)
  const topGames3 = await getTopGames(
    100,
    process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
  )
  await delay(1000)
  const topGames4 = await getTopGames(
    150,
    process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
  )
  await delay(1000)
  const topGames5 = await getTopGames(
    200,
    process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
  )

  return [
    {
      url: 'https://gaming-haven-z.vercel.app',
      lastModified: new Date(),
    },
    ...topGames1.map((game) => ({
      url: `https://gaming-haven-z.vercel.app/game/${game.slug}`,
      lastModified: new Date(),
    })),
    ...topGames2.map((game) => ({
      url: `https://gaming-haven-z.vercel.app/game/${game.slug}`,
      lastModified: new Date(),
    })),
    ...topGames3.map((game) => ({
      url: `https://gaming-haven-z.vercel.app/game/${game.slug}`,
      lastModified: new Date(),
    })),
    ...topGames4.map((game) => ({
      url: `https://gaming-haven-z.vercel.app/game/${game.slug}`,
      lastModified: new Date(),
    })),
    ...topGames5.map((game) => ({
      url: `https://gaming-haven-z.vercel.app/game/${game.slug}`,
      lastModified: new Date(),
    })),
  ]
}
