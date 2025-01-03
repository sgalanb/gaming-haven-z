import { H1 } from '@/components/ui/Typography'

export default async function Home() {
  return (
    <div className="mt-[3.375rem] flex w-full flex-col items-start justify-start px-4 sm:mt-[6.25rem] sm:items-center">
      <H1 as="h2">Saved games</H1>
    </div>
  )
}
