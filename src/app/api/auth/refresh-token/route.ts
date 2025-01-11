import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { TokenPayload } from '@/shared/types'
import authServerApi from '@/features/auth/api/server'
import { REFRESH_TOKEN } from '@/features/auth/constants'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return Response.json({ message: 'Refresh token not found' }, { status: HTTP_STATUS_CODE.UNAUTHORIZED })
  }

  try {
    const { payload } = await authServerApi.refreshTokenToBackend(refreshToken)

    const { accessToken: newAccessToken } = payload.data

    const accessTokenDecoded = jwt.decode(newAccessToken) as TokenPayload

    cookieStore.set('accessToken', newAccessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: accessTokenDecoded.exp * 1000,
    })

    return Response.json({ data: { accessToken: payload.data.accessToken } })
  } catch (error: any) {
    return Response.json({ message: error.message || 'Unauthorized' }, { status: HTTP_STATUS_CODE.UNAUTHORIZED })
  }
}
