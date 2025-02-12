import PATH from '@/shared/constants/path'
import { AddNewPaymentCardForm } from '@/features/payment/components/client'
import { AccountHeader, AccountSectionWrapper } from '@/features/account/components'

export default function AddNewPaymentCard() {
  return (
    <AccountSectionWrapper>
      <AccountHeader prevPath={PATH.PAYMENT}>Thêm thẻ mới</AccountHeader>
      <AddNewPaymentCardForm />
    </AccountSectionWrapper>
  )
}
