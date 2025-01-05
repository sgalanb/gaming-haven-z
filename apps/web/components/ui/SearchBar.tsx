'use client'

import { Input } from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { useDebounce } from '@/hooks/useDebounce'
import { getIGDBImageUrl, searchGames } from '@repo/utils'
import { Game, GameSearchResult } from '@repo/utils/types'
import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export function SearchBar({
  suggestedGames,
}: {
  suggestedGames: Game[] | undefined
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce<typeof searchQuery>(searchQuery, 300)

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: () => searchGames(debouncedSearchQuery, 'development'),
  })

  // Handle clicks outside the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center justify-center px-4 sm:max-w-[22.375rem]"
    >
      <Search color="#E7C0DB" className="absolute left-8 size-4" />
      <Input
        placeholder="Search games..."
        className={`w-full ${searchQuery.length > 0 ? 'pr-10' : ''}`}
        showDropdown={isFocused}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        ref={inputRef}
      />
      <AnimatePresence>
        {searchQuery.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute right-8"
            onClick={() => {
              setSearchQuery('')
              inputRef.current?.focus()
            }}
          >
            <X color="#E7C0DB" className="size-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search dropdown */}
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mx-4 flex min-h-10 items-center rounded-b-[1.25rem] border-x border-b border-[#FF00AE55] bg-white px-2 py-1.5 shadow-lg">
          {searchQuery.length === 0 ? (
            <div className="flex w-full flex-col">
              <span className="px-2 text-base text-[#C698B8]">Recommended</span>
              {!suggestedGames ? (
                <div className="my-2 flex w-full items-center justify-center">
                  <Spinner className="size-5 fill-[#FF00AE55] text-palette-violet-50" />
                </div>
              ) : (
                <>
                  {suggestedGames?.map((game) => (
                    <SearchResult
                      result={game}
                      key={game.slug}
                      setIsFocused={setIsFocused}
                      setSearchQuery={setSearchQuery}
                    />
                  ))}
                </>
              )}
            </div>
          ) : isLoading ? (
            <div className="flex w-full items-center justify-center">
              <Spinner className="size-5 fill-[#FF00AE55] text-palette-violet-50" />
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div
              className="flex max-h-[13.875rem] flex-col overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#FF00AE55 #ffffff00',
              }}
            >
              {searchResults.map((result: GameSearchResult) => (
                <SearchResult
                  result={result}
                  setIsFocused={setIsFocused}
                  setSearchQuery={setSearchQuery}
                  key={result.slug}
                />
              ))}
            </div>
          ) : (
            <span className="h-full px-2 text-base text-[#C698B8]">
              No results found
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function SearchResult({
  result,
  setIsFocused,
  setSearchQuery,
}: {
  result: GameSearchResult
  setIsFocused: (isFocused: boolean) => void
  setSearchQuery: (searchQuery: string) => void
}) {
  return (
    <Link
      href={`/games/${result.slug}`}
      className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:opacity-85"
      onClick={() => {
        setIsFocused(false)
        setSearchQuery('')
      }}
    >
      <UnoptimizedImage
        src={getIGDBImageUrl('cover_small', result.cover?.image_id)}
        alt={`${result.name} cover image`}
        width={30}
        height={30}
        className="aspect-square size-[1.875rem] rounded"
      />
      <span className="text-sm">{result.name}</span>
    </Link>
  )
}
