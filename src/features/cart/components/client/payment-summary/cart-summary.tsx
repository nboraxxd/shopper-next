'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useMutationState } from '@tanstack/react-query'

import { cn, formatCurrency } from '@/shared/utils'
import { useQueryCartList } from '@/features/cart/hooks'
import { CHECKOUT_KEY } from '@/features/checkout/constants'
import { PreCheckoutResponse } from '@/features/checkout/types'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Svgr, VoucherIcon } from '@/shared/components/icons'

export default function CartSummary() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const queryCartList = useQueryCartList()

  const data = useMutationState({
    filters: { mutationKey: [CHECKOUT_KEY.PRE_CHECKOUT], exact: true, status: 'success' },
    select: (mutation) => mutation.state.data as { payload: PreCheckoutResponse } | undefined,
  })

  const latest = data[data.length - 1]

  return (
    <>
      <AnimatePresence>
        {!isDrawerOpen ? (
          <motion.div
            className="fixed inset-x-0 bottom-[60px] z-[999] flex justify-between bg-cart-section px-7 py-3 shadow-popover xl:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Svgr icon={VoucherIcon} className="size-5" />
              <span>Shopper khuyến mãi</span>
            </div>
            <button className="text-primary">Chọn hoặc nhập mã</button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        className={cn(
          'bg-cart-section px-7 py-3 xl:p-7',
          'fixed inset-x-0 bottom-0 z-[999] shadow-popover',
          'xl:sticky xl:inset-x-auto xl:bottom-auto xl:top-[calc(var(--header-height)+2rem)] xl:z-0 xl:h-auto xl:self-start xl:rounded-4xl xl:bg-cart-section xl:shadow-section'
        )}
      >
        <div>
          <div className="hidden xl:block">
            <div className="flex justify-between">
              <span>Tiền hàng</span>
              <span>
                {formatCurrency(latest?.payload.data.subTotal || 0)}
                <sup>₫</sup>
              </span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá</span>
              <span>
                -{formatCurrency(latest?.payload.data.promotion?.discount || 0)}
                <sup>₫</sup>
              </span>
            </div>
            <div className="flex justify-between">
              <span>Thuế</span>
              <span>
                {formatCurrency(latest?.payload.data.tax || 0)}
                <sup>₫</sup>
              </span>
            </div>
          </div>
          {/* <Separator className="my-3 h-0 border-t border-dashed border-border" /> */}
          <div className="flex justify-between gap-1">
            <div className="flex items-center gap-2 xs:gap-3">
              <Checkbox className="size-5" />
              <h2>Chọn tất cả ({queryCartList.data?.payload.data.listItems.length || 0})</h2>
            </div>
            <div className="flex">
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button>
                    <span>Tổng cộng </span>
                    <span className="inline xl:hidden">({latest?.payload.data.listItems.length || 0} sản phẩm):</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>Cancel</DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <span>
                {formatCurrency(latest?.payload.data.viewCartTotal || 0)}
                <sup>₫</sup>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
