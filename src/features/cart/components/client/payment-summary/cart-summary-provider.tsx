'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'

type CartSummaryState = {
  isStatic: boolean
  setIsStatic: Dispatch<SetStateAction<boolean>>
}

export const CartSummaryContext = createContext<CartSummaryState>({
  isStatic: false,
  setIsStatic: () => {},
})

export function CartSummaryProvider({ children }: { children: React.ReactNode }) {
  const [isStatic, setIsStatic] = useState(false)

  return <CartSummaryContext.Provider value={{ isStatic, setIsStatic }}>{children}</CartSummaryContext.Provider>
}
