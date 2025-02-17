'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/utils'
import { ACCOUNT_MENU } from '@/features/account/constants'
import { useQueryProfileFromBackend } from '@/features/profile/hooks'

import { Svgr } from '@/shared/components/icons'
import { UserAvatar } from '@/shared/components'
import { Skeleton } from '@/shared/components/ui/skeleton'

export default function AccountDesktopSidebar() {
  return (
    <aside className="sticky top-[calc(var(--header-height)+2rem)] col-span-1 self-start rounded-4xl bg-account-section shadow-section">
      <SidebarHeader />
      <SidebarNav />
    </aside>
  )
}

function SidebarHeader() {
  const queryProfileFromBackend = useQueryProfileFromBackend()

  return (
    <div className="hidden flex-col items-center rounded-t-4xl bg-account-cover bg-cover bg-center bg-no-repeat p-5 pt-10 lg:flex">
      {queryProfileFromBackend.isLoading ? (
        <>
          <Skeleton className="size-[7.875rem] rounded-full bg-background/20 dark:bg-foreground/20" />
          <Skeleton className="mt-2 h-[1.625rem] w-2/3 bg-background/20 dark:bg-foreground/20" />
        </>
      ) : null}
      {queryProfileFromBackend.isSuccess ? (
        <>
          <UserAvatar
            avatarUrl={queryProfileFromBackend.data.payload.data.avatar}
            name={queryProfileFromBackend.data.payload.data.name}
            height={142}
            width={142}
            className="size-[7.875rem] border-[5px] border-light-1/20 text-4xl font-medium shadow"
            fallbackClassName="bg-account-highlight text-5xl"
          />
          <h2 className="mt-2 line-clamp-1 text-lg font-bold text-light-1">
            {queryProfileFromBackend.data.payload.data.name}
          </h2>
        </>
      ) : null}
    </div>
  )
}

function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden py-6 lg:block">
      {ACCOUNT_MENU.map((menu, index) => (
        <div key={index} className="mt-6 px-4 first:mt-0 2xl:px-7">
          <h3 className="text-lg font-medium">{menu.title}</h3>
          <ul className="mt-2 space-y-1">
            {menu.items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex h-8 items-center gap-2 rounded-md px-1 transition-colors hover:bg-account-highlight',
                    {
                      'text-highlight bg-account-highlight':
                        item.href.split('/').length === 3
                          ? item.href.split('/')[2] === pathname.split('/')[2]
                          : item.href === pathname,
                    }
                  )}
                >
                  <Svgr icon={item.icon} />
                  <span className="text-[0.9375rem] font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
