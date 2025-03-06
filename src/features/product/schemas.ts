import { z } from 'zod'

import { PRODUCT_MESSAGE } from '@/features/product/constants'

export const productListFilterSchema = z
  .object({
    filterRating: z.enum(['1', '2', '3', '4', '5', ''], { message: 'Đánh giá không hợp lệ' }).optional(),
    minPrice: z
      .string()
      .optional()
      .refine((val) => Number(val) >= 0, {
        message: PRODUCT_MESSAGE.PRICE_MUST_BE_POSITIVE_NUMBER,
      }),
    maxPrice: z
      .string()
      .optional()
      .refine((val) => Number(val) >= 0, {
        message: PRODUCT_MESSAGE.PRICE_MUST_BE_POSITIVE_NUMBER,
      }),
  })
  .strict()
  .superRefine((val, ctx) => {
    if (val.minPrice && val.maxPrice && Number(val.minPrice) > Number(val.maxPrice)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: PRODUCT_MESSAGE.PRICE_RANGE_INVALID,
        path: ['maxPrice'],
      })
    }
  })

export type ProductListFilterType = z.infer<typeof productListFilterSchema>
