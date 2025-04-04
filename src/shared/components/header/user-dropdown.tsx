'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { LogOutIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'nextjs-toploader/app'

import PATH from '@/shared/constants/path'
import { useMediaQuery } from '@/shared/hooks'
import { handleClientErrorApi } from '@/shared/utils/error'
import { useQueryProfileFromBackend } from '@/features/profile/hooks'
import { useLogoutMutation } from '@/features/auth/hooks'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { UserAvatar } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { ArrowRightIcon, Svgr } from '@/shared/components/icons'
import { AuthButtonSkeleton, ThemeDropdown } from '@/shared/components/header'

const USER_LINKS = [
  { label: 'Thông tin tài khoản', href: PATH.ACCOUNT },
  { label: 'Sản phẩm yêu thích', href: PATH.WISHLIST },
  { label: 'Theo dõi đơn hàng', href: PATH.ORDER_HISTORY },
] as const

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [showThemeDropdown, setShowThemeDropdown] = useState(false)

  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const is768AndUp = useMediaQuery({ minWidth: 768 })

  const logoutMutation = useLogoutMutation()
  const queryUserFromBackend = useQueryProfileFromBackend()

  useEffect(() => {
    if (!is768AndUp) {
      setIsOpen(false)
    }
  }, [is768AndUp])

  async function handleLogout() {
    if (logoutMutation.isPending) return

    try {
      const response = await logoutMutation.mutateAsync()

      router.refresh()
      toast.success(response.payload.message)
    } catch (error) {
      handleClientErrorApi({ error })
    }
  }

  if (queryUserFromBackend.isLoading) return <AuthButtonSkeleton />

  return queryUserFromBackend.isSuccess ? (
    <>
      <Button asChild variant="ghost" size="icon" className="md:hidden">
        <Link href={PATH.ACCOUNT}>
          <UserAvatar
            avatarUrl={queryUserFromBackend.data.payload.data.avatar}
            name={queryUserFromBackend.data.payload.data.name}
            height={52}
            width={52}
            variant="square"
            className="size-10 overflow-visible"
            fallbackClassName="bg-header-button shadow"
          />
          <span className="sr-only">Avatar của {queryUserFromBackend.data.payload.data.name}</span>
        </Link>
      </Button>
      <DropdownMenu
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          setTimeout(() => {
            setShowThemeDropdown(false)
          }, 200)
        }}
      >
        <DropdownMenuTrigger
          className="hidden size-auto cursor-pointer rounded-lg transition-none focus-visible:shadow-focus-within focus-visible:ring-0 md:inline-flex"
          asChild
        >
          <Button variant="ghost" size="icon">
            <UserAvatar
              avatarUrl={queryUserFromBackend.data.payload.data.avatar}
              name={queryUserFromBackend.data.payload.data.name}
              height={64}
              width={64}
              variant="square"
              className="size-10 overflow-visible lg:size-12"
              fallbackClassName="bg-header-button shadow"
            />
            <span className="sr-only">Menu người dùng của {queryUserFromBackend.data.payload.data.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 rounded-3xl border-none p-0 shadow-popover" align="end">
          {showThemeDropdown ? (
            <ThemeDropdown setShowThemeDropdown={setShowThemeDropdown} />
          ) : (
            <>
              <DropdownMenuLabel className="flex items-center gap-3 p-4">
                <UserAvatar
                  name={queryUserFromBackend.data.payload.data.name}
                  avatarUrl={queryUserFromBackend.data.payload.data.avatar}
                  height={72}
                  width={72}
                  variant="square"
                  className="size-14 text-lg font-semibold"
                />
                <div>
                  <p className="line-clamp-1 text-lg font-semibold">{queryUserFromBackend.data.payload.data.name}</p>
                  <p className="line-clamp-1 break-all">{queryUserFromBackend.data.payload.data.username}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="m-0" />
              <DropdownMenuGroup className="py-2 font-medium">
                {USER_LINKS.map(({ label, href }) => (
                  <DropdownMenuItem key={href} asChild className="min-h-10 rounded-none px-4">
                    <Link href={href}>{label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  className="min-h-10 rounded-none px-4 [&>svg]:size-5"
                  asChild
                  onClick={(ev) => {
                    ev.preventDefault()
                    setShowThemeDropdown(true)
                  }}
                >
                  <button className="w-full">
                    <span>
                      Giao diện: <span>{resolvedTheme === 'dark' ? 'Tối' : 'Sáng'}</span>
                    </span>
                    <Svgr icon={ArrowRightIcon} className="ml-auto" />
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="m-0" />
              <DropdownMenuGroup className="py-2 font-medium">
                <DropdownMenuItem
                  asChild
                  className="min-h-10 w-full rounded-none px-4 [&>svg]:size-5"
                  onClick={handleLogout}
                >
                  <button>
                    <LogOutIcon strokeWidth={1.5} />
                    Đăng xuất
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : null
}
