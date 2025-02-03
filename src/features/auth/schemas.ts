import { z } from 'zod'
import { AUTH_ERROR_MESSAGES } from '@/features/auth/constants'

export const name = z.string().trim().min(1, AUTH_ERROR_MESSAGES.NAME_IS_REQUIRED)

export const username = z.string().trim().email(AUTH_ERROR_MESSAGES.EMAIL_INVALID)

export const password = z.string().regex(/^.{6,32}$/, AUTH_ERROR_MESSAGES.PASSWORD_INVALID)

export const loginSchema = z.object({ username, password }).strict()

export type LoginReqBody = z.infer<typeof loginSchema>
