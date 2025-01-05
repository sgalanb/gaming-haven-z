'use client'

import { SearchBar } from '@/components/ui/SearchBar'
import { H1 } from '@/components/ui/Typography'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'

import { getGame } from '@repo/utils'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { AnimatePresence } from 'motion/react'

import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { data: suggestedGames } = useQuery({
    queryKey: ['suggestedGames'],
    queryFn: async () => {
      return await Promise.all(
        suggestedGamesSlugs.map((slug) => getGame(slug, 'development'))
      )
    },
  })

  const getKeysPosition = (isHome: boolean) => {
    return {
      y: isHome ? 0 : -72,
      opacity: 1,
    }
  }

  const getTitlePosition = (isHome: boolean) => {
    return {
      y: 0,
      opacity: isHome ? 1 : 0,
    }
  }

  const getSearchBarPosition = (isHome: boolean) => {
    return {
      y: isHome ? 0 : -56,
      opacity: 1,
    }
  }

  return (
    <header className="relative flex w-full flex-col items-start justify-center sm:items-center">
      {/* Linear gradient */}
      <div className="absolute inset-0 -z-10 h-[17.25rem] bg-gradient-to-b from-[#FF00AE29] to-[#FFFFFF]" />

      {/* Mobile keys background */}
      <motion.div
        initial={{ opacity: 0, y: -52 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute right-0 top-0 sm:hidden"
      >
        <Image
          src="/illustrations/keys-mobile.svg"
          alt="Keys"
          width={196.21}
          height={73.9}
          unoptimized
        />
      </motion.div>

      {/* Desktop keys background */}
      <motion.div
        initial={{ opacity: 0, y: -114 }}
        animate={getKeysPosition(isHome)}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-0 -z-10 hidden w-full items-start justify-center sm:flex"
      >
        <Image
          src="/illustrations/keys-desktop.svg"
          alt="Keys"
          width={1390.8}
          height={176.79}
          className=""
          unoptimized
        />
      </motion.div>

      <div className="mt-8 flex w-full flex-col items-start justify-center gap-5 sm:mt-[7.5rem] sm:items-center sm:gap-6">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={getTitlePosition(isHome)}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Link
              href="/"
              className={`${isHome ? '' : 'pointer-events-none'} flex gap-2 px-4 hover:opacity-85 sm:gap-3`}
            >
              <UnoptimizedImage
                src="/app-icon.svg"
                alt="Gaming Haven Z"
                width={30}
                height={30}
                className="size-6 sm:size-[1.875rem]"
              />
              <H1 className="select-none">Gaming Haven Z</H1>
            </Link>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={getSearchBarPosition(isHome)}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex w-full max-w-[45.5rem] flex-col items-start justify-center gap-5 sm:flex-row sm:items-center sm:gap-0"
        >
          {!isHome && (
            <Link
              href="/"
              className="left-0 flex items-center justify-center gap-2 pl-4 hover:opacity-85 sm:absolute sm:pl-0"
            >
              <ArrowLeft strokeWidth={2} className="size-5" color="#3C1661" />
              <span className="bg-gradient-to-r from-[#3C1661] to-[#6727A6] bg-clip-text text-base font-semibold text-[#3C1661] text-transparent">
                Back
              </span>
            </Link>
          )}
          <SearchBar suggestedGames={suggestedGames} />
        </motion.div>
      </div>
    </header>
  )
}

const BackButtonContent = () => {
  return <></>
}

const suggestedGamesSlugs = [
  'bioshock',
  'grand-theft-auto-iv',
  'burnout-paradise',
  'battlefield-4',
  'papers-please',
]
