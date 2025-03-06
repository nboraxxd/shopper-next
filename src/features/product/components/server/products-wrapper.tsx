import { Suspense } from 'react'

import { Category } from '@/features/category/types'

import { ProductListSkeleton, ProductSidebar } from '@/features/product/components/server'
import { ProductListSort, ProductListFilter } from '@/features/product/components/client/filter-sort-control'

interface Props {
  categories: Category[]
  children: React.ReactNode
  suspenseKey: string
  title?: string
  categoryId?: number
}

export default function ProductsWrapper({ categories, children, suspenseKey, categoryId, title }: Props) {
  return (
    <div className="container min-h-[calc(100vh-var(--header-height))] pt-8">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
        <ProductSidebar categories={categories} categoryId={categoryId} />
        <main className="mt-5 lg:mt-0">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-lg font-medium xs:text-2xl md:font-bold">{title ?? 'Tất cả sản phẩm'}</h1>
            <div className="ml-auto flex items-center gap-4">
              <ProductListFilter />
              <ProductListSort />
            </div>
          </div>
          <Suspense key={suspenseKey} fallback={<ProductListSkeleton />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
