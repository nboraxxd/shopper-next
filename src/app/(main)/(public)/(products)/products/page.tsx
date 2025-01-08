import { Suspense } from 'react'

import { SearchParams } from '@/types'
import productApi from '@/api-requests/product.api'

import { ProductList, Sidebar } from '@/app/(main)/(public)/(products)/_components'

export default async function ProductPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const categoriesResponse = await productApi.getCategoriesFromServerToBackend()

  return (
    <>
      <Sidebar categories={categoriesResponse.payload.data} />
      <main className="mt-5 grid grid-cols-2 gap-3 pb-14 md:grid-cols-3 md:gap-4 lg:mt-0 xl:grid-cols-4 2xl:grid-cols-5">
        <Suspense fallback={<div className="text-8xl">Loading...</div>}>
          <ProductList searchParams={searchParams} categories={categoriesResponse.payload.data} />
        </Suspense>
      </main>
    </>
  )
}
