import { Footer, Header } from '@/app/(main)/_components'

export default function PublicLayout({
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
