import addressServerApi from '@/features/address/api/server'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { HttpError } from '@/shared/utils/error'
import { z } from 'zod'

export async function GET(_req: Request, { params }: { params: Promise<{ 'province-code': string }> }) {
  const { 'province-code': provinceCode } = await params

  const parsedProvinceCode = await z.coerce.number().int().positive().parseAsync(provinceCode)

  try {
    const { payload } = await addressServerApi.getDistrictsFromVietnamProvinces(parsedProvinceCode)

    return Response.json({ data: payload.districts })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: 'Validation error occurred in params',
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
