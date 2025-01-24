import { AccountSidebar } from '@/features/account/components'

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="bg-account">
      <div className="container py-8">
        <div className="gap-x-7 gap-y-5 lg:grid lg:grid-cols-4">
          <AccountSidebar />
          <div className="rounded-4xl bg-account-section lg:col-span-3">{children}</div>
        </div>
      </div>
    </main>
  )
}
