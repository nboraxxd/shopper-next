import {
  AddPaymentCardResponse,
  PaymentCardListResponse,
  SetDefaultPaymentCardResponse,
} from '@/features/payment/types'
import http from '@/shared/utils/http'
import { MessageResponse } from '@/shared/types'
import { AddNewPaymentCardReqBody } from '@/features/payment/schemas'

const PREFIX = '/users/payment'

export const paymentClientApi = {
  addNewPaymentCardToBackend: (body: AddNewPaymentCardReqBody) => http.post<AddPaymentCardResponse>(PREFIX, body),

  setDefaultPaymentCardToBackend: (paymentCardId: string) =>
    http.patch<SetDefaultPaymentCardResponse>(`${PREFIX}/${paymentCardId}`, { default: true }),

  deletePaymentCardFromBackend: (paymentCardId: string) => http.delete<MessageResponse>(`${PREFIX}/${paymentCardId}`),

  getPaymentsFromBackend: () => http.get<PaymentCardListResponse>(PREFIX),
}
