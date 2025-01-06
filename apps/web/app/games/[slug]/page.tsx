import { CollectGameButton } from '@/components/CollectGameButton'
import { MediaGallery } from '@/components/MediaGallery'
import { H1, H2, H3, H4 } from '@/components/ui/Typography'
import { UnoptimizedImage } from '@/components/ui/UnoptimizedImage'
import { getGame, getIGDBImageUrl } from '@repo/utils'
import { Calendar, Puzzle, Star } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug

  const game = await getGame(slug, 'production')

  return {
    title: `${game.name} ${game.first_release_date ? `(${new Date(game.first_release_date * 1000).getFullYear()})` : ''} - Gaming Haven`,
    openGraph: {
      title: `${game.name} ${game.first_release_date ? `(${new Date(game.first_release_date * 1000).getFullYear()})` : ''} - Gaming Haven`,
      description: game.summary,
      images: `https://sharepreviews.com/og/add16c4d-b782-40ef-bd6a-6b577c8b301a?company_value=${game.involved_companies?.[0]?.company.name}&name_value=${game.name}&cover_src=${getIGDBImageUrl('cover_big', game.cover?.image_id)}`,
      url: `https://gaminghaven.com/games/${game.slug}`,
      siteName: 'Gaming Haven Z',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} ${game.first_release_date ? `(${new Date(game.first_release_date * 1000).getFullYear()})` : ''} - Gaming Haven`,
      description: game.summary,
      images: `https://sharepreviews.com/og/add16c4d-b782-40ef-bd6a-6b577c8b301a?company_value=${game.involved_companies?.[0]?.company.name}&name_value=${game.name}&cover_src=${getIGDBImageUrl('cover_big', game.cover?.image_id)}`,
      creator: '@gaminghavenz',
      site: '@gaminghavenz',
    },
  }
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const game = await getGame(slug, 'development')

  return (
    <div className="mb-4 mt-[3.375rem] flex w-full max-w-[45.5rem] flex-col items-start justify-start gap-6 px-4 sm:mb-[7.5rem] sm:mt-20 md:px-0">
      <div className="flex gap-4">
        <UnoptimizedImage
          src={getIGDBImageUrl('cover_big', game.cover?.image_id)}
          alt={game.name}
          width={game.cover?.width ?? 170}
          height={game.cover?.height ?? 226}
          className="h-[6.875rem] w-[5.15625rem] rounded-lg sm:h-[14.125rem] sm:w-[10.625rem]"
        />
        <div className="flex flex-col gap-2">
          <H1 className="line-clamp-3">{game.name}</H1>
          <H3 className="line-clamp-1">
            {game.involved_companies?.[0]?.company.name}
          </H3>
          <CollectGameButton
            className="mt-4 hidden w-fit sm:block"
            slug={game.slug}
            name={game.name}
            firstReleaseDate={game.first_release_date}
            cover={game.cover}
          />
        </div>
      </div>

      <CollectGameButton
        className="w-full sm:hidden"
        slug={game.slug}
        name={game.name}
        firstReleaseDate={game.first_release_date}
        cover={game.cover}
      />

      <div className="flex flex-wrap gap-2">
        {game.total_rating && (
          <Badge>
            <Star color="#6727A6" size={16} />
            <H3 as="span" className="text-palette-violet-600">
              Rating:
            </H3>
            <H3
              as="span"
              className="line-clamp-1 text-ellipsis text-palette-violet-900"
            >
              {(game.total_rating / 10).toFixed(1)}
            </H3>
          </Badge>
        )}
        {game.first_release_date && (
          <Badge>
            <Calendar color="#6727A6" size={16} />
            <H3 as="span" className="text-palette-violet-600">
              Release:
            </H3>
            <H3
              as="span"
              className="line-clamp-1 text-ellipsis text-palette-violet-900"
            >
              {new Date(game.first_release_date * 1000).toLocaleDateString()}
            </H3>
          </Badge>
        )}
        {game.genres && game.genres.length > 0 && (
          <Badge>
            <Puzzle color="#6727A6" size={16} />
            <H3 as="span" className="text-palette-violet-600">
              Genre:
            </H3>
            <H3
              as="span"
              className="line-clamp-1 text-ellipsis text-palette-violet-900"
            >
              {game.genres.map((genre) => genre.name).join(' & ')}
            </H3>
          </Badge>
        )}
      </div>

      {game.summary && (
        <div className="flex flex-col gap-2">
          <H2>Summary</H2>
          <H4 className="text-palette-violet-900">{game.summary}</H4>
        </div>
      )}

      {game.platforms && game.platforms.length > 0 && (
        <div className="flex flex-col gap-2">
          <H2>Platforms</H2>
          <H4 className="text-palette-violet-900">
            {game.platforms.map((platform) => platform.name).join(', ')}
          </H4>
        </div>
      )}

      {game.screenshots && game.screenshots.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          <H2>Media</H2>
          <MediaGallery media={game.screenshots} />
        </div>
      )}

      {game.similar_games && game.similar_games.length > 0 && (
        <div className="flex w-full flex-col gap-2">
          <H1 as="h2">Similar games</H1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(7.125rem,1fr))] gap-2 sm:grid-cols-[repeat(auto-fill,minmax(10.625rem,1fr))] sm:gap-4">
            {game.similar_games.map((game, index) => (
              <Link
                href={`/games/${game.slug}`}
                key={game.id}
                className={`hover:opacity-85 ${index >= 9 && 'hidden'} ${
                  index >= 8 && 'sm:hidden'
                }`}
              >
                <UnoptimizedImage
                  src={getIGDBImageUrl('cover_big', game.cover?.image_id)}
                  alt={game.name}
                  width={game.cover?.width ?? 170}
                  height={game.cover?.height ?? 226}
                  className="h-auto w-full rounded-lg ring-1 ring-palette-violet-50"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-fit items-center justify-center gap-1 rounded-full border border-palette-violet-50 px-3 py-2">
      {children}
    </div>
  )
}
