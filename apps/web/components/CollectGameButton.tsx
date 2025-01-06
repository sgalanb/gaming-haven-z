'use client'

import { Button } from '@/components/ui/Button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Game } from '@repo/utils/types'
import { toast } from 'sonner'

export type CollectedGameType = {
  slug: Game['slug']
  name: Game['name']
  firstReleaseDate?: Game['first_release_date']
  cover?: Game['cover']
}

export function CollectGameButton({
  className,
  name,
  slug,
  firstReleaseDate,
  cover,
}: {
  className?: string
  slug: Game['slug']
  name: Game['name']
  firstReleaseDate?: Game['first_release_date']
  cover?: Game['cover']
}) {
  const [collectedGames, setCollectedGames] = useLocalStorage<
    CollectedGameType[]
  >('collectedGames', [])

  const handleCollectGame = () => {
    toast.success('Game collected', {
      description: `${name} has been added to your collection`,
    })
    setCollectedGames((prev: CollectedGameType[]) => [
      ...prev,
      { slug, firstReleaseDate, cover, name },
    ])
  }

  const handleRemoveGame = () => {
    toast.success('Game removed', {
      description: `${name} has been removed from your collection`,
    })
    setCollectedGames((prev: CollectedGameType[]) =>
      prev.filter((g: CollectedGameType) => g.slug !== slug)
    )
  }

  const isCollected = collectedGames.some(
    (g: CollectedGameType) => g.slug === slug
  )

  return (
    <Button
      className={className}
      onClick={isCollected ? handleRemoveGame : handleCollectGame}
      variant={isCollected ? 'outline' : 'default'}
    >
      {isCollected ? 'Game collected' : 'Collect game'}
    </Button>
  )
}
