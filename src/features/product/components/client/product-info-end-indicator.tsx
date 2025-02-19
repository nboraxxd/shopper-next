'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useShowStickyAction } from '@/features/product/hooks'

export default function ProductInfoEndIndicator() {
  const { ref, entry } = useInView()
  const setIsShow = useShowStickyAction((state) => state.setIsShow)

  useEffect(() => {
    if (!entry?.boundingClientRect.top) return

    if (entry.boundingClientRect.top < 0) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }, [entry?.boundingClientRect.top, setIsShow])

  return <div ref={ref} className="lg:hidden" />
}
