'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/utils'
import { ORDER_STATUS_TABS } from '@/features/order/constants'
import { OrderStatus } from '@/features/order/types'
import OrderCountBadge from '@/features/order/components/server/order-count-badge'

interface Props {
  orderCounts?: Record<Exclude<OrderStatus, 'all' | 'finished' | 'cancel'>, number | null>
}

export default function OrderHistoryTabs({ orderCounts }: Props) {
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') || 'all'

  return (
    <ul className="flex gap-3 overflow-x-auto py-2">
      {ORDER_STATUS_TABS.map(({ href, label, status }) => (
        <li key={status} className="shrink-0 grow">
          <Link
            className={cn('relative inline-block h-10 w-full p-2 text-center text-sm font-medium', {
              "text-highlight before:absolute before:bottom-0.5 before:bg-highlight before:h-0.5 before:inset-x-0 before:transition-colors before:content-['']":
                currentStatus === status,
            })}
            href={href}
          >
            {label}
            {orderCounts && status in orderCounts && orderCounts[status as keyof typeof orderCounts] ? (
              // <span className="absolute right-0 top-0 size-5 rounded-full bg-primary-blue/80 text-xs font-normal text-white">
              // {orderCounts[status as keyof typeof orderCounts]}
              // </span>
              <OrderCountBadge
                count={orderCounts[status as keyof typeof orderCounts]!}
                className="-top-1 size-5 bg-primary-blue/60 text-[0.625rem]"
              />
            ) : // <span> ({orderCounts[status as keyof typeof orderCounts]!})</span>
            null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
