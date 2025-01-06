'use client'

import { H4 } from '@/components/ui/Typography'

import { CollectedGameType } from '@/components/CollectGameButton'
import { H2 } from '@/components/ui/Typography'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { getIGDBImageUrl } from '@repo/utils'
import { Trash } from 'lucide-react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

export function CollectedGames() {
  const [collectedGames, setCollectedGames] = useLocalStorage<
    CollectedGameType[]
  >('collectedGames', [])
  const typedCollectedGames = collectedGames as CollectedGameType[]

  const [selectedFilter, setSelectedFilter] = useState<
    'lastAdded' | 'newest' | 'oldest'
  >('lastAdded')

  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
    rootMargin: '-1px 0px 0px 0px',
  })

  const isSticky = entry?.intersectionRatio !== 1

  const sortedCollectedGames =
    selectedFilter === 'lastAdded'
      ? typedCollectedGames.reverse()
      : selectedFilter === 'newest'
        ? typedCollectedGames?.sort(
            (a, b) => (b.firstReleaseDate ?? 0) - (a.firstReleaseDate ?? 0)
          )
        : typedCollectedGames?.sort(
            (a, b) => (a.firstReleaseDate ?? 0) - (b.firstReleaseDate ?? 0)
          )

  return (
    <>
      {collectedGames && collectedGames?.length > 0 ? (
        <div className="flex w-full max-w-[45.5rem] flex-col">
          {/* Ref to capture when the sticky div 'starts to stick' */}
          <div ref={ref} className="h-[1px] w-full" />
          <div
            className={`${
              isSticky
                ? 'self-center rounded-full bg-white/80 p-1 backdrop-blur-[8px]'
                : ''
            } sticky top-4 z-10 mt-4 flex sm:self-center`}
          >
            <Badge
              filter="lastAdded"
              selected={selectedFilter === 'lastAdded'}
              setSelectedFilter={setSelectedFilter}
            >
              Last added
            </Badge>
            <Badge
              filter="newest"
              selected={selectedFilter === 'newest'}
              setSelectedFilter={setSelectedFilter}
            >
              Newest
            </Badge>
            <Badge
              filter="oldest"
              selected={selectedFilter === 'oldest'}
              setSelectedFilter={setSelectedFilter}
            >
              Oldest
            </Badge>
          </div>
          <div className="mt-7 grid w-full grid-cols-[repeat(auto-fill,minmax(7.125rem,1fr))] gap-2 sm:grid-cols-[repeat(auto-fill,minmax(10.625rem,1fr))] sm:gap-4">
            {sortedCollectedGames?.map((game: CollectedGameType) => (
              <div key={game.slug} className="group relative">
                <button
                  className="absolute bottom-2 right-2 flex size-10 items-center justify-center rounded-full bg-white opacity-0 ring-palette-violet-50 transition-opacity hover:bg-white/85 group-hover:flex group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    toast.success('Game removed', {
                      description: `${game.name} has been removed from your collection`,
                    })
                    setCollectedGames((prev: CollectedGameType[]) =>
                      prev.filter(
                        (g: CollectedGameType) => g.slug !== game.slug
                      )
                    )
                  }}
                >
                  <Trash className="size-4" color="black" />
                </button>
                <Link href={`/games/${game.slug}`}>
                  <UnoptimizedImage
                    src={getIGDBImageUrl('cover_big', game.cover?.image_id)}
                    alt={game.name}
                    width={game.cover?.width ?? 170}
                    height={game.cover?.height ?? 226}
                    className="aspect-[170/226] h-auto w-full rounded-lg ring-1 ring-palette-violet-50"
                    priority
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-[4.75rem] flex w-full flex-col items-center justify-center gap-10">
          <Image
            src="/illustrations/nothing-collected.svg"
            alt="Empty state"
            width={280}
            height={168}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <H2 className="text-center">Nothing collected yet</H2>
            <H4 as="span" className="text-center">
              Here you will see your collected games
            </H4>
          </div>
        </div>
      )}
    </>
  )
}

function Badge({
  children,
  filter,
  selected,
  setSelectedFilter,
}: {
  children: React.ReactNode
  filter: 'lastAdded' | 'newest' | 'oldest'
  selected: boolean
  setSelectedFilter: (filter: 'lastAdded' | 'newest' | 'oldest') => void
}) {
  return (
    <button className="relative" onClick={() => setSelectedFilter(filter)}>
      {selected && (
        <motion.div
          layoutId="filter-background"
          className="absolute inset-0 rounded-full bg-palette-violet-900"
          transition={{ duration: 0.15 }}
        />
      )}
      <span
        className={`relative z-10 flex w-fit items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium ${
          selected ? 'text-white' : 'text-palette-violet-900'
        }`}
      >
        {children}
      </span>
    </button>
  )
}
