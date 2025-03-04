import { Metadata } from 'next'
import queryString from 'query-string'

import type { SearchParamsPromise } from '@/shared/types'
import { categoryServerApi } from '@/features/category/api/server'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'

import { ProductList, ProductsWrapper } from '@/features/product/components/server'

export const metadata: Metadata = {
  title: 'Cửa hàng online',
  description:
    'Lựa chọn nhiều mặt hàng Giày - Dép nữ, Điện Gia Dụng, Điện Thoại - Máy Tính Bảng... từ Shopper, mua online ship tận nhà và nhiều ưu đãi khác',
}

export default async function ProductsPage(props: { searchParams: SearchParamsPromise }) {
  const searchParams = await props.searchParams

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams(searchParams)

  return (
    <ProductsWrapper
      title="Tất cả sản phẩm"
      categories={categoriesResponse.payload.data}
      suspenseKey={queryString.stringify(productsSearchParams)}
    >
      <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
    </ProductsWrapper>
  )
}
