import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Montserrat as FontSans } from 'next/font/google'

import { cn } from '@/shared/utils'

import { Toaster } from '@/shared/components/ui/sonner'
import { AuthCleanup, RefreshToken } from '@/shared/components'
import { ThemeProvider, TanstackQueryProvider } from '@/shared/components/provider'
import './globals.css'

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['vietnamese'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Shopper',
    default: 'Shopper - Mua sắm trực tuyến dễ dàng hơn',
  },
  description:
    'Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Hoàn tiền 111% nếu giả. Đổi trả miễn phí trong 30 ngày. Đặt mua ngay!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased', fontSans.className, fontSans.variable)}>
        <TanstackQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextTopLoader showSpinner={false} color="#0071DC" shadow="0 0 10px #0071DC,0 0 5px #0071DC" />
            {children}
            <RefreshToken />
            <AuthCleanup />
            <Toaster />
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
