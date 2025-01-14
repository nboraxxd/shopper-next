'use client'

import { Button } from '@/shared/components/ui/button'
import { CategoriesIcon } from '@/shared/components/icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card'
import { useCategoryHoverStore } from '@/shared/stores'

export default function CategoriesHover({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useCategoryHoverStore()

  return (
    <HoverCard openDelay={300} closeDelay={0} defaultOpen={false} open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className="hidden size-12 transition-opacity hover:opacity-90 lg:inline-flex"
          size="icon"
        >
          <CategoriesIcon />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={-10}
        align="start"
        alignOffset={-100}
        className="w-auto rounded-3xl p-8 !shadow-popover"
      >
        <nav>{children}</nav>
      </HoverCardContent>
    </HoverCard>
  )
}
