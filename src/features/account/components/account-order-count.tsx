import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { LucideProps, PackageCheckIcon, PackageSearchIcon, TruckIcon, WalletIcon } from 'lucide-react'

import PATH from '@/shared/constants/path'
import { OrderCountResponse } from '@/features/order/types'
import orderServerApi from '@/features/order/api/server'

import { Svgr } from '@/shared/components/icons'
import { ORDER_STATUS, ORDER_STATUS_LABEL } from '@/features/order/constants'
import OrderCountBadge from '@/features/order/components/server/order-count-badge'

const ACCOUNT_ORDERS = [
  {
    label: ORDER_STATUS_LABEL.PENDING,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.PENDING}`,
    status: ORDER_STATUS.PENDING,
    icon: WalletIcon,
  },
  {
    label: ORDER_STATUS_LABEL.CONFIRM,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.CONFIRM}`,
    status: ORDER_STATUS.CONFIRM,
    icon: PackageSearchIcon,
  },
  {
    label: ORDER_STATUS_LABEL.SHIPPING,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.SHIPPING}`,
    status: ORDER_STATUS.SHIPPING,
    icon: TruckIcon,
  },
  {
    label: ORDER_STATUS_LABEL.FINISHED,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.FINISHED}`,
    status: ORDER_STATUS.FINISHED,
    icon: PackageCheckIcon,
  },
]

export async function AccountOrderCountContent({ accessToken }: { accessToken: string }) {
  const orderCounts: Record<(typeof ACCOUNT_ORDERS)[number]['status'], OrderCountResponse['count'] | null> = {
    pending: null,
    confirm: null,
    shipping: null,
    finished: null,
  }

  try {
    const responses = await Promise.all(
      ACCOUNT_ORDERS.map(({ status }) => orderServerApi.getOrderCountFromBackend(accessToken, status))
    )

    responses.forEach((response, index) => {
      orderCounts[ACCOUNT_ORDERS[index].status] = response.payload.count
    })
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return ACCOUNT_ORDERS.map(({ status }, index) => (
    <AccountOrderCountItem
      key={status}
      count={orderCounts[status]}
      href={ACCOUNT_ORDERS[index].href}
      icon={ACCOUNT_ORDERS[index].icon}
      label={ACCOUNT_ORDERS[index].label}
    />
  ))
}

interface AccountOrderCountItemProps {
  href: Url
  count: OrderCountResponse['count'] | null
  label: string
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

function AccountOrderCountItem({ count, href, icon, label }: AccountOrderCountItemProps) {
  return (
    <li>
      <Link href={href} className="flex flex-col items-center">
        <div className="relative">
          <Svgr icon={icon} className="size-6" />
          {count ? <OrderCountBadge count={count} className="-translate-y-1/2 translate-x-1/2" /> : null}
        </div>
        <h3 className="mt-1.5 text-xs font-medium md:text-sm">{label}</h3>
      </Link>
    </li>
  )
}

export function AccountOrderCountSkeleton() {
  return ACCOUNT_ORDERS.map(({ status }, index) => (
    <AccountOrderCountItem
      key={status}
      count={0}
      href={ACCOUNT_ORDERS[index].href}
      icon={ACCOUNT_ORDERS[index].icon}
      label={ACCOUNT_ORDERS[index].label}
    />
  ))
}
