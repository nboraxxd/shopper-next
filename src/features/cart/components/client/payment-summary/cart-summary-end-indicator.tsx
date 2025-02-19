'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useCartSummaryState } from '@/features/cart/hooks'

export default function CartSummaryEndIndicator() {
  const { ref, inView } = useInView()

  const { setIsStatic } = useCartSummaryState()

  useEffect(() => {
    if (inView) {
      setIsStatic(true)
    } else {
      setIsStatic(false)
    }
  }, [inView, setIsStatic])

  return <div ref={ref} />
}
