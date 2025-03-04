import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import queryString from 'query-string'

import type { SearchParamsPromise } from '@/shared/types'
import { extractCategorySlug } from '@/features/category/utils'
import envVariables from '@/shared/schemas/env-variables.schema'
import { categoryServerApi } from '@/features/category/api/server'
import { baseOpenGraph } from '@/shared/constants/shared-metadata'
import { sanitizeProductsSearchParams } from '@/features/product/utils/server'
import { CATEGORY_IDS, PRODUCT_CATEGORIES } from '@/features/category/constants'

import { ProductList, ProductsWrapper } from '@/features/product/components/server'

interface Props {
  params: Promise<{ slug: string; 'category-id': string }>
  searchParams: SearchParamsPromise
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'category-id': categoryId } = await params

  const category = PRODUCT_CATEGORIES.find((category) => category.id === +categoryId)

  if (!category) {
    return {
      title: 'Không tìm thấy danh mục sản phẩm',
      description: 'Không tìm thấy danh mục sản phẩm',
    }
  }

  const url = `${envVariables.NEXT_PUBLIC_URL}/${extractCategorySlug(category.slug)}/${category.id}`
  const title = category.title
  const description = category.description
  const image = envVariables.NEXT_PUBLIC_URL + category.image

  return {
    title,
    description,
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function CategoryPage(props: Props) {
  const [{ 'category-id': categoryId }, searchParams] = await Promise.all([props.params, props.searchParams])

  if (CATEGORY_IDS.indexOf(+categoryId as (typeof CATEGORY_IDS)[number]) === -1) notFound()

  const categoriesResponse = await categoryServerApi.getCategoriesFromBackend()

  const productsSearchParams = sanitizeProductsSearchParams({ ...searchParams, categoryId })

  const category = PRODUCT_CATEGORIES.find((category) => category.id === +categoryId)

  return (
    <ProductsWrapper
      title={category?.title}
      categoryId={+categoryId}
      categories={categoriesResponse.payload.data}
      suspenseKey={queryString.stringify(productsSearchParams)}
    >
      <ProductList productsSearchParams={productsSearchParams} categories={categoriesResponse.payload.data} />
    </ProductsWrapper>
  )
}
