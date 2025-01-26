import { AccountSidebar } from '@/features/account/components'

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-account">
      <div className="container py-8">
        <div className="gap-x-7 lg:grid lg:grid-cols-4">
          <AccountSidebar />
          <main className="mt-5 rounded-4xl bg-account-section p-4 shadow-section lg:col-span-3 lg:mt-0 lg:p-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
