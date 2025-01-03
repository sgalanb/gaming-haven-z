import { getGames } from '@repo/utils'

export default function Home() {
  const text = getGames()

  return (
    <div>
      <h1 className="text-2xl font-bold">{text}</h1>
    </div>
  )
}
