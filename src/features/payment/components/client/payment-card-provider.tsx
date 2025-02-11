'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'

type PaymentCardState = {
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

export const PaymentCardContext = createContext<PaymentCardState>({
  isDisabled: false,
  setIsDisabled: () => {},
})

export function PaymentCardProvider({ children }: { children: React.ReactNode }) {
  const [isDisabled, setIsDisabled] = useState(false)

  return <PaymentCardContext.Provider value={{ isDisabled, setIsDisabled }}>{children}</PaymentCardContext.Provider>
}
