import Link from 'next/link'
import Image from 'next/image'

import PATH from '@/shared/constants/path'

import { Button } from '@/shared/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero.avif"
          alt="Hình ảnh của người phụ nữ cầm túi giấy trắng và đen"
          className="size-full object-cover object-center"
          width={1920}
          height={1280}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-dark-1 opacity-60" />
      <div className="flex">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h2 className="text-4xl font-bold tracking-tight text-light-2 lg:text-6xl">Xu hướng mới</h2>
          <p className="mt-4 text-balance text-xl text-light-2">
            Cập nhật xu hướng mới nhất từ các nhà thiết kế hàng đầu thế giới.
          </p>
          <Button asChild size="lg" className="mt-8 bg-light-2 px-8 hover:bg-light-1">
            <Link href={PATH.PRODUCTS}>Xem sản phẩm mới</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
