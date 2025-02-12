'use client'

import { cn } from '@/shared/utils'

import { Button } from '@/shared/components/ui/button'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function ThumbControlButton({ children, onClick, className }: Props) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'absolute top-1/2 z-10 size-8 -translate-y-1/2 rounded-full bg-secondary-2/95 text-light-1 opacity-0 transition-opacity duration-300 hover:bg-secondary-2 group-hover/swiper:opacity-100',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
