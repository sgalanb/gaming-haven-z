'use client'

import { Game } from '@repo/utils/types'
import dynamic from 'next/dynamic'

const CollectGameButton = dynamic(
  () => import('@/components/CollectGameButton'),
  {
    ssr: false,
  }
)

export function CollectGameButtonWrapper({
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
  return (
    <CollectGameButton
      className={className}
      slug={slug}
      name={name}
      firstReleaseDate={firstReleaseDate}
      cover={cover}
    />
  )
}
