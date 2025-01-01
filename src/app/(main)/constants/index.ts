import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'

export const NAVBAR = [
  {
    href: '/san-pham',
    label: 'Sản phẩm',
  },
  {
    href: '/laptop-thiet-bi-it/1846',
    label: 'Laptop',
  },
  {
    href: '/dien-thoai-may-tinh-bang/1789',
    label: 'Điện thoại',
  },
]

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
