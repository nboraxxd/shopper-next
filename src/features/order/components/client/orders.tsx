'use client'

import Image from 'next/image'

import React, { Fragment } from 'react'
import { useQueryOrders } from '@/features/order/hooks'
import { Order as OrderType } from '@/features/order/types'
import { ORDER_ITEM_STATUS } from '@/features/order/constants'
import { useSearchParams } from 'next/navigation'
import { formatCurrency } from '@/shared/utils'
import { LoadMoreIndicator } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'

export default function Orders() {
  const searchParams = useSearchParams()
  const statusFromUrl = searchParams.get('status')
  console.log('🔥 ~ Orders ~ statusFromUrl:', statusFromUrl)

  const queryOrders = useQueryOrders()

  return (
    <div className="mt-3 flex flex-col gap-3 md:mt-5 md:gap-5">
      {queryOrders.isLoading ? <div>Loading...</div> : null}
      {queryOrders.isSuccess
        ? queryOrders.data.pages.length > 0 && queryOrders.data.pages[0].payload.data.length > 0
          ? queryOrders.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.payload.data.map((item) => (
                  <Order key={item._id} status={item.status} products={item.listItems} total={item.total} />
                ))}
              </Fragment>
            ))
          : null
        : null}
      {queryOrders.isSuccess ? (
        <LoadMoreIndicator
          fetchNextPage={queryOrders.fetchNextPage}
          hasNextPage={queryOrders.hasNextPage}
          isFetchingNextPage={queryOrders.isFetchingNextPage}
        />
      ) : null}
    </div>
  )
}

interface OrderProps {
  status: OrderType['status']
  products: OrderType['listItems']
  total: OrderType['total']
}

function Order({ products, status, total }: OrderProps) {
  const { icon: OrderIcon, label: orderStatus } = ORDER_ITEM_STATUS[status]

  return (
    <div className="flex flex-col rounded-md border p-4">
      <div className="flex items-center gap-1.5 border-b pb-3 text-sm text-secondary-2">
        <OrderIcon className="size-4" />
        <span className="mt-px">{orderStatus}</span>
      </div>
      {products.map((item) => (
        <div key={item.productId} className="flex justify-between gap-3 border-b border-dashed py-4 last:border-none">
          <div className="flex gap-3">
            <div className="relative shrink-0 select-none rounded-md border">
              <Image
                className="w-20 rounded object-contain"
                src={item.product.thumbnail_url}
                alt={item.product.name}
                width={96}
                height={96}
              />
              <span className="absolute bottom-0 right-0 flex h-6 min-w-6 items-center justify-center rounded-tl-md bg-secondary-2 text-xs">
                x{item.quantity}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="line-clamp-2 text-xs md:text-sm">{item.product.name}</p>
              <p className="text-xs text-secondary-2 md:text-sm">
                {formatCurrency(item.product.real_price)}
                <sup>₫</sup>
              </p>
            </div>
          </div>
          <span className="shrink-0">
            {formatCurrency(item.price)}
            <sup>₫</sup>
          </span>
        </div>
      ))}
      <div className="flex flex-col items-end border-t pt-3">
        <div>
          <span className="text-secondary-2">Tổng tiền:</span>
          <span>
            {formatCurrency(total)}
            <sup>₫</sup>
          </span>
        </div>
        <Button variant="outline">Xem chi tiết</Button>
      </div>
    </div>
  )
}
