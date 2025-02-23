import { cookies } from 'next/headers'
import { addDays, formatISO, lastDayOfMonth, startOfMonth, subDays } from 'date-fns'

import { ACCESS_TOKEN } from '@/features/auth/constants'
import { PromotionServerItem } from '@/features/promotion/types'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'

const MOCK_PROMOTIONS: PromotionServerItem[] = [
  {
    _id: crypto.randomUUID(),
    code: 'SALE25',
    title: 'Giảm 25%',
    type: 'discount',
    conditions: [
      'Giảm 25% giá trị đơn hàng trước thuế.',
      'Áp dụng cho tất cả sản phẩm.',
      'Không áp dụng đồng thời với các chương trình khuyến mãi khác.',
    ],
    status: 'active',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
  {
    _id: crypto.randomUUID(),
    code: 'SALE50',
    title: 'Giảm 50%',
    type: 'discount',
    conditions: [
      'Giảm 50% giá trị đơn hàng trước thuế.',
      'Áp dụng cho tất cả sản phẩm.',
      'Không áp dụng đồng thời với các chương trình khuyến mãi khác.',
    ],
    status: 'active',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
  {
    _id: crypto.randomUUID(),
    code: 'FREESHIP',
    title: 'Miễn phí vận chuyển',
    type: 'shipping',
    conditions: [
      'Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên.',
      'Áp dụng trên toàn quốc.',
      'Không áp dụng cho các sản phẩm điện tử.',
    ],
    status: 'expired',
    iat: formatISO(subDays(new Date(), 10)),
    exp: formatISO(subDays(new Date(), 2)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'BUY1GET1',
    title: 'Mua 1 Tặng 1',
    type: 'discount',
    conditions: [
      'Mua 1 sản phẩm, tặng 1 sản phẩm cùng loại.',
      'Áp dụng cho các mặt hàng mỹ phẩm.',
      'Không áp dụng khi sử dụng các mã giảm giá khác.',
    ],
    status: 'upcoming',
    iat: formatISO(addDays(new Date(), 1)),
    exp: formatISO(addDays(new Date(), 7)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'SALE10',
    title: 'Giảm 10%',
    type: 'discount',
    conditions: [
      'Giảm 10% cho tất cả đơn hàng trên 1.000.000đ.',
      'Áp dụng cho toàn bộ sản phẩm trong cửa hàng.',
      'Không áp dụng cùng lúc với chương trình tích điểm.',
    ],
    status: 'inactive',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
  {
    _id: crypto.randomUUID(),
    code: 'FREESHIPPLUS',
    title: 'Miễn phí vận chuyển toàn quốc',
    type: 'shipping',
    conditions: [
      'Miễn phí vận chuyển cho tất cả đơn hàng không giới hạn giá trị.',
      'Chỉ áp dụng cho khách hàng VIP.',
      'Không áp dụng đồng thời với các mã giảm giá khác.',
    ],
    status: 'expired',
    iat: formatISO(subDays(new Date(), 10)),
    exp: formatISO(subDays(new Date(), 2)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'FREESHIP50',
    title: 'Miễn phí vận chuyển đơn từ 50K',
    type: 'shipping',
    conditions: [
      'Miễn phí vận chuyển cho đơn hàng từ 50K.',
      'Áp dụng cho tất cả sản phẩm.',
      'Không áp dụng với các chương trình khuyến mãi khác.',
    ],
    status: 'inactive',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
  {
    _id: crypto.randomUUID(),
    code: 'SHIP30K',
    title: 'Giảm 30K phí vận chuyển',
    type: 'shipping',
    conditions: [
      'Giảm 30K phí vận chuyển cho đơn từ 200K.',
      'Áp dụng cho các shop tham gia chương trình.',
      'Không áp dụng cho đơn hàng điện tử.',
    ],
    status: 'upcoming',
    iat: formatISO(addDays(new Date(), 1)),
    exp: formatISO(addDays(new Date(), 10)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'FASTSHIP',
    title: 'Miễn phí vận chuyển nhanh',
    type: 'shipping',
    conditions: [
      'Miễn phí vận chuyển nhanh cho đơn từ 300K.',
      "Chỉ áp dụng cho các sản phẩm có logo 'Vận chuyển nhanh'.",
      'Không áp dụng đồng thời với mã giảm giá khác.',
    ],
    status: 'expired',
    iat: formatISO(subDays(new Date(), 10)),
    exp: formatISO(subDays(new Date(), 2)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'HALFSHIP',
    title: 'Giảm 50% phí ship',
    type: 'shipping',
    conditions: [
      'Giảm 50% phí vận chuyển tối đa 25K.',
      'Áp dụng cho tất cả sản phẩm.',
      'Chỉ áp dụng cho đơn hàng nội thành.',
    ],
    status: 'inactive',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
  {
    _id: crypto.randomUUID(),
    code: 'VIPSHIP',
    title: 'Miễn phí vận chuyển cho thành viên VIP',
    type: 'shipping',
    conditions: [
      'Chỉ áp dụng cho thành viên VIP.',
      'Không yêu cầu giá trị đơn hàng tối thiểu.',
      'Áp dụng toàn quốc, trừ khu vực hải đảo.',
    ],
    status: 'upcoming',
    iat: formatISO(addDays(new Date(), 5)),
    exp: formatISO(addDays(new Date(), 15)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'SALE10',
    title: 'Giảm 10% tổng đơn hàng',
    type: 'discount',
    conditions: [
      'Giảm 10% tổng giá trị đơn hàng, tối đa 50K.',
      'Áp dụng cho tất cả sản phẩm.',
      'Không áp dụng đồng thời với các mã khác.',
    ],
    status: 'inactive',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
  {
    _id: crypto.randomUUID(),
    code: 'SALE100K',
    title: 'Giảm ngay 100K cho đơn từ 500K',
    type: 'discount',
    conditions: [
      'Giảm 100K cho đơn hàng từ 500K.',
      'Chỉ áp dụng cho sản phẩm thời trang.',
      'Không áp dụng cho sản phẩm giảm giá sẵn.',
    ],
    status: 'expired',
    iat: formatISO(subDays(new Date(), 20)),
    exp: formatISO(subDays(new Date(), 5)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'BLACKFRIDAY',
    title: 'Giảm 30% nhân Black Friday',
    type: 'discount',
    conditions: [
      'Giảm 30% tổng giá trị đơn hàng.',
      'Chỉ áp dụng vào ngày Black Friday (Thứ Sáu cuối tháng 11).',
      'Không áp dụng đồng thời với các mã giảm giá khác.',
    ],
    status: 'upcoming',
    iat: formatISO(addDays(new Date(), 10)),
    exp: formatISO(addDays(new Date(), 15)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'BOGO',
    title: 'Mua 1 tặng 1',
    type: 'discount',
    conditions: [
      'Mua 1 sản phẩm được tặng 1 sản phẩm cùng loại.',
      "Chỉ áp dụng cho sản phẩm có nhãn 'BOGO'.",
      'Không áp dụng với các chương trình giảm giá khác.',
    ],
    status: 'expired',
    iat: formatISO(subDays(new Date(), 30)),
    exp: formatISO(subDays(new Date(), 5)),
  },
  {
    _id: crypto.randomUUID(),
    code: 'WELCOME20',
    title: 'Giảm 20% cho khách hàng mới',
    type: 'discount',
    conditions: [
      'Giảm 20% cho đơn hàng đầu tiên, tối đa 50K.',
      'Chỉ áp dụng cho tài khoản đăng ký mới.',
      'Không áp dụng đồng thời với mã giảm giá khác.',
    ],
    status: 'inactive',
    iat: formatISO(startOfMonth(new Date())),
    exp: formatISO(lastDayOfMonth(new Date())),
  },
]

export async function GET(_req: Request) {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get(ACCESS_TOKEN)

  if (!accessToken) {
    return Response.json(
      {
        error: 1,
        error_code: 'TOKEN_EXPIRED',
        message: 'Token was expired',
      },
      { status: HTTP_STATUS_CODE.FORBIDDEN }
    )
  }

  return Response.json({ data: MOCK_PROMOTIONS })
}
