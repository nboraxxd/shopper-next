import http from '@/shared/utils/http'
import { PaymentCardListResponse } from '@/features/payment/types'

const PREFIX = '/users/payment'

const paymentServerApi = {
  getPaymentsFromBackend: (accessToken: string) =>
    http.get<PaymentCardListResponse>(PREFIX, { headers: { Authorization: `Bearer ${accessToken}` } }),
}

export default paymentServerApi
