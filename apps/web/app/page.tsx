import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { getGame, getIGDBImageUrl } from '@repo/utils'

export default async function Home() {
  const gta = await getGame(
    'grand-theft-auto-v',
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
      ? 'development'
      : 'production'
  )

  return (
    <div>
      <UnoptimizedImage
        src={getIGDBImageUrl('cover_big', 'co1twe')}
        alt="Games Haven Z"
        width={100}
        height={100}
      />
      <h2>{gta.name}</h2>
      <h2>{gta.slug}</h2>
    </div>
  )
}
