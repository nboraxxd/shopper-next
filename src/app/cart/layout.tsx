import { CartHeader } from '@/features/cart/components/server'

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <CartHeader />
      {children}
    </>
  )
}
