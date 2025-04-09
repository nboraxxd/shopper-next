'use client'

import { useEffect } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface Props {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export default function LoadMoreIndicator({ fetchNextPage, hasNextPage, isFetchingNextPage }: Props) {
  const { ref, inView } = useInView({ rootMargin: '400px' })
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div ref={ref} className="flex justify-center">
      {isFetchingNextPage ? <LoaderCircleIcon className="mt-3 size-6 animate-spin" /> : null}
    </div>
  )
}
