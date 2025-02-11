import { AccountDesktopSidebar, AccountMobileNav } from '@/features/account/components'

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] bg-account lg:block lg:min-h-max">
      <div className="container flex flex-1 py-8 lg:block">
        <div className="flex flex-1 flex-col gap-x-7 lg:grid lg:grid-cols-4">
          <AccountMobileNav />
          <AccountDesktopSidebar />
          <main className="mt-5 flex-1 lg:col-span-3 lg:mt-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
