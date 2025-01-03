import { SearchBar } from '@/components/ui/SearchBar'
import { H1 } from '@/components/ui/Typography'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { getGame } from '@repo/utils'

import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'

export async function Header() {
  const suggestedGamesSlugs = [
    'bioshock',
    'grand-theft-auto-iv',
    'burnout-paradise',
    'battlefield-4',
    'papers-please',
  ]
  const suggestedGames = await Promise.all(
    suggestedGamesSlugs.map((slug) => getGame(slug, 'development'))
  )

  return (
    <header className="relative flex w-full flex-col items-start justify-center sm:items-center">
      {/* Linear gradient */}
      <div className="absolute inset-0 -z-10 h-[17.25rem] bg-gradient-to-b from-[#FF00AE29] to-[#FFFFFF]" />

      {/* Keys */}
      <motion.div
        initial={{ opacity: 0, y: -52 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
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
      <motion.div
        initial={{ opacity: 0, y: -114 }}
        animate={{ opacity: 1, y: 0 }}
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

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Link
          href="/"
          className="mt-8 flex gap-2 px-4 hover:opacity-85 sm:mt-[7.5rem] sm:gap-3"
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

      {/* Search */}
      <SearchBar suggestedGames={suggestedGames} />
    </header>
  )
}
