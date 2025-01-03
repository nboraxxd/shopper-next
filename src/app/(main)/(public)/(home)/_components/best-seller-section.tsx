import Link from 'next/link'

import productApi from '@/api-requests/product.api'
import { ProductListFieldType, ProductType } from '@/types/product.type'
import { productListQueryFields } from '@/constants'
import { ProductCard } from '@/components/shared'

export default async function BestSellerSection() {
  const productsResponse = await productApi.getProductsFromServerToBackend<Pick<ProductType, ProductListFieldType>>({
    fields: productListQueryFields,
    limit: '6',
    sort: 'top_sell',
  })

  return (
    <section className="pt-16 lg:pt-24">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Sản phẩm bán chạy</h2>
        <Link href="/products" className="hidden text-sm font-semibold text-primary hover:text-primary/90 sm:block">
          Xem tất cả
          <span> &rarr;</span>
        </Link>
      </div>

      <div className="mt-5 flex w-full gap-2 overflow-x-auto pb-3 md:gap-4">
        {productsResponse.payload.data.map((product) => {
          product.rating_average = 0
          return <ProductCard key={product.id} product={product} className="w-28 shrink-0 grow md:w-36" />
        })}
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <Link href="/products" className="block text-sm font-semibold text-primary hover:text-primary/90">
          Xem tất cả
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  )
}
