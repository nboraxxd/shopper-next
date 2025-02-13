'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useShowStickyAction } from '@/features/product/hooks'

export default function FooterIndicator() {
  const { ref, inView } = useInView()
  const setIsShow = useShowStickyAction((state) => state.setIsShow)

  useEffect(() => {
    if (inView) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
  }, [inView, setIsShow])

  return <div ref={ref} className="lg:hidden" />
}
