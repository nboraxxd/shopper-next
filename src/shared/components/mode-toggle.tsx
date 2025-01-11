'use client'

import { useTheme } from 'next-themes'
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'

import { useIsClient } from '@/shared/hooks'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/ui/toggle-group'

export const THEMES = [
  {
    value: 'system',
    icon: LaptopIcon,
  },
  {
    value: 'dark',
    icon: MoonIcon,
  },
  {
    value: 'light',
    icon: SunIcon,
  },
] as const

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
          className="group size-7 min-w-7 rounded-full hover:bg-foreground/15 data-[state=on]:bg-foreground/15"
        >
          <Icon className="size-4 transition-transform group-hover:scale-110" />
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
