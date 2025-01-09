import { Footer, Header } from '@/shared/components'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
