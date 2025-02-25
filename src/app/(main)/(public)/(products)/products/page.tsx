import { Metadata } from 'next'

import type { SearchParams } from '@/shared/types'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import { ProductList, ProductSidebar } from '@/features/product/components/server'

export const metadata: Metadata = {
  title: 'Cửa hàng online',
  description:
    'Lựa chọn nhiều mặt hàng Giày - Dép nữ, Điện Gia Dụng, Điện Thoại - Máy Tính Bảng... từ Shopper, mua online ship tận nhà và nhiều ưu đãi khác',
}

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams(searchParams)

  return (
    <div className="container min-h-[calc(100vh-var(--header-height))] pt-8">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
        <ProductSidebar categories={categoriesResponse.payload.data} />
        <main className="mt-5 lg:mt-0">
          <h1 className="text-lg font-medium md:text-2xl md:font-bold">Tất cả sản phẩm</h1>
          <div className="mt-4 grid grid-cols-2 gap-3 pb-14 md:mt-7 md:grid-cols-3 md:gap-4 lg:h-fit xl:grid-cols-4 2xl:grid-cols-5">
            <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
          </div>
        </main>
      </div>
    </div>
  )
}
