import { PaymentsResponse } from '@/features/payment/types'
import http from '@/shared/utils/http'

const PREFIX = '/users/payment'

const paymentServerApi = {
  getPaymentsFromBackend: (accessToken: string) =>
    http.get<PaymentsResponse>(PREFIX, { headers: { Authorization: `Bearer ${accessToken}` } }),
}

export default paymentServerApi
