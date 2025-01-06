import { getTop200Games } from '@repo/utils'
import { EnvironmentTypes } from '@repo/utils/types'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [topGames1, topGames2, topGames3, topGames4] = await Promise.all([
    getTop200Games(
      0,
      process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
    ),
    getTop200Games(
      50,
      process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
    ),
    getTop200Games(
      100,
      process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
    ),
    getTop200Games(
      150,
      process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
    ),
  ])

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
  ]
}
