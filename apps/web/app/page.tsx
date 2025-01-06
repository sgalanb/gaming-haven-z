import { CollectedGames } from '@/components/CollectedGames'
import { H1 } from '@/components/ui/Typography'
export default async function Home() {
  return (
    <main className="mb-4 mt-[3.375rem] flex w-full flex-col items-start justify-start px-4 sm:mb-[7.5rem] sm:mt-[6.25rem] sm:items-center">
      <H1 as="h2">Saved games</H1>

      <CollectedGames />
    </main>
  )
}
