import { z } from 'zod'

import { name, password } from '@/features/auth/schemas'
import { AUTH_ERROR_MESSAGES } from '@/features/auth/constants'
import { PROFILE_ERROR_MESSAGES } from '@/features/profile/constants'

export const updateProfileSchema = z.object({
  name,
  avatar: z.string().url().nullable(),
  fb: z
    .string()
    .regex(
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
      PROFILE_ERROR_MESSAGES.INVALID_FB_LINK
    )
    .nullable(),
  birthday: z.string().datetime({ message: PROFILE_ERROR_MESSAGES.INVALID_BIRTHDAY }).nullable(),
  gender: z.enum(['male', 'female', 'other'], { message: PROFILE_ERROR_MESSAGES.INVALID_GENDER }).nullable(),
  phone: z
    .string()
    .regex(/^\d{4} \d{3} \d{3}$/, PROFILE_ERROR_MESSAGES.INVALID_PHONE_NUMBER)
    .transform((phone) => phone.replace(/\s/g, ''))
    .refine((plainPhone) => {
      return /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/.test(plainPhone)
    }, PROFILE_ERROR_MESSAGES.INVALID_PHONE_NUMBER)
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
        code: z.ZodIssueCode.custom,
        message: AUTH_ERROR_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirmNewPassword'],
      })
    }
  })

export type ChangePasswordReqBody = z.infer<typeof changePasswordSchema>
