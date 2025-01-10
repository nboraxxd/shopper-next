import Link from 'next/link'

import PATH from '@/shared/constants/path'
import { productServerApi } from '@/features/product/api/server'
import { PRODUCTS_DATA_FIELDS } from '@/features/product/constants'
import type { ProductsDataField, Product } from '@/features/product/types'

import { ProductCard } from '@/features/product/components'

export default async function BestSellerSection() {
  const productsResponse = await productServerApi.getProductsFromServerToBackend<Pick<Product, ProductsDataField>>({
    fields: PRODUCTS_DATA_FIELDS,
    limit: '12',
    sort: 'top_sell',
  })

  return (
    <section className="pt-16 lg:pt-24">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Sản phẩm bán chạy</h2>
        <Link href={PATH.PRODUCTS} className="hidden text-sm font-semibold text-link hover:text-link/90 sm:block">
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
        <Link href={PATH.PRODUCTS} className="block text-sm font-semibold text-primary hover:text-primary/90">
          Xem tất cả
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  )
}
