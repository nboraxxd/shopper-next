import { useCallback, useSyncExternalStore } from 'react'

type Width =
  | {
      minWidth?: number
      maxWidth: number
    }
  | {
      minWidth: number
      maxWidth?: number
    }
  | {
      minWidth: number
      maxWidth: number
    }

type Query =
  | `only screen and (max-width : ${string}px)`
  | `only screen and (min-width : ${string}px)`
  | `only screen and (min-width : ${string}px) and (max-width : ${string}px)`

/**
 * useMediaQuery hook to detect the screen width and return a boolean value
 * @param minWidth - The minimum width of the screen
 * @param maxWidth - The maximum width of the screen
 * @returns boolean - Returns true if the screen width is between the minWidth and maxWidth
 * Otherwise, returns false
 * @example
 * const isMobile = useMediaQuery({ maxWidth: 767 })
 * const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
 * const isDesktop = useMediaQuery({ minWidth: 1024 })
 */
export default function useMediaQuery({ minWidth, maxWidth }: Width): boolean {
  let query: Query
  if (minWidth && !maxWidth) {
    query = `only screen and (min-width : ${minWidth}px)`
  } else if (!minWidth && maxWidth) {
    query = `only screen and (max-width : ${maxWidth}px)`
  } else {
    query = `only screen and (min-width : ${minWidth}px) and (max-width : ${maxWidth}px)`
  }

  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener('change', callback)
      return () => {
        matchMedia.removeEventListener('change', callback)
      }
    },
    [query]
  )

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    throw new Error('useMediaQuery is a client-only hook')
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
