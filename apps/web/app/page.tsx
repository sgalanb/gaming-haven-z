import { CollectedGamesWrapper } from '@/components/CollectedGamesWrapper'

export default async function Home() {
  return (
    <main className="mb-4 mt-[3.375rem] flex w-full px-4 sm:mb-[7.5rem] sm:mt-[6.25rem]">
      <CollectedGamesWrapper />
    </main>
  )
}
