import Link from 'next/link'
import { Metadata } from 'next'

import PATH from '@/shared/constants/path'

import { ShopperIcon, Svgr } from '@/shared/components/icons'
import { ResendVerificationEmailForm } from '@/features/auth/components'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'

export const metadata: Metadata = {
  title: 'Gửi lại email xác thực',
}

export default function ResendVerificationEmailPage() {
  return (
    <section className="container flex h-screen items-center justify-center">
      <Card className="w-[31.25rem] rounded">
        <CardHeader className="items-center gap-7 space-y-0">
          <Link href={PATH.HOME} className="flex items-center gap-3 p-2">
            <Svgr icon={ShopperIcon} width={28} height={28} className="size-7 text-secondary-blue" />
            <span className="text-lg font-bold">Shopper</span>
          </Link>
          <CardTitle className="text-lg font-medium sm:text-xl">Gửi lại email xác thực</CardTitle>
        </CardHeader>
        <CardContent>
          <ResendVerificationEmailForm />
        </CardContent>
      </Card>
    </section>
  )
}
