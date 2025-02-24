import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { CartItem } from '@/features/cart/types'

type CartListStore = {
  cartList: CartItem[] | null
  setCartList: (cartListOrUpdater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void
}

const useCartList = create<CartListStore>()(
  devtools(
    (set) => ({
      cartList: null,
      setCartList: (cartListOrUpdater) =>
        set(({ cartList }) => ({
          cartList: typeof cartListOrUpdater === 'function' ? cartListOrUpdater(cartList ?? []) : cartListOrUpdater,
        })),
    }),
    {
      name: 'cartListStore',
    }
  )
)

export default useCartList
