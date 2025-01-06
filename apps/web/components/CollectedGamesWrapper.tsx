'use client'

import dynamic from 'next/dynamic'

const CollectedGames = dynamic(() => import('@/components/CollectedGames'), {
  ssr: false,
})

export function CollectedGamesWrapper() {
  return <CollectedGames />
}
