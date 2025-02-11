import { name } from '@/features/auth/schemas'
import { PAYMENT_ERROR_MESSAGES } from '@/features/payment/constants'
import { z } from 'zod'

export const addNewPaymentCardSchema = z.object({
  cardName: name,
  cardNumber: z.string().regex(/^\d{12,19}$/, PAYMENT_ERROR_MESSAGES.CARD_NUMBER_INVALID),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_INVALID)
    .refine((date) => {
      const [month, year] = date.split('/').map(Number)

      // Lấy tháng và năm hiện tại
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth() + 1 // Tháng bắt đầu từ 0
      const currentYear = currentDate.getFullYear() % 100 // Chỉ lấy 2 chữ số cuối

      // Kiểm tra xem tháng/năm có hợp lệ không
      return year > currentYear || (year === currentYear && month >= currentMonth)
    }, PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_IN_FUTURE),
  cvv: z.string().regex(/^\d{3,4}$/, PAYMENT_ERROR_MESSAGES.CVV_INVALID),
  type: z.enum(['card', 'paypall'], { message: PAYMENT_ERROR_MESSAGES.TYPE_INVALID }),
  default: z.boolean().optional(),
})

export type AddNewPaymentCardReqBody = z.infer<typeof addNewPaymentCardSchema>
