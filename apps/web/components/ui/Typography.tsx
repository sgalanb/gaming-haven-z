import { cn } from '@/lib/utils'

export function H1({
  children,
  className,
  as = 'h1',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
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

export function H2({
  children,
  className,
  as = 'h2',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  const Tag = as
  return (
    <Tag className={cn('text-base font-semibold', className)}>{children}</Tag>
  )
}

export function H3({
  children,
  className,
  as = 'h3',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  const Tag = as
  return (
    <Tag className={cn('text-sm font-medium text-[#775C90]', className)}>
      {children}
    </Tag>
  )
}

export function H4({
  children,
  className,
  as = 'h4',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  const Tag = as
  return (
    <Tag className={cn('text-sm font-medium text-[#666666]', className)}>
      {children}
    </Tag>
  )
}
