import { cn } from '@/lib/utils'

export function H1({
  children,
  as = 'h1',
  className,
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}) {
  const Tag = as
  // text fill: linear gradient from #6727A6 to #3C1661
  return (
    <Tag
      className={cn(
        'bg-gradient-to-r from-[#3C1661] to-[#6727A6] bg-clip-text text-xl font-semibold text-transparent sm:text-2xl',
        className
      )}
    >
      {children}
    </Tag>
  )
}

// background: linear-gradient(273.17deg, #6727A6 8.25%, #3C1661 91.72%);
// -webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
// background-clip: text;
// text-fill-color: transparent;
