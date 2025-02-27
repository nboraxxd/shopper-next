import Link from 'next/link'

import PATH from '@/shared/constants/path'

import { ShopperIcon, Svgr } from '@/shared/components/icons'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="container flex h-screen items-center justify-center">
      <Card className="w-[31.25rem] rounded">
        <CardHeader className="items-center px-3 md:px-4">
          <Link href={PATH.HOME} className="flex items-center gap-3 p-2">
            <Svgr icon={ShopperIcon} width={28} height={28} className="size-7 text-secondary-blue" />
            <span className="text-lg font-bold">Shopper</span>
          </Link>
        </CardHeader>
        <CardContent className="px-4 md:px-6">{children}</CardContent>
      </Card>
    </section>
  )
}
