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
          <main className="mt-5 h-fit rounded-4xl bg-account-section px-4 py-7 shadow-section lg:col-span-3 lg:mt-0 lg:px-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
