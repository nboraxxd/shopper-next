'use client'

import { useEffect } from 'react'
import { useScroll } from 'motion/react'
import { useInView } from 'react-intersection-observer'

import { useShowStickyAction } from '@/features/product/hooks'

export default function FooterIndicator() {
  const { scrollY } = useScroll()
  const { ref, inView } = useInView()

  const setIsShow = useShowStickyAction((state) => state.setIsShow)

  useEffect(() => {
    if (scrollY.get() === 0) return

    if (inView) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
  }, [inView, scrollY, setIsShow])

  return <div ref={ref} className="lg:hidden" />
}
