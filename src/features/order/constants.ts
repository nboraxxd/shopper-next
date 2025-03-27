import PATH from '@/shared/constants/path'

export const ORDER_STATUS = {
  ALL: 'all',
  PENDING: 'pending',
  CONFIRM: 'confirm',
  SHIPPING: 'shipping',
  FINISHED: 'finished',
  CANCEL: 'cancel',
} as const

export const ORDER_STATUS_LABEL = {
  ALL: 'Tất cả',
  PENDING: 'Chờ xác nhận',
  CONFIRM: 'Đang xử lý',
  SHIPPING: 'Đang giao',
  FINISHED: 'Đã giao',
  CANCEL: 'Đã hủy',
} as const

export const ORDER_STATUS_TABS = [
  { label: ORDER_STATUS_LABEL.ALL, href: PATH.ORDER_HISTORY, status: ORDER_STATUS.ALL },
  {
    label: ORDER_STATUS_LABEL.PENDING,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.PENDING}`,
    status: ORDER_STATUS.PENDING,
  },
  {
    label: ORDER_STATUS_LABEL.CONFIRM,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.CONFIRM}`,
    status: ORDER_STATUS.CONFIRM,
  },
  {
    label: ORDER_STATUS_LABEL.SHIPPING,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.SHIPPING}`,
    status: ORDER_STATUS.SHIPPING,
  },
  {
    label: ORDER_STATUS_LABEL.FINISHED,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.FINISHED}`,
    status: ORDER_STATUS.FINISHED,
  },
  {
    label: ORDER_STATUS_LABEL.CANCEL,
    href: `${PATH.ORDER_HISTORY}?status=${ORDER_STATUS.CANCEL}`,
    status: ORDER_STATUS.CANCEL,
  },
] as const
