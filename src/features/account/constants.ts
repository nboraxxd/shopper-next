import { ClipboardListIcon, CreditCardIcon, LayoutDashboardIcon } from 'lucide-react'

import { HeartIcon, InfoSquareIcon, LocationIcon, ProfileIcon } from '@/shared/components/icons'
import PATH from '@/shared/constants/path'

export const ACCOUNT_MENU = [
  {
    title: 'Quản lý tài khoản',
    items: [
      {
        icon: LayoutDashboardIcon,
        title: 'Tổng quan',
        href: PATH.ACCOUNT,
      },
      {
        icon: ProfileIcon,
        title: 'Hồ sơ',
        href: PATH.PROFILE,
      },
      {
        icon: LocationIcon,
        title: 'Địa chỉ',
        href: PATH.ADDRESS,
      },
      {
        icon: CreditCardIcon,
        title: 'Ngân hàng',
        href: PATH.PAYMENT,
      },
    ],
  },
  {
    title: 'Quản lý giao dịch',
    items: [
      {
        icon: HeartIcon,
        title: 'Yêu thích',
        href: PATH.WISHLIST,
      },
      {
        icon: ClipboardListIcon,
        title: 'Đơn mua',
        href: PATH.ORDER_HISTORY,
      },
    ],
  },
  {
    title: 'Các dịch vụ khác',
    items: [
      {
        icon: InfoSquareIcon,
        title: 'Hỗ trợ',
        href: PATH.SUPPORT,
      },
    ],
  },
] as const

export const CUSTOM_ACCOUNT_INPUT_CLASSNAME =
  'h-11 text-ellipsis rounded-xl font-medium transition-none focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0'
