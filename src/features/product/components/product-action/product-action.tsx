'use client'

import { useState } from 'react'

import { QuantityInput } from '@/shared/components/quantity-input'
import { Button } from '@/shared/components/ui/button'
import { HeartIcon } from '@/shared/components/icons'

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
          // className="mt-2"
          max={stock}
          onDecrease={handleChangeQuantity}
          onIncrease={handleChangeQuantity}
          onType={handleChangeQuantity}
          value={quantity.toString()}
        />
      </div>
      {stock > 0 && stock < 10 ? <p className="mt-3 text-sm font-medium">Chỉ còn {stock} sản phẩm</p> : null}
      {stock <= 0 ? <p className="mt-3 text-sm font-medium text-primary-red">Sản phẩm đã hết hàng</p> : null}
      <div className="">
        <Button className="mt-5 h-[46px] w-full rounded-md text-lg" disabled={stock === 0}>
          Mua ngay
        </Button>
        <div className="mt-5 flex items-center gap-5">
          <Button variant="secondary" className="h-[46px] grow rounded-md text-lg" disabled={stock === 0}>
            Thêm vào giỏ
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="group flex size-[46px] items-center justify-center rounded-md border border-secondary-3 bg-product-info hover:bg-product-info"
          >
            <HeartIcon className="transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </div>
  )
}
