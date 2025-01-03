import Image from 'next/image'

// Disable image optimization because there are thousands of games and Vercel bills per optimized image
export function UnoptimizedImage({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return <Image src={src} alt={alt} width={width} height={height} unoptimized />
}
