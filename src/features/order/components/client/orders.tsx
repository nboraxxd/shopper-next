'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import PATH from '@/shared/constants/path'
import { formatCurrency } from '@/shared/utils'
import { useQueryOrders } from '@/features/order/hooks'
import { Order as OrderType } from '@/features/order/types'
import { ORDER_ITEM_STATUS, ORDER_STATUS } from '@/features/order/constants'

import { Button } from '@/shared/components/ui/button'
import { LoadMoreIndicator } from '@/shared/components'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/ui/collapsible'

export default function Orders() {
  const searchParams = useSearchParams()
  const statusFromUrl = searchParams.get('status')

  const sanitizedOrderStatus = Object.values(ORDER_STATUS).includes(statusFromUrl as OrderType['status'])
    ? (statusFromUrl as OrderType['status'])
    : undefined

  const queryOrders = useQueryOrders(sanitizedOrderStatus)

  return (
    <>
      <div className="mt-3 flex flex-col gap-3 md:mt-5 md:gap-5">
        {queryOrders.isLoading ? Array.from({ length: 3 }).map((_, index) => <OrderSkeleton key={index} />) : null}
        {queryOrders.isSuccess ? (
          queryOrders.data.pages.length > 0 && queryOrders.data.pages[0].payload.data.length > 0 ? (
            queryOrders.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.payload.data.map((item) => (
                  <Order
                    key={item._id}
                    id={item._id}
                    status={item.status}
                    products={item.listItems}
                    total={item.total}
                  />
                ))}
              </Fragment>
            ))
          ) : (
            <div className="flex h-96 flex-col items-center justify-center gap-2">
              <Image
                width={200}
                height={200}
                src="/images/order/empty-order.png"
                alt="Empty order"
                className="size-48"
              />
              <p>Chưa có đơn hàng</p>
            </div>
          )
        ) : null}
      </div>
      {queryOrders.isSuccess && queryOrders.hasNextPage ? (
        <LoadMoreIndicator
          fetchNextPage={queryOrders.fetchNextPage}
          hasNextPage={queryOrders.hasNextPage}
          isFetchingNextPage={queryOrders.isFetchingNextPage}
        />
      ) : null}
    </>
  )
}

function OrderSkeleton() {
  return (
    <div className="flex flex-col rounded-md border p-3 md:p-4">
      <div className="border-b border-dashed pb-3">
        <Skeleton className="h-5 w-1/2 xs:w-1/3 md:w-1/4" />
      </div>
      <div className="flex flex-col gap-3 py-3 md:gap-4 md:py-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex gap-2 md:gap-3">
            <Skeleton className="size-16 rounded md:size-20" />
            <div className="flex grow flex-col gap-2">
              <Skeleton className="h-4 w-full xs:w-3/4 md:h-5 md:w-1/2" />
              <Skeleton className="h-4 w-20 md:h-5" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-dashed pt-3 md:gap-3">
        <div className="flex">
          <Skeleton className="ml-auto h-5 w-44 md:h-6" />
        </div>
        <Skeleton className="h-8 w-32 self-end rounded-md md:h-9" />
      </div>
    </div>
  )
}

interface OrderProps {
  id: OrderType['_id']
  status: OrderType['status']
  products: OrderType['listItems']
  total: OrderType['total']
}

function Order({ id, products, status, total }: OrderProps) {
  const { icon: OrderIcon, label: orderStatus } = ORDER_ITEM_STATUS[status]

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col rounded-md border p-3 md:p-4">
      <div className="flex items-center gap-1.5 border-b border-dashed pb-3 text-sm text-secondary-2">
        <OrderIcon className="size-4" />
        <span className="mt-px">{orderStatus}</span>
      </div>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Link href={`${PATH.ORDER_HISTORY}/${id}`} className="block space-y-3 py-3 md:space-y-4 md:py-4">
          {products.slice(0, 2).map((item) => (
            <ProductItem
              key={item.productId}
              name={item.product.name}
              price={item.product.price}
              realPrice={item.product.real_price}
              quantity={item.quantity}
              thumbnail={item.product.thumbnail_url}
            />
          ))}
          <CollapsibleContent className="space-y-3 md:space-y-4">
            {products.slice(2).map((item) => (
              <ProductItem
                key={item.productId}
                name={item.product.name}
                price={item.price}
                realPrice={item.product.real_price}
                quantity={item.quantity}
                thumbnail={item.product.thumbnail_url}
              />
            ))}
          </CollapsibleContent>
        </Link>
        <div className="flex flex-col gap-2 border-t border-dashed pt-3 md:gap-3">
          <div className="flex flex-col gap-2 xs:items-start md:flex-row md:items-center">
            {products.length > 2 ? (
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent text-xs hover:bg-transparent">
                  {isExpanded ? 'Ẩn bớt' : 'Xem thêm'} {products.length - 2} sản phẩm
                </Button>
              </CollapsibleTrigger>
            ) : null}

            <div className="ml-auto flex items-center gap-3 text-sm md:text-base">
              <span className="text-secondary-2">Tổng tiền:</span>
              <span>
                {formatCurrency(total)}
                <sup>₫</sup>
              </span>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="self-end border border-highlight text-highlight md:h-9 md:text-base"
          >
            <Link href={`${PATH.ORDER_HISTORY}/${id}`}>Xem chi tiết</Link>
          </Button>
        </div>
      </Collapsible>
    </div>
  )
}

interface ProductItemProps {
  thumbnail: string
  name: string
  quantity: number
  price: number
  realPrice: number
}

function ProductItem({ name, quantity, thumbnail, price, realPrice }: ProductItemProps) {
  return (
    <div className="flex justify-between gap-2 md:gap-3">
      <div className="flex gap-2 md:gap-3">
        <div className="relative shrink-0 select-none rounded-md border">
          <Image
            className="size-16 rounded object-contain md:size-20"
            src={thumbnail}
            alt={name}
            width={96}
            height={96}
          />
          <span className="absolute bottom-0 right-0 flex h-6 min-w-6 items-center justify-center rounded-tl-lg bg-secondary-3 text-[11px] text-secondary-1">
            x{quantity}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="line-clamp-2 text-xs md:text-sm">{name}</p>
          <p className="text-xs text-secondary-2 md:text-sm">
            {formatCurrency(realPrice)}
            <sup>₫</sup>
          </p>
        </div>
      </div>
      <span className="hidden shrink-0 text-xs xs:inline md:text-sm">
        {formatCurrency(price)}
        <sup>₫</sup>
      </span>
    </div>
  )
}
