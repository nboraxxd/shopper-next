import { Fragment } from 'react'

import cartServerApi from '@/features/cart/api/server'
import { GetCartListResponse } from '@/features/cart/types'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { SortedCartList } from '@/features/cart/components/client'

export async function CartList({ accessToken }: { accessToken: string }) {
  let cartList: GetCartListResponse['data']['listItems'] | null = null

  try {
    const response = await cartServerApi.getCartListFromBackend(accessToken)

    cartList = response.payload.data.listItems
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return cartList ? <SortedCartList cartListFromServer={cartList} /> : null
}

export function CartListSketeton() {
  return (
    <>
      <div className="flex items-center gap-3 md:gap-5">
        <Skeleton className="size-5 md:size-6" />
        <Skeleton className="h-5 w-36 md:h-6" />
      </div>
      <Separator className="my-3 md:my-5" />
      {[...Array(12)].map((_, index) => (
        <Fragment key={index}>
          <div className="flex items-center gap-2 md:gap-3">
            <Skeleton className="size-5 md:size-6" />
            <Skeleton className="ml-1 size-16 md:ml-2 md:size-20" />
            <div className="h-full">
              <Skeleton className="h-5 w-36 md:w-60" />
              <Skeleton className="mt-1 h-5 w-24 md:w-36" />
              <Skeleton className="mt-2 h-5 w-16 md:mt-3 md:w-24" />
            </div>
          </div>
          <Separator className="my-3 last:hidden md:my-5" />
        </Fragment>
      ))}
    </>
  )
}
