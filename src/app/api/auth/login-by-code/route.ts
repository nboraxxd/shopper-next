import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { TokenPayload } from '@/shared/types'
import { HttpError } from '@/shared/utils/error'
import authServerApi from '@/features/auth/api/server'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/features/auth/constants'
import { LoginByCodeReqBody, loginByCodeSchema } from '@/features/auth/schemas'

export async function POST(req: Request) {
  const body: LoginByCodeReqBody = await req.json()

  const cookieStore = await cookies()

  try {
    const { code } = await loginByCodeSchema.parseAsync(body)

    const { payload } = await authServerApi.loginByCodeToBackend(code)

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
          message: error.errors[0].message,
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
