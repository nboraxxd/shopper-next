import { z } from 'zod'

import { name, password } from '@/features/auth/schemas'
import { AUTH_MESSAGES } from '@/features/auth/constants'

export const updateProfileSchema = z.object({
  name,
  avatar: z.string().url().nullable(),
  fb: z
    .string()
    .regex(
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
      'Link facebook không hợp lệ'
    )
    .nullable(),
  birthday: z.string().datetime().nullable(),
  gender: z.enum(['male', 'female', 'other']).nullable(),
  phone: z
    .string()
    .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng')
    .nullable(),
})

export type UpdateProfileReqBody = z.infer<typeof updateProfileSchema>

export const changePasswordSchema = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmNewPassword: password,
  })
  .strict()
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: 'custom',
        message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirmNewPassword'],
      })
    }
  })

export type ChangePasswordReqBody = z.infer<typeof changePasswordSchema>
