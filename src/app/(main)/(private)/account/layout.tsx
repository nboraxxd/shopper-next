import { Suspense } from 'react'

import { getAccessTokenInServer } from '@/shared/utils/server'

import { Footer } from '@/shared/components'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { AccountMobileNav } from '@/features/account/components'
import { AccountSidebarNav } from '@/features/account/components/client'
import { AccountSidebarHeader } from '@/features/account/components/server'

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const accessToken = await getAccessTokenInServer()

  return (
    <>
      <div className="bg-account">
        <div className="container py-8">
          <div className="gap-x-7 lg:grid lg:grid-cols-4">
            <AccountMobileNav />
            {/* Desktop sidebar */}
            <aside className="sticky top-[calc(var(--header-height)+2rem)] col-span-1 self-start rounded-4xl bg-account-section shadow-section">
              <div className="hidden flex-col items-center rounded-t-4xl bg-account-cover bg-cover bg-center bg-no-repeat p-5 pt-10 lg:flex">
                <Suspense
                  fallback={
                    <>
                      <Skeleton className="size-[7.875rem] rounded-full bg-background/20 dark:bg-foreground/20" />
                      <Skeleton className="mt-2 h-[1.625rem] w-2/3 bg-background/20 dark:bg-foreground/20" />
                    </>
                  }
                >
                  <AccountSidebarHeader accessToken={accessToken} />
                </Suspense>
              </div>
              <AccountSidebarNav />
            </aside>
            <main className="mt-5 lg:col-span-3 lg:mt-0">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
