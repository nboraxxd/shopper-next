'use client'

import { cn } from '@/shared/utils'

import { Button, ButtonProps } from '@/shared/components/ui/button'

export default function TriggerButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'h-9 gap-1 px-3 py-0 text-products-button-foreground focus-visible:shadow-focus-within focus-visible:ring-0 [&_svg]:size-4',
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}
