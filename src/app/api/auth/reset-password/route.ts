import { z } from 'zod'

import { HttpError } from '@/shared/utils/error'
import authServerApi from '@/features/auth/api/server'
import { AUTH_MESSAGES } from '@/features/auth/constants'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { resetPasswordBodySchema, ResetPasswordReqBody } from '@/features/auth/schemas'

export async function POST(req: Request) {
  const body: ResetPasswordReqBody = await req.json()

  try {
    const { code, password } = await resetPasswordBodySchema.parseAsync(body)

    await authServerApi.resetPasswordToBackend({ code, password })

    return Response.json({ message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: 'Xảy ra lỗi xác thực ở body',
          detail: error.errors.reduce<Record<string, string>>((acc, item) => {
            acc[item.path[0]] = item.message
            return acc
          }, {}),
          statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
        },
        { status: HTTP_STATUS_CODE.BAD_REQUEST }
      )
    } else if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Internal Server Error' }, { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR })
    }
  }
}
