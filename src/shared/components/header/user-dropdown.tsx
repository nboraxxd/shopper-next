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
import { useQueryUserFromBackend } from '@/features/user/hooks'
import { useLogoutToServerMutation } from '@/features/auth/hooks'

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
import { ArrowRightIcon } from '@/shared/components/icons'
import { AuthButtonSkeleton, ThemeDropdown } from '@/shared/components/header'

const USER_LINKS = [
  { label: 'Thông tin tài khoản', href: PATH.ACCOUNT },
  { label: 'Sản phẩm yêu thích', href: PATH.WISHLIST },
  { label: 'Theo dõi đơn hàng', href: PATH.PURCHASES },
] as const

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [showThemeDropdown, setShowThemeDropdown] = useState(false)

  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const is768AndUp = useMediaQuery({ minWidth: 768 })

  const queryUserFromBackend = useQueryUserFromBackend()
  const logoutToServerMutation = useLogoutToServerMutation()

  useEffect(() => {
    if (!is768AndUp) {
      setIsOpen(false)
    }
  }, [is768AndUp])

  async function handleLogout() {
    if (logoutToServerMutation.isPending) return

    try {
      const response = await logoutToServerMutation.mutateAsync()

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
        <Link href={PATH.CART}>
          <UserAvatar
            avatarUrl={queryUserFromBackend.data.payload.data.avatar}
            name={queryUserFromBackend.data.payload.data.name}
            height={52}
            width={52}
            variant="square"
            className="size-10"
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
        <DropdownMenuTrigger className="size-auto cursor-pointer" asChild>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <UserAvatar
              avatarUrl={queryUserFromBackend.data.payload.data.avatar}
              name={queryUserFromBackend.data.payload.data.name}
              height={64}
              width={64}
              variant="square"
              className="size-10 lg:size-12"
            />
            <span className="sr-only">Menu người dùng</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 rounded-3xl p-0" align="end">
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
                    <ArrowRightIcon className="ml-auto" />
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
