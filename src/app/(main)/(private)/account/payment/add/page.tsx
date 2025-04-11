import { Metadata } from 'next'

import PATH from '@/shared/constants/path'

import { AddNewPaymentCardForm } from '@/features/payment/components/client'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export const metadata: Metadata = {
  title: 'Thêm thẻ mới',
}

export default function AddNewPaymentCard() {
  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.PAYMENT} returnLabel="Quay lại trang thông tin thanh toán">
        Thêm thẻ mới
      </AccountHeader>
      <AddNewPaymentCardForm />
    </AccountSectionWrapper>
  )
}
