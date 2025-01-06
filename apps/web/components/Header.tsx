'use client'

import { getGame } from '@repo/utils'
import { EnvironmentTypes } from '@repo/utils/types'
import { useQuery } from '@tanstack/react-query'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'

export function Header() {
  const { data: suggestedGames } = useQuery({
    queryKey: ['suggestedGames'],
    queryFn: async () => {
      return await Promise.all(
        suggestedGamesSlugs.map((slug) =>
          getGame(
            slug,
            process.env.NEXT_PUBLIC_CURRENT_ENVIRONMENT as EnvironmentTypes
          )
        )
      )
    },
  })

  return (
    <header className="w-full">
      <HeaderMobile suggestedGames={suggestedGames} />
      <HeaderDesktop suggestedGames={suggestedGames} />
    </header>
  )
}

const suggestedGamesSlugs = [
  'bioshock',
  'grand-theft-auto-iv',
  'burnout-paradise',
  'battlefield-4',
  'papers-please',
]
