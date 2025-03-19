import { ShippingMethodResponse } from '@/features/shipping/types'

export const SHIPPING_METHODS = {
  FREE: 'mien-phi',
  STANDARD: 'tieu-chuan',
  FAST: 'giao-hang-nhanh',
} as const

export const SHIPPING_KEY = {
  SHIPPING_METHODS: 'shippingMethods',
} as const

export const SHIPPING_METHODS_DATA: { status: number; payload: ShippingMethodResponse } = {
  status: 200,
  payload: {
    data: [
      {
        price: 35000,
        title: 'Giao hàng nhanh',
        description: 'Hàng sẽ được giao trong 1-2 ngày',
        code: 'giao-hang-nhanh',
      },
      {
        price: 14000,
        title: 'Giao hàng tiêu chuẩn',
        description: 'Hàng sẽ được giao trong 3-5 ngày',
        code: 'tieu-chuan',
      },
      {
        price: 0,
        title: 'Giao hàng miễn phí',
        description: 'Hàng sẽ được giao trong khoảng 5-7 ngày, có thể lâu hơn tùy thuộc vào vị trí kho hàng',
        code: 'mien-phi',
      },
    ],
  },
}
