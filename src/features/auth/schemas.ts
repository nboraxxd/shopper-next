import { z } from 'zod'
import { AUTH_MESSAGES } from '@/features/auth/constants'

// const name = z.string().min(1, AUTH_MESSAGES.NAME_IS_REQUIRED)

export const username = z.string().email(AUTH_MESSAGES.EMAIL_INVALID)

export const password = z.string().regex(/^.{6,32}$/, AUTH_MESSAGES.PASSWORD_INVALID)

export const loginReqBodySchema = z.object({ username, password }).strict()

export type LoginReqBody = z.infer<typeof loginReqBodySchema>
