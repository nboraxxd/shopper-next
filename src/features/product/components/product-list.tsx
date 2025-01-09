import keyBy from 'lodash/keyBy'

import type { Category } from '@/features/category/types'
import { productServerApi } from '@/features/product/api/server'
import { PRODUCTS_DATA_FIELDS } from '@/features/product/constants'
import type { Product, ProductsDataField, ProductsSearchParams } from '@/features/product/types'

import { ProductCard } from '@/features/product/components'

interface Props {
  productsSearchParams: ProductsSearchParams
  categories: Category[]
}

export default async function ProductList({ productsSearchParams, categories }: Props) {
  const categoryById = keyBy(categories, 'id')

  const productsResponse = await productServerApi.getProductsFromServerToBackend<Pick<Product, ProductsDataField>>({
    fields: PRODUCTS_DATA_FIELDS,
    limit: '60',
    ...productsSearchParams,
  })

  return productsResponse.payload.data.map((product) => {
    const category = categoryById[product.categories] as Category | undefined

    return <ProductCard key={product.id} product={product} category={category?.title} />
  })
}
