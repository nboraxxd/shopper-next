import Image from 'next/image'
import Link from 'next/link'

import PATH from '@/shared/constants/path'

import { ShopperIcon, Svgr } from '@/shared/components/icons'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col items-center justify-center gap-12 bg-auth-intro px-7 lg:flex">
        <Image
          width={424}
          height={265}
          src="/images/auth/intro.svg"
          alt="Khách hàng đang tìm kiếm sản phẩm online"
          className="w-[min(424px,100%)]"
          priority
        />
        <h1 className="max-w-md text-center text-lg font-medium text-auth-intro-foreground">
          <span>Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ.</span>
          <br />
          <span>Vô vàn ưu đãi freeship, mã giảm giá.</span>
        </h1>
      </div>

      <div className="bg-auth-content px-5 sm:px-7">
        <div className="mx-auto flex w-[min(460px,100%)] flex-col items-center justify-center py-14 lg:pt-20">
          <Link href={PATH.HOME} className="flex items-center gap-3.5 p-2">
            <Svgr icon={ShopperIcon} width={32} height={32} className="size-8 text-secondary-blue" />
            <span className="text-xl font-bold">Shopper</span>
          </Link>
          {children}
        </div>
      </div>
    </main>
  )
}
