import addressServerApi from '@/features/address/api/server'
import { HTTP_STATUS_CODE } from '@/shared/constants/http-status-code'
import { HttpError } from '@/shared/utils/error'

export async function GET() {
  try {
    const { payload } = await addressServerApi.getProvincesFromVietnamProvinces()

    return Response.json({ data: payload })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Internal Server Error' }, { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR })
    }
  }
}
