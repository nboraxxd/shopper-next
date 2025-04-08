'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/shared/utils'
import { OrderStatus } from '@/features/order/types'
import { ORDER_STATUS_TABS } from '@/features/order/constants'
import OrderCountBadge from '@/features/order/components/server/order-count-badge'

interface Props {
  orderCounts?: Record<Exclude<OrderStatus, 'finished' | 'cancel'>, number | null>
}

export default function OrderTabs({ orderCounts }: Props) {
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') || 'all'

  return (
    <ul className="flex gap-3 overflow-x-auto py-2">
      {ORDER_STATUS_TABS.map(({ href, label, status }) => (
        <li key={status} className="shrink-0 grow">
          <Link
            className={cn(
              'relative inline-block h-10 w-full p-2 text-center text-sm font-medium transition-colors duration-300',
              {
                'text-highlight': currentStatus === status,
              }
            )}
            href={href}
          >
            {label}
            {currentStatus === status ? (
              <motion.span
                layoutId="order-history-indicator"
                className="absolute inset-x-0 bottom-0.5 h-0.5 bg-highlight"
                transition={{ duration: 0.3 }}
              />
            ) : null}

            {orderCounts && status in orderCounts && orderCounts[status as keyof typeof orderCounts] ? (
              <OrderCountBadge
                count={orderCounts[status as keyof typeof orderCounts]!}
                className="-right-1 -top-1 size-5 bg-primary-blue/75 text-[0.625rem]"
              />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}
