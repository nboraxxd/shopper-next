'use client'

import Link from 'next/link'

import PATH from '@/shared/constants/path'
import { useIsClient } from '@/shared/hooks'
import { useAuthStore } from '@/features/auth/auth-store'

import { Button } from '@/shared/components/ui/button'
import { ProfileIcon } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { UserDropdown } from '@/shared/components/header'

function AuthButton() {
  const isClient = useIsClient()

  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isClient) return <AuthButtonSkeleton />

  return isAuth ? (
    <UserDropdown />
  ) : (
    // Ở đây dùng paddingX thay vì dùng width
    // để tránh việc button bị co lại trên màn hình lớn
    <Button
      size="lg"
      className="h-10 bg-muted px-2 text-foreground hover:bg-muted/75 md:bg-primary md:px-5 md:text-primary-foreground md:hover:bg-primary/90 lg:h-12"
      asChild
    >
      <Link href={PATH.LOGIN}>
        <ProfileIcon className="md:hidden" />
        <span className="sr-only md:not-sr-only">Đăng nhập</span>
      </Link>
    </Button>
  )
}

function AuthButtonSkeleton() {
  return <Skeleton className="size-10 lg:size-12" />
}

export { AuthButton, AuthButtonSkeleton }
