import { z } from 'zod'
import { AUTH_MESSAGES } from '@/features/auth/constants'

export const name = z.string().trim().nonempty(AUTH_MESSAGES.NAME_IS_REQUIRED)

export const username = z.string().trim().email(AUTH_MESSAGES.EMAIL_INVALID)

export const password = z.string().regex(/^.{6,32}$/, AUTH_MESSAGES.PASSWORD_INVALID)

export const loginSchema = z.object({ username, password }).strict()

export type LoginReqBody = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({ name, username, password, confirmPassword: password })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirmPassword'],
      })
    }
  })

export type RegisterType = z.infer<typeof registerSchema>

export type RegisterReqBody = Omit<RegisterType, 'confirmPassword'> & { redirect: string }
