import PATH from '@/shared/constants/path'
import { CircleXIcon, PackageCheckIcon, PackageSearchIcon, TruckIcon, WalletIcon } from 'lucide-react'

export const ORDER_STATUS = {
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
  { label: ORDER_STATUS_LABEL.ALL, href: PATH.ORDER_HISTORY, status: 'all' },
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

export const ORDER_KEY = {
  ORDERS: 'orders',
} as const

export const ORDER_ITEM_STATUS = {
  [ORDER_STATUS.PENDING]: {
    label: ORDER_STATUS_LABEL.PENDING,
    icon: WalletIcon,
  },
  [ORDER_STATUS.CONFIRM]: {
    label: ORDER_STATUS_LABEL.CONFIRM,
    icon: PackageSearchIcon,
  },
  [ORDER_STATUS.SHIPPING]: {
    label: ORDER_STATUS_LABEL.SHIPPING,
    icon: TruckIcon,
  },
  [ORDER_STATUS.FINISHED]: {
    label: ORDER_STATUS_LABEL.FINISHED,
    icon: PackageCheckIcon,
  },
  [ORDER_STATUS.CANCEL]: {
    label: ORDER_STATUS_LABEL.CANCEL,
    icon: CircleXIcon,
  },
} as const
