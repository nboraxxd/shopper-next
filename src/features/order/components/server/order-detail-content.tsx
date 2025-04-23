import orderServerApi from '@/features/order/api/server'
import { ORDER_ITEM_STATUS, ORDER_STATUS } from '@/features/order/constants'
import { OrderDetailResponse, OrderStatus } from '@/features/order/types'
import { cn, formatCurrency } from '@/shared/utils'
import { format } from 'date-fns'
import { CircleXIcon, PackageCheckIcon, PackageSearchIcon, ReceiptTextIcon, TruckIcon } from 'lucide-react'
import Image from 'next/image'

const ACTIVE_ORDER_STEP_STYLES =
  'data-[slot=circle]:*:border-highlight data-[slot=circle]:*:bg-highlight [&_[data-slot=label]]:*:text-foreground [&_[data-slot=icon]]:text-light-1 [&_[data-slot=icon]]:dark:text-secondary-1'

const COMPLETED_ORDER_STEP_STYLES =
  'data-[slot=circle]:*:border-highlight [&_[data-slot=label]]:*:text-foreground [&_[data-slot=icon]]:text-highlight'

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

export default async function OrderDetailContent({ id, accessToken }: { id: string; accessToken: string }) {
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
      <div className="rounded-lg border bg-secondary-5 p-3 dark:bg-dark-2 xs:p-4 md:px-16">
        <div className="flex flex-col justify-between gap-1.5 xs:flex-row">
          <p className="flex-col items-center gap-2 text-xs xs:flex">
            <span className="font-semibold uppercase text-secondary-2">
              Mã đơn hàng<span className="xs:hidden">: </span>
            </span>
            <span className="text-sm uppercase">{orderDetail._id.slice(0, 12)}</span>
          </p>
          <p className="flex-col items-center gap-2 text-xs xs:flex">
            <span className="font-semibold uppercase text-secondary-2">
              Trạng thái<span className="xs:hidden">: </span>
            </span>
            <span className="text-sm">{ORDER_ITEM_STATUS[orderDetail.status]['label']}</span>
          </p>
          <p className="flex-col items-center gap-2 text-xs xs:flex">
            <span className="font-semibold uppercase text-secondary-2">
              Tổng tiền<span className="xs:hidden">: </span>
            </span>
            <span className="text-sm text-highlight">
              {formatCurrency(orderDetail.total)}
              <sup>₫</sup>
            </span>
          </p>
        </div>
      </div>
      {orderDetail.status === 'cancel' ? (
        <div className="relative mt-3 grid grid-cols-2 md:mt-5">
          <OrderStep
            status="pending"
            date={orderDetail.createdAt}
            className={cn(stepNumber === 0 && ACTIVE_ORDER_STEP_STYLES, stepNumber > 0 && COMPLETED_ORDER_STEP_STYLES)}
          />
          <OrderStep status="cancel" className={cn(stepNumber === 4 && ACTIVE_ORDER_STEP_STYLES)} />
          <div className="absolute left-1/2 top-[1.375rem] h-1 w-1/2 -translate-x-1/2 bg-highlight" />
        </div>
      ) : (
        <div className="relative mx-auto mt-3 grid w-fit grid-rows-4 xs:mx-0 xs:w-full xs:grid-cols-4 xs:grid-rows-none md:mt-5">
          {ORDER_STEPS.map((step, index) => (
            <OrderStep
              key={step.status}
              status={step.status as Exclude<OrderStatus, 'cancel'>}
              date={orderDetail[step.dateKey]}
              className={cn(
                stepNumber === index && ACTIVE_ORDER_STEP_STYLES,
                stepNumber > index && COMPLETED_ORDER_STEP_STYLES,
                'order-[var(--step-number)] xs:order-none'
              )}
              style={{ '--step-number': ORDER_STEPS.length - index } as React.CSSProperties}
            />
          ))}
          <div className="absolute top-[1.125rem] ml-[calc(100%/8)] hidden h-1 w-[calc(100%-(100%/4))] bg-secondary-2 xs:block md:top-[1.375rem]" />
          <div
            className={cn(
              'absolute top-[1.125rem] ml-[calc(100%/8)] hidden h-1 w-[calc(100%/4*var(--step-number))] bg-highlight xs:block md:top-[1.375rem]'
            )}
            style={{ '--step-number': stepNumber } as React.CSSProperties}
          />
          <div className="absolute bottom-[calc(100%/8)] left-[14px] h-[calc(100%-(100%/4))] w-1 bg-secondary-2 xs:hidden" />
          <div
            className="absolute bottom-[calc(100%/8)] left-[14px] h-[calc(100%/4*var(--step-number))] w-1 bg-highlight xs:hidden"
            style={{ '--step-number': stepNumber } as React.CSSProperties}
          />
        </div>
      )}
    </div>
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
    <div className={cn('z-10 flex min-h-10 items-center gap-2 xs:min-h-max xs:flex-col', className)} style={style}>
      <div
        className="flex size-8 items-center justify-center rounded-full border-[3px] border-secondary-2 bg-account-section xs:size-10 md:size-12"
        data-slot="circle"
      >
        <Icon className="size-4 text-secondary-2 xs:size-5 md:size-6" data-slot="icon" />
      </div>
      <div className="flex flex-col xs:items-center">
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
