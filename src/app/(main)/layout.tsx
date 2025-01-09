import { Footer } from '@/shared/components'
import { Header } from '@/shared/components/header'

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
