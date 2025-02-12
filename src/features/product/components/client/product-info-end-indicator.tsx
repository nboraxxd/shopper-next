'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function ProductInfoEndIndicator() {
  const { ref, entry } = useInView()

  useEffect(() => {
    if (!entry?.boundingClientRect.top) return

    if (entry.boundingClientRect.top <= 0) {
      console.log(entry.boundingClientRect.top)
    }
  }, [entry?.boundingClientRect.top])

  return <div ref={ref} />
}
