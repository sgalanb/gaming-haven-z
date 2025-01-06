'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { getIGDBImageUrl } from '@repo/utils'
import { Game } from '@repo/utils/types'

export function MediaGallery({ media }: { media: Game['screenshots'] }) {
  return (
    <Carousel
      opts={{
        align: 'center',
      }}
      className="w-full"
    >
      <CarouselContent>
        {media?.map((screenshot) => (
          <CarouselItem key={screenshot.id} className="basis-1/3 sm:basis-1/5">
            <UnoptimizedImage
              src={getIGDBImageUrl('1080p', screenshot.image_id)}
              alt={screenshot.image_id}
              width={1080}
              height={1080}
              className="aspect-square rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant="default"
        size="icon"
        className="hidden lg:flex"
      />
      <CarouselNext variant="default" size="icon" className="hidden lg:flex" />
    </Carousel>
  )
}
