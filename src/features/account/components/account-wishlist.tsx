import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { formatCurrency } from '@/shared/utils'
import { ACCESS_TOKEN } from '@/features/auth/constants'
import wishlistServerApi from '@/features/wishlist/api/server'
import { WishlistResponse } from '@/features/wishlist/types'

import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { ReviewsEmptyIcon } from '@/shared/components/icons'

export async function AccountWishlistContent() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect(PATH.LOGIN)

  let wishlistResponse: WishlistResponse['data'] | null = null

  try {
    const response = await wishlistServerApi.getWishlistFromBackend({ accessToken, limit: 5, page: 1 })

    wishlistResponse = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return wishlistResponse ? (
    <>
      {wishlistResponse.length > 1
        ? wishlistResponse.map((wishlistItem) => (
            <Fragment key={wishlistItem.id}>
              <div className="flex items-center gap-3 first-of-type:mt-4 md:gap-5">
                <Link href={`/${wishlistItem.slug}`} className="shrink-0">
                  <Image
                    src={wishlistItem.thumbnail_url}
                    alt={wishlistItem.name}
                    width={96}
                    height={96}
                    className="w-20 rounded object-contain"
                  />
                </Link>
                <div className="grow font-medium">
                  <Link href={`/${wishlistItem.slug}`}>
                    <h3 className="line-clamp-1 text-sm md:text-base">{wishlistItem.name}</h3>
                  </Link>
                  <div className="mt-1 flex flex-col gap-1 md:mt-2.5 md:flex-row md:items-center">
                    <p className="grow text-base md:text-lg">
                      {formatCurrency(wishlistItem.real_price)}
                      <sup>₫</sup>
                    </p>
                    <Button className="ml-auto h-8 rounded-full px-3 py-0 text-xs md:h-10 md:px-4 md:text-sm">
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </div>
              <Separator className="my-3 last-of-type:hidden md:my-5" />
            </Fragment>
          ))
        : null}
      {wishlistResponse.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center gap-2">
          <ReviewsEmptyIcon />
          <p>Bạn chưa có sản phẩm yêu thích nào</p>
        </div>
      ) : null}
    </>
  ) : null
}

export function AccountWishlistSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <Fragment key={index}>
      <div className="flex items-center gap-3 first-of-type:mt-4 md:gap-5">
        <Skeleton className="size-20 rounded" />
        <div className="grow">
          <Skeleton className="h-5 w-full md:h-6 md:w-10/12" />
          <div className="mt-1 flex flex-col gap-1 md:mt-2.5 md:flex-row md:items-center">
            <Skeleton className="h-6 w-1/3 md:w-1/4" />
            <Skeleton className="ml-auto h-8 w-[6.625rem] rounded-full md:h-10 md:w-32" />
          </div>
        </div>
      </div>
      <Separator className="my-3 last-of-type:hidden md:my-5" />
    </Fragment>
  ))
}
