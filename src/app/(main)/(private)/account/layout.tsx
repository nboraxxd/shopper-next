import { AccountDesktopSidebar, AccountMobileNav } from '@/features/account/components'

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-account">
      <div className="container py-8">
        <div className="gap-x-7 lg:grid lg:grid-cols-4">
          <AccountMobileNav />
          <AccountDesktopSidebar />
          <main className="mt-5 h-fit lg:col-span-3 lg:mt-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
