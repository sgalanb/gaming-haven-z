'use client'

import { RefCallback, useCallback, useRef, useState } from 'react'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [RefCallback<Element>, IntersectionObserverEntry | undefined] {
  const { threshold = 1, root = null, rootMargin = '0px' } = options
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(
    undefined
  )

  const previousObserver = useRef<IntersectionObserver | undefined>(undefined)

  const customRef = useCallback(
    (node: Element | null) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect()
        previousObserver.current = undefined
      }

      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setEntry(entry)
          },
          { threshold, root, rootMargin }
        )

        observer.observe(node)
        previousObserver.current = observer
      }
    },
    [threshold, root, rootMargin]
  )

  return [customRef, entry]
}
