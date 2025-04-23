import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import lowerFirst from 'lodash/lowerFirst'
import { CircleXIcon, PackageCheckIcon, PackageSearchIcon, ReceiptTextIcon, TruckIcon } from 'lucide-react'

import orderServerApi from '@/features/order/api/server'
import { cn, formatCurrency, formatPhoneNumber } from '@/shared/utils'
import { OrderDetailResponse, OrderStatus } from '@/features/order/types'
import { ORDER_ITEM_STATUS, ORDER_STATUS } from '@/features/order/constants'

import { LocationIcon } from '@/shared/components/icons'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Separator } from '@/shared/components/ui/separator'
import { ProductItem, ProductItemSkeleton } from '@/features/order/components/server'
import { OrderSummary, SectionTitle, OrderSummarySkeleton } from '@/shared/components'

const ACTIVE_ORDER_STEP_STYLES =
  'data-[slot=circle]:*:border-highlight data-[slot=circle]:*:bg-highlight [&_[data-slot=label]]:text-foreground [&_[data-slot=icon]]:text-order-step-icon-active'

const COMPLETED_ORDER_STEP_STYLES =
  'data-[slot=circle]:*:border-highlight [&_[data-slot=label]]:text-foreground [&_[data-slot=icon]]:text-order-step-icon-completed'

export const ORDER_STEP_STATUS = {
  [ORDER_STATUS.PENDING]: {
    label: 'Tiếp nhận',
    icon: ReceiptTextIcon,
  },
  [ORDER_STATUS.CONFIRM]: {
    label: 'Chuẩn bị hàng',
    icon: PackageSearchIcon,
  },
  [ORDER_STATUS.SHIPPING]: {
    label: 'Giao hàng',
    icon: TruckIcon,
  },
  [ORDER_STATUS.FINISHED]: {
    label: 'Hoàn tất',
    icon: PackageCheckIcon,
  },
  [ORDER_STATUS.CANCEL]: {
    label: 'Đã hủy',
    icon: CircleXIcon,
  },
} as const

const ORDER_STEPS = [
  { status: ORDER_STATUS.PENDING, dateKey: 'createdAt' },
  { status: ORDER_STATUS.CONFIRM, dateKey: 'confirmDate' },
  { status: ORDER_STATUS.SHIPPING, dateKey: 'shippingDate' },
  { status: ORDER_STATUS.FINISHED, dateKey: 'finishedDate' },
] as const

const ORDER_DATE_KEYS = {
  [ORDER_STATUS.PENDING]: 'createdAt',
  [ORDER_STATUS.CONFIRM]: 'confirmDate',
  [ORDER_STATUS.SHIPPING]: 'shippingDate',
  [ORDER_STATUS.FINISHED]: 'finishedDate',
} as const

