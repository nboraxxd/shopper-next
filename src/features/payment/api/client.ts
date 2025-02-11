import http from '@/shared/utils/http'
import { MessageResponse } from '@/shared/types'
import { AddNewPaymentCardReqBody } from '@/features/payment/schemas'
import { AddPaymentCardResponse, SetDefaultPaymentCardResponse } from '@/features/payment/types'

const BACKEND_PREFIX = '/users/payment'

export const paymentClientApi = {
  addNewPaymentCardToBackend: (body: AddNewPaymentCardReqBody) =>
    http.post<AddPaymentCardResponse>(BACKEND_PREFIX, body),

  setDefaultPaymentCardToBackend: (paymentCardId: string) =>
    http.patch<SetDefaultPaymentCardResponse>(`${BACKEND_PREFIX}/${paymentCardId}`, { default: true }),

  deletePaymentCardFromBackend: (paymentCardId: string) =>
    http.delete<MessageResponse>(`${BACKEND_PREFIX}/${paymentCardId}`),
}
