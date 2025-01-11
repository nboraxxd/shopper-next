'use client'

import { useTheme } from 'next-themes'
import { Dispatch, SetStateAction } from 'react'

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu'
import { ArrowLeftIcon } from '@/shared/components/icons'

interface Props {
  setShowThemeDropdown: Dispatch<SetStateAction<boolean>>
}

const THEMES = [
  { value: 'system', label: 'Dùng giao diện của thiết bị' },
  { value: 'dark', label: 'Giao diện tối' },
  { value: 'light', label: 'Giao diện sáng' },
] as const

export default function ThemeDropdown({ setShowThemeDropdown }: Props) {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <DropdownMenuLabel className="flex h-12 items-center p-0">
        <DropdownMenuItem
          className="mx-1 size-10 justify-center rounded-full hover:bg-accent [&>svg]:size-6"
          asChild
          onClick={(ev) => {
            ev.preventDefault()
            setShowThemeDropdown(false)
          }}
        >
          <button>
            <ArrowLeftIcon className="size-8" />
          </button>
        </DropdownMenuItem>
        <span className="font-medium">Giao diện</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="m-0" />
      <DropdownMenuRadioGroup className="py-2 font-medium" value={theme} onValueChange={setTheme}>
        <p className="flex min-h-10 items-center pl-4 pr-9 text-xs font-normal text-foreground/50">
          Tùy chọn cài đặt chỉ áp dụng cho trình duyệt này
        </p>
        {THEMES.map(({ label, value }) => (
          <DropdownMenuRadioItem key={value} className="min-h-10 rounded-none" value={value}>
            {label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </>
  )
}
