import orderServerApi from '@/features/order/api/server'
import { ORDER_STATUS } from '@/features/order/constants'
import { OrderDetailResponse, OrderStatus } from '@/features/order/types'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'
import { CircleXIcon, PackageCheckIcon, PackageSearchIcon, ReceiptTextIcon, TruckIcon } from 'lucide-react'
import Image from 'next/image'

const ACTIVE_ORDER_STEP_STYLES =
  'data-[slot=circle]:*:border-highlight data-[slot=circle]:*:bg-highlight data-[slot=label]:*:text-foreground [&_[data-slot=icon]]:text-light-1 [&_[data-slot=icon]]:dark:text-secondary-1'

const COMPLETED_ORDER_STEP_STYLES =
  'data-[slot=circle]:*:border-highlight data-[slot=label]:*:text-foreground [&_[data-slot=icon]]:text-highlight'

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
    <div className="mt-1 md:mt-3">
      <p className="text-end text-sm uppercase">Mã đơn hàng: {orderDetail._id.slice(0, 12)}</p>

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
        <div className="relative mt-3 grid grid-cols-4 md:mt-5">
          {ORDER_STEPS.map((step, index) => (
            <OrderStep
              key={step.status}
              status={step.status as Exclude<OrderStatus, 'cancel'>}
              date={orderDetail[step.dateKey]}
              className={cn(
                stepNumber === index && ACTIVE_ORDER_STEP_STYLES,
                stepNumber > index && COMPLETED_ORDER_STEP_STYLES
              )}
            />
          ))}
          <div className="absolute top-[1.375rem] ml-[calc(100%/8)] h-1 w-[calc(100%-(100%/4))] bg-secondary-2" />
          <div
            className={cn(
              'absolute top-[1.375rem] ml-[calc(100%/8)] h-1 w-[calc(100%/4*var(--step-number))] bg-highlight'
            )}
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
}

function OrderStep({ status, date, className }: OrderStepProps) {
  const { icon: Icon, label } = ORDER_STEP_STATUS[status]

  return (
    <div className={cn('z-10 flex flex-col items-center gap-1', className)}>
      <div
        className="flex size-12 items-center justify-center rounded-full border-[3px] border-secondary-2 bg-account-section"
        data-slot="circle"
      >
        <Icon className="text-secondary-2" data-slot="icon" />
      </div>
      <p className="mt-1 text-sm text-secondary-2" data-slot="label">
        {label}
      </p>
      {date ? <p className="text-xs text-secondary-2">{format(new Date(date), 'HH:mm dd/MM/yyyy')}</p> : null}
    </div>
  )
}
