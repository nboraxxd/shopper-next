import jwt from 'jsonwebtoken'
import { type NextRequest } from 'next/server'

import { TokenPayload } from '@/shared/types'
import { MOCK_PROMOTIONS } from '@/features/promotion/constants'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'

export async function GET(req: NextRequest) {
  const {
    headers,
    nextUrl: { searchParams },
  } = req

  const accessToken = headers.get('Authorization')?.split('Bearer ')[1]

  if (!accessToken) {
    return Response.json(
      {
        error: 1,
        error_code: 'MISSING_TOKEN',
        message: 'Access token is required',
      },
      { status: HTTP_STATUS_CODE.FORBIDDEN }
    )
  }

  const accessTokenDecoded = jwt.decode(accessToken) as TokenPayload

  if (accessTokenDecoded.exp <= Math.floor(new Date().getTime() / 1000)) {
    return Response.json(
      {
        error: 1,
        error_code: 'TOKEN_EXPIRED',
        message: 'Token was expired',
      },
      { status: HTTP_STATUS_CODE.FORBIDDEN }
    )
  }

  const limit = searchParams.get('limit')
  const type = searchParams.get('type')

  if (type) {
    return Response.json({
      data: MOCK_PROMOTIONS.filter((promotion) => promotion.type === type).slice(
        0,
        Number(limit) > 0 ? Number(limit) : undefined
      ),
    })
  }

  return Response.json({ data: MOCK_PROMOTIONS.slice(0, Number(limit) > 0 ? Number(limit) : undefined) })
}
