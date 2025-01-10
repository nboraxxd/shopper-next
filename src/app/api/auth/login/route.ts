import authServerApi from '@/features/auth/api/server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/features/auth/constants'
import { LoginReqBody, loginReqBodySchema } from '@/features/auth/schemas'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { TokenPayload } from '@/shared/types'
import { HttpError } from '@/shared/utils/error'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { z } from 'zod'

export async function POST(req: Request) {
  const body: LoginReqBody = await req.json()

  const cookieStore = await cookies()

  try {
    const { password, username } = await loginReqBodySchema.parseAsync(body)

    const { payload } = await authServerApi.loginFromServerToBackend({ password, username })

    const { accessToken, refreshToken } = payload.data

    const accessTokenDecoded = jwt.decode(accessToken) as TokenPayload
    const refreshTokenDecoded = jwt.decode(refreshToken) as TokenPayload

    cookieStore.set(ACCESS_TOKEN, accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: accessTokenDecoded.exp * 1000,
    })

    cookieStore.set(REFRESH_TOKEN, refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: refreshTokenDecoded.exp * 1000,
    })

    return Response.json(payload)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: 'Validation error occurred in body',
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
