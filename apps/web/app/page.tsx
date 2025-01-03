import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { getIGDBImageUrl } from '@repo/utils'

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Games Haven Z</h1>
      <UnoptimizedImage
        src={getIGDBImageUrl('cover_big', 'co1twe')}
        alt="Games Haven Z"
        width={100}
        height={100}
      />
      <UnoptimizedImage
        src={getIGDBImageUrl('1080p', 'o6wownutsouj6qfz2hz2')}
        alt="Games Haven Z"
        width={1920}
        height={1080}
      />
    </div>
  )
}
