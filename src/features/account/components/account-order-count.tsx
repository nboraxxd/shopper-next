import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { LucideProps, PackageCheckIcon, PackageSearchIcon, TruckIcon, WalletIcon } from 'lucide-react'

import { cn } from '@/shared/utils'
import PATH from '@/shared/constants/path'
import { OrderCount } from '@/features/order/types'
import orderServerApi from '@/features/order/api/server'

import { Svgr } from '@/shared/components/icons'

const orderStatuses = ['pending', 'confirm', 'shipping', 'finished'] as const

export async function AccountOrderCountContent({ accessToken }: { accessToken: string }) {
  const orderCounts: Record<(typeof orderStatuses)[number], OrderCount['count'] | null> = {
    pending: null,
    confirm: null,
    shipping: null,
    finished: null,
  }

  try {
    const responses = await Promise.all(
      orderStatuses.map((status) => orderServerApi.getOrderCountFromBackend(accessToken, status))
    )

    responses.forEach((response, index) => {
      orderCounts[orderStatuses[index]] = response.payload.count
    })
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return orderStatuses.map((status, index) => (
    <AccountOrderCountItem
      key={status}
      count={orderCounts[status]}
      href={`${PATH.ORDER_HISTORY}?status=${status}`}
      icon={[WalletIcon, PackageSearchIcon, TruckIcon, PackageCheckIcon][index]}
      title={['Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Đã giao'][index]}
    />
  ))
}

interface AccountOrderCountItemProps {
  href: Url
  count: OrderCount['count'] | null
  title: string
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

function AccountOrderCountItem({ count, href, icon, title }: AccountOrderCountItemProps) {
  return (
    <li>
      <Link href={href} className="flex flex-col items-center">
        <div className="relative">
          <Svgr icon={icon} className="size-6" />
          {count ? (
            <span
              className={cn(
                'absolute right-0 top-0 flex size-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary-blue/95 text-xs text-light-1',
                { 'text-[0.6875rem]': count > 99 }
              )}
            >
              {count > 99 ? '99+' : count}
            </span>
          ) : null}
        </div>
        <h3 className="mt-1.5 text-xs font-medium md:text-sm">{title}</h3>
      </Link>
    </li>
  )
}

export function AccountOrderCountSkeleton() {
  return orderStatuses.map((status, index) => (
    <AccountOrderCountItem
      key={status}
      count={0}
      href={`${PATH.ORDER_HISTORY}?status=${status}`}
      icon={[WalletIcon, PackageSearchIcon, TruckIcon, PackageCheckIcon][index]}
      title={['Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Đã giao'][index]}
    />
  ))
}
