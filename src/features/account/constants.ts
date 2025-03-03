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
        positionInMobile: 1,
      },
      {
        icon: ProfileIcon,
        title: 'Hồ sơ',
        href: PATH.PROFILE,
        positionInMobile: 2,
      },
      {
        icon: LocationIcon,
        title: 'Địa chỉ',
        href: PATH.ADDRESS,
        positionInMobile: 5,
      },
      {
        icon: CreditCardIcon,
        title: 'Ngân hàng',
        href: PATH.PAYMENT,
        positionInMobile: 6,
      },
    ],
  },
  {
    title: 'Quản lý giao dịch',
    items: [
      {
        icon: ClipboardListIcon,
        title: 'Đơn mua',
        href: PATH.ORDER_HISTORY,
        positionInMobile: 3,
      },
      {
        icon: HeartIcon,
        title: 'Yêu thích',
        href: PATH.WISHLIST,
        positionInMobile: 4,
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
        positionInMobile: 7,
      },
    ],
  },
] as const

export const ACCOUNT_MENU_IN_MOBILE = ACCOUNT_MENU.map((menu) => menu.items).flat()

export const CUSTOM_ACCOUNT_INPUT_CLASSNAME =
  'h-11 text-ellipsis rounded-xl font-medium transition-none focus-visible:border-transparent focus-visible:shadow-focus-within focus-visible:ring-0'
