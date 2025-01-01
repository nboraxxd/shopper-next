'use client'

import { useTheme } from 'next-themes'

import { useIsClient } from '@/hooks'
import { THEMES } from '@/app/(main)/constants'

import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default function ModeToggle() {
  const isClient = useIsClient()

  const { setTheme, theme } = useTheme()

  return isClient ? (
    <ToggleGroup type="single" value={theme} onValueChange={(value) => setTheme(value)}>
      {THEMES.map(({ value, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={`Toggle ${value}`}
          className="size-7 min-w-7 rounded-full"
        >
          <Icon className="size-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ) : (
    <div className="flex gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="size-7 min-w-7 rounded-full" />
      ))}
    </div>
  )
}
