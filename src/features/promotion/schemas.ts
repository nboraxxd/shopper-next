import { z } from 'zod'

export const getPromotionSchema = z.object({
  promotion: z.string().nonempty('Vui lòng nhập mã khuyến mãi').max(16, 'Mã khuyến mãi không hợp lệ'),
})

export type GetPromotionReq = z.infer<typeof getPromotionSchema>
