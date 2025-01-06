import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'

export const THEMES = [
  {
    value: 'system',
    icon: LaptopIcon,
  },
  {
    value: 'light',
    icon: SunIcon,
  },
  {
    value: 'dark',
    icon: MoonIcon,
  },
] as const
