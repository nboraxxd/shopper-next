import { z } from 'zod'
import { AUTH_MESSAGES } from '@/features/auth/constants'

export const name = z.string().trim().nonempty(AUTH_MESSAGES.NAME_IS_REQUIRED)

export const username = z.string().trim().email(AUTH_MESSAGES.EMAIL_INVALID)

export const password = z
  .string({ required_error: AUTH_MESSAGES.PASSWORD_IS_REQUIRED })
  .regex(/^.{6,32}$/, AUTH_MESSAGES.PASSWORD_INVALID)

export const code = z
  .string({ required_error: AUTH_MESSAGES.CODE_IS_REQUIRED })
  .nonempty(AUTH_MESSAGES.CODE_IS_REQUIRED)

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

export const loginByCodeSchema = z.object({ code }).strict()

export type LoginByCodeReqBody = z.infer<typeof loginByCodeSchema>

export const resendVerificationEmailSchema = z.object({ username }).strict()

export type ResendVerificationEmailReqBody = z.infer<typeof resendVerificationEmailSchema>

export const forgotPasswordSchema = z.object({ username }).strict()

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

export type ForgotPasswordReqBody = ForgotPasswordType & { redirect: string }

export const resetPasswordSchema = z
  .object({ password, confirmPassword: password, code })
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

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>

export const resetPasswordBodySchema = z.object({ password, code })

export type ResetPasswordReqBody = z.infer<typeof resetPasswordBodySchema>
