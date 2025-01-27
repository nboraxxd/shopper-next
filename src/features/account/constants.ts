import { ClipboardListIcon, CreditCardIcon } from 'lucide-react'

import { HeartIcon, InfoSqureIcon, LocationIcon, ProfileIcon } from '@/shared/components/icons'
import PATH from '@/shared/constants/path'

export const ACCOUNT_MENU = [
  {
    title: 'Quản lý tài khoản',
    items: [
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
        icon: InfoSqureIcon,
        title: 'Hỗ trợ',
        href: PATH.SUPPORT,
      },
    ],
  },
] as const
