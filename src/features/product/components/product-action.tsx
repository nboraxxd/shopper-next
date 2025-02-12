'use client'

import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { QuantityInput } from '@/shared/components/quantity-input'

export default function ProductAction({ stock }: { stock: number }) {
  const INITIAL_QUANTITY = '1'
  const [quantity, setQuantity] = useState<string>(INITIAL_QUANTITY)

  function handleChangeQuantity(value: string) {
    setQuantity(value)
  }

  return (
    <div>
      <div className="flex items-center gap-3 xl:flex-col xl:items-start">
        <span className="text-lg font-medium">Số lượng:</span>
        <QuantityInput
          max={stock}
          onDecrease={handleChangeQuantity}
          onIncrease={handleChangeQuantity}
          onType={handleChangeQuantity}
          value={quantity.toString()}
        />
      </div>
      {stock > 0 && stock < 10 ? <p className="mt-3 text-sm font-medium">Chỉ còn {stock} sản phẩm</p> : null}
      {stock <= 0 ? <p className="mt-3 text-sm font-medium text-primary-red">Sản phẩm đã hết hàng</p> : null}
      <div className="mt-5">
        <Button
          variant="ghost"
          className="h-[46px] w-full rounded-md border border-highlight text-lg text-highlight hover:bg-accent/50 hover:text-highlight"
          disabled={stock === 0}
        >
          Thêm vào giỏ
        </Button>
        <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-4">
          <Button className="h-[46px] grow rounded-md sm:text-lg" disabled={stock === 0}>
            Mua ngay
          </Button>
          <Button
            variant="ghost"
            className="h-[46px] grow rounded-md border border-highlight text-highlight hover:bg-accent/50 hover:text-highlight sm:text-lg"
          >
            Yêu thích
          </Button>
        </div>
      </div>
    </div>
  )
}
