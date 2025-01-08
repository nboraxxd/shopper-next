import Link from 'next/link'

import productApi from '@/api-requests/product.api'
import { PRODUCT_LIST_QUERY_FIELDS } from '@/constants'
import { ProductListFieldType, ProductType } from '@/types/product.type'

import { ProductCard } from '@/app/(main)/_components'

export default async function BestSellerSection() {
  const productsResponse = await productApi.getProductsFromServerToBackend<Pick<ProductType, ProductListFieldType>>({
    fields: PRODUCT_LIST_QUERY_FIELDS,
    limit: '12',
    sort: 'top_sell',
  })

  return (
    <section className="pt-16 lg:pt-24">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Sản phẩm bán chạy</h2>
        <Link href="/san-pham" className="hidden text-sm font-semibold text-heading-3 hover:text-heading-3/90 sm:block">
          Xem tất cả
          <span> &rarr;</span>
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="flex gap-2 pb-3 md:gap-4">
          {productsResponse.payload.data.slice(0, 6).map((product) => {
            product.rating_average = 0
            return <ProductCard key={product.id} product={product} className="w-28 shrink-0 grow md:w-36" />
          })}
        </div>
        <div className="flex gap-2 pb-3 md:gap-4">
          {productsResponse.payload.data.slice(6).map((product) => {
            product.rating_average = 0
            return <ProductCard key={product.id} product={product} className="w-28 shrink-0 grow md:w-36" />
          })}
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <Link href="/san-pham" className="block text-sm font-semibold text-primary hover:text-primary/90">
          Xem tất cả
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  )
}
