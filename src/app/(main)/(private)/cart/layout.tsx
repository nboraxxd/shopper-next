import { Footer } from '@/shared/components'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer className="hidden xl:block" />
    </>
  )
}