export async function OrderDetailContent({ id, accessToken }: { id: string; accessToken: string }) {
  let orderDetail: OrderDetailResponse['data'] | undefined = undefined

  try {
    const orderDetailResponse = await orderServerApi.getOrderDetailFromBackend({ accessToken, id })

    orderDetail = orderDetailResponse.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  if (!orderDetail) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-2">
        <Image width={200} height={200} src="/images/order/empty-order.png" alt="Empty order" className="size-48" />
        <p>Không tìm thấy đơn hàng này.</p>
      </div>
    )
  }

  const stepNumber = Object.keys(ORDER_STEP_STATUS).findIndex((key) => key === orderDetail.status)

  return (
    <div className="mt-3 md:mt-5">
      <OrderInfoWrapper className="rounded-lg border bg-order-info">
        <OrderInfoItem title="Mã đơn hàng">
          <span className="text-sm uppercase">{orderDetail._id.slice(0, 12)}</span>
        </OrderInfoItem>
        <OrderInfoItem title="Trạng thái">
          <span className="text-sm xs:hidden">{ORDER_STEP_STATUS[orderDetail.status]['label']}</span>
          <span className="hidden text-sm xs:inline">{ORDER_ITEM_STATUS[orderDetail.status]['label']}</span>
        </OrderInfoItem>
        {orderDetail.status !== 'cancel' ? (
          <OrderInfoItem title="Cập nhật lúc" className="xs:hidden">
            <span className="text-sm">
              {format(new Date(orderDetail[ORDER_DATE_KEYS[orderDetail.status]] ?? 0), 'HH:mm dd/MM/yyyy')}
            </span>
          </OrderInfoItem>
        ) : null}
        <OrderInfoItem title="Tổng tiền">
          <span className="text-sm font-semibold text-highlight">
            {formatCurrency(orderDetail.total)}
            <sup>₫</sup>
          </span>
        </OrderInfoItem>
      </OrderInfoWrapper>

      {orderDetail.status === 'cancel' ? (
        <div className="relative mt-3 grid grid-cols-2 md:mt-5">
          <OrderStep
            status="pending"
            date={orderDetail.createdAt}
            className={cn(stepNumber === 0 && ACTIVE_ORDER_STEP_STYLES, stepNumber > 0 && COMPLETED_ORDER_STEP_STYLES)}
          />
          <OrderStep status="cancel" className={cn(stepNumber === 4 && ACTIVE_ORDER_STEP_STYLES)} />
          <div className="absolute left-1/2 top-[1.125rem] h-1 w-1/2 -translate-x-1/2 bg-highlight md:top-[1.375rem]" />
        </div>
      ) : (
        <div className="relative mt-3 grid grid-cols-4 md:mt-5">
          {ORDER_STEPS.map((step, index) => (
            <OrderStep
              key={step.status}
              status={step.status as Exclude<OrderStatus, 'cancel'>}
              date={orderDetail[step.dateKey]}
              className={cn(
                stepNumber === index && ACTIVE_ORDER_STEP_STYLES,
                stepNumber > index && COMPLETED_ORDER_STEP_STYLES,
                'data-[slot=description]:*:hidden data-[slot=description]:*:xs:flex'
              )}
            />
          ))}
          <div className="absolute top-[1.125rem] ml-[calc(100%/8)] h-1 w-[calc(100%-(100%/4))] bg-secondary-2 md:top-[1.375rem]" />
          <div
            className="absolute top-[1.125rem] ml-[calc(100%/8)] h-1 w-[calc(100%/4*var(--step-number))] bg-highlight md:top-[1.375rem]"
            style={{ '--step-number': stepNumber } as React.CSSProperties}
          />
        </div>
      )}
      <div className="mt-5">
        <SectionTitle icon={LocationIcon} title="Địa chỉ nhận hàng" className="mb-2" />
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            <span className="font-medium text-muted-foreground">Người nhận: </span> {orderDetail.shipping.fullName}
          </p>
          <p className="text-sm">
            <span className="font-medium text-muted-foreground">Địa chỉ: </span>
            {orderDetail.shipping.address.trim()}, {lowerFirst(orderDetail.shipping.district.trim())},{' '}
            {lowerFirst(orderDetail.shipping.province.trim())}
          </p>
          <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-6 xl:gap-8">
            <p className="line-clamp-1 shrink-0 break-all text-sm">
              <span className="font-medium text-muted-foreground">Điện thoại: </span>{' '}
              {formatPhoneNumber(orderDetail.shipping.phone)}
            </p>
            <p className="line-clamp-1 break-all text-sm">
              <span className="font-medium text-muted-foreground">Email: </span>
              {orderDetail.shipping.email}
            </p>
          </div>
          {orderDetail.note ? (
            <p className="text-sm">
              <span className="font-medium text-muted-foreground">Lời nhắn: </span>
              {orderDetail.note}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle icon={LocationIcon} title="Chi tiết đơn hàng" className="mb-2" />
        <div className="space-y-3">
          {orderDetail.listItems.map((item) => (
            <ProductItem
              key={item.productId}
              name={item.product.name}
              thumbnail={item.product.thumbnail_url}
              quantity={item.quantity}
              realPrice={item.product.real_price}
              total={item.price}
              as={Link}
              href={`/${item.product.slug}`}
            />
          ))}
        </div>
      </div>

      <Separator className="my-3 md:my-5" />

      <OrderSummary
        subTotal={orderDetail.subTotal}
        discount={orderDetail.promotion?.discount ?? 0}
        tax={orderDetail.tax}
        shippingPrice={orderDetail.shipping.shippingPrice}
        total={orderDetail.total}
      />
    </div>
  )
}

function OrderInfoWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-4 md:px-16', className)}>
      <div className="flex flex-col justify-between gap-1.5 xs:flex-row">{children}</div>
    </div>
  )
}

function OrderInfoItem(props: { title: string; children: React.ReactNode; className?: string }) {
  const { title, children, className } = props

  return (
    <p className={cn('flex-col items-center gap-2 text-xs xs:flex', className)}>
      <span className="font-semibold uppercase text-muted-foreground">
        {title}
        <span className="xs:hidden">: </span>
      </span>
      {children}
    </p>
  )
}

interface OrderStepProps {
  status: OrderStatus
  date?: number
  className?: string
  style?: React.CSSProperties
}

function OrderStep({ status, date, className, style }: OrderStepProps) {
  const { icon: Icon, label } = ORDER_STEP_STATUS[status]

  return (
    <div className={cn('z-10 flex flex-col items-center gap-2', className)} style={style}>
      <div
        className="flex size-10 items-center justify-center rounded-full border-[3px] border-secondary-2 bg-account-section md:size-12"
        data-slot="circle"
      >
        <Icon className="size-5 text-order-step-icon md:size-6" data-slot="icon" />
      </div>
      <div className="flex flex-col items-center" data-slot="description">
        <p className="text-xs text-secondary-2 md:text-sm" data-slot="label">
          {label}
        </p>
        {date ? (
          <p className="mt-0.5 text-[0.625rem] text-secondary-2 md:text-xs">
            {format(new Date(date), 'HH:mm dd/MM/yyyy')}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function OrderDetailSkeleton() {
  return (
    <div className="mt-3 md:mt-5">
      <OrderInfoWrapper className="p-0 md:p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex grow items-center gap-2 xs:flex-col xs:last:hidden">
            <Skeleton className="hidden h-4 w-1/2 xs:block" />
            <Skeleton className="h-5 w-2/3 xs:w-1/2" />
          </div>
        ))}
      </OrderInfoWrapper>

      <div className="relative mt-3 grid grid-cols-4 md:mt-5">
        {ORDER_STEPS.map((step) => (
          <OrderStep key={step.status} status={step.status as Exclude<OrderStatus, 'cancel'>} />
        ))}
        <div className="absolute top-[1.125rem] ml-[calc(100%/8)] h-1 w-[calc(100%-(100%/4))] bg-secondary-2 md:top-[1.375rem]" />
      </div>

      <div className="mt-5">
        <SectionTitle icon={LocationIcon} title="Địa chỉ nhận hàng" className="mb-2" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle icon={LocationIcon} title="Chi tiết đơn hàng" className="mb-2" />
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <ProductItemSkeleton key={index} />
          ))}
        </div>
      </div>

      <Separator className="my-3 md:my-5" />

      <OrderSummarySkeleton />
    </div>
  )
}
