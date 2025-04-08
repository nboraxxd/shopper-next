import { CircleXIcon } from 'lucide-react'
import Image from 'next/image'

export default function OrderItem() {
  return (
    <div className="flex flex-col rounded-md border p-4">
      <div className="flex items-center gap-1.5 border-b pb-3 text-sm text-secondary-2">
        <CircleXIcon className="size-4" />
        <span className="mt-px">Đã huỷ</span>
      </div>
      <div className="flex justify-between gap-2 border-b py-4">
        <div className="flex gap-3">
          <div className="relative shrink-0 select-none rounded-md border">
            <Image
              className="w-20 rounded object-contain"
              src="https://salt.tikicdn.com/cache/200x200/media/catalog/producttmp/b7/e2/43/3e3bec19ecb44bf35391e7fb528d6bc1.jpg"
              alt="product"
              width={96}
              height={96}
            />
            <span className="absolute bottom-0 right-0 flex h-6 min-w-6 items-center justify-center rounded-tl-md bg-secondary-2 text-xs">
              x999
            </span>
          </div>
        </div>
        <span>779.000 ₫</span>
      </div>
    </div>
  )
}
