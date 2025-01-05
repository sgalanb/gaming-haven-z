'use client'

import { SearchBar } from '@/components/ui/SearchBar'
import { H1 } from '@/components/ui/Typography'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { Game } from '@repo/utils/types'
import { ArrowLeft } from 'lucide-react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HeaderMobile({
  suggestedGames,
}: {
  suggestedGames: Game[] | undefined
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="relative flex w-full flex-col items-start justify-center sm:hidden">
      {/* Linear gradient */}
      <div className="absolute inset-0 -z-10 h-[17.25rem] bg-gradient-to-b from-[#FF00AE29] to-[#FFFFFF]" />

      {/* Mobile keys background */}
      <motion.div
        initial={{ opacity: 0, y: -52 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute right-0 top-0"
      >
        <Image
          src="/illustrations/keys-mobile.svg"
          alt="Keys"
          width={196.21}
          height={73.9}
          unoptimized
        />
      </motion.div>

      <div className="mt-8 flex w-full flex-col items-start justify-center gap-5">
        {isHome && (
          <Link
            href="/"
            className={`${isHome ? '' : 'pointer-events-none'} flex gap-2 px-4 hover:opacity-85`}
          >
            <UnoptimizedImage
              src="/app-icon.svg"
              alt="Gaming Haven Z"
              width={30}
              height={30}
              className="size-6"
            />
            <H1 className="select-none">Gaming Haven Z</H1>
          </Link>
        )}

        <div className="flex w-full max-w-[45.5rem] flex-col items-start justify-center gap-5">
          {!isHome && (
            <Link
              href="/"
              className="left-0 flex h-7 items-center justify-center gap-2 pl-4 hover:opacity-85"
            >
              <ArrowLeft strokeWidth={2} className="size-5" color="#3C1661" />
              <span className="gradient-text text-base font-semibold">
                Back
              </span>
            </Link>
          )}
          <SearchBar suggestedGames={suggestedGames} />
        </div>
      </div>
    </div>
  )
}
