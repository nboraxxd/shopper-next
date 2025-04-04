import { Footer } from '@/shared/components'

export default function CartLayout({
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
