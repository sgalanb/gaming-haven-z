import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { showDropdown?: boolean }
  // eslint-disable-next-line react/prop-types
>(({ className, type, showDropdown, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-[1.25rem] border border-[#FF00AE55] bg-white py-2 pl-10 pr-4 text-base leading-5 shadow-[0px_4px_16px_#F2D0E766] ring-offset-white placeholder:select-none placeholder:text-[#C698B8] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
        showDropdown && 'rounded-b-none'
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
