'use client'

import { SearchBar } from '@/components/ui/SearchBar'
import { H1 } from '@/components/ui/Typography'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { Game } from '@repo/utils/types'
import { ArrowLeft } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HeaderDesktop({
  suggestedGames,
}: {
  suggestedGames: Game[] | undefined
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const getKeysPosition = (isHome: boolean) => ({
    y: isHome ? 0 : -72,
    opacity: 1,
  })

  return (
    <div className="relative hidden w-full flex-col items-center justify-center sm:flex">
      {/* Linear gradient */}
      <div className="absolute inset-0 -z-10 h-[17.25rem] bg-gradient-to-b from-[#FF00AE29] to-[#FFFFFF]" />

      {/* Desktop keys background */}
      <motion.div
        initial={{ opacity: 0, y: -114 }}
        animate={getKeysPosition(isHome)}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 -z-10 flex w-full items-start justify-center"
      >
        <Image
          src="/illustrations/keys-desktop.svg"
          alt="Keys"
          width={1390.8}
          height={176.79}
          unoptimized
          priority
        />
      </motion.div>

      <div
        className={`mt-[7.5rem] flex w-full flex-col items-center justify-center gap-6`}
      >
        {isHome && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Link
                href="/"
                className={`${isHome ? '' : 'pointer-events-none'} flex gap-3 px-4 hover:opacity-85`}
              >
                <UnoptimizedImage
                  src="/app-icon.svg"
                  alt="Gaming Haven Z"
                  width={30}
                  height={30}
                  className="size-[1.875rem]"
                />
                <H1 className="select-none">Gaming Haven Z</H1>
              </Link>
            </motion.div>
          </AnimatePresence>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative flex w-full max-w-[45.5rem] items-center justify-center"
        >
          {!isHome && (
            <Link
              href="/"
              className="absolute left-0 flex items-center justify-center gap-2 hover:opacity-85"
            >
              <ArrowLeft strokeWidth={2} className="size-5" color="#3C1661" />
              <span className="gradient-text text-base font-semibold">
                Back
              </span>
            </Link>
          )}
          <SearchBar suggestedGames={suggestedGames} />
        </motion.div>
      </div>
    </div>
  )
}
