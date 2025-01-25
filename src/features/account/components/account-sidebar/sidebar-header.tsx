'use client'

import { useQueryUserFromBackend } from '@/features/user/hooks'

import { UserAvatar } from '@/shared/components'
import { Skeleton } from '@/shared/components/ui/skeleton'

export default function SidebarHeader() {
  const queryUserFromBackend = useQueryUserFromBackend()

  return (
    <div className="hidden flex-col items-center rounded-t-4xl bg-account-cover bg-cover bg-center bg-no-repeat p-5 pt-10 lg:flex">
      {queryUserFromBackend.isLoading ? (
        <>
          <Skeleton className="size-[7.875rem] rounded-full bg-background/20 dark:bg-foreground/20" />
          <Skeleton className="mt-2 h-[1.625rem] w-2/3 bg-background/20 dark:bg-foreground/20" />
        </>
      ) : null}
      {queryUserFromBackend.isSuccess ? (
        <>
          <UserAvatar
            avatarUrl={queryUserFromBackend.data.payload.data.avatar}
            name={queryUserFromBackend.data.payload.data.name}
            height={142}
            width={142}
            className="size-[7.875rem] border-[5px] border-light-1/20 text-4xl font-medium shadow"
          />
          <h2 className="mt-2 line-clamp-1 text-lg font-bold text-light-1">
            {queryUserFromBackend.data.payload.data.name}
          </h2>
        </>
      ) : null}
    </div>
  )
}
