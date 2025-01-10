import Link from 'next/link'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/utils'

import { Button } from '@/shared/components/ui/button'

interface Props extends ComponentProps<typeof Link> {
  children: React.ReactNode
}

export default function TextLink({ children, className, ...rest }: Props) {
  return (
    <Button asChild variant="link" className={cn('h-auto p-0 text-link', className)}>
      <Link {...rest}>{children}</Link>
    </Button>
  )
}
