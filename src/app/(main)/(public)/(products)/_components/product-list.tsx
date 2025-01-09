import keyBy from 'lodash/keyBy'

import { productServerApi } from '@products/_api/server'
import { PRODUCT_LIST_QUERY_FIELDS } from '@/constants'
import { Category, ProductListFieldType, ProductsSearchParams, ProductType } from '@/types/product.type'

import { ProductCard } from '@/app/(main)/_components'

interface Props {
  productsSearchParams: ProductsSearchParams
  categories: Category[]
}

export default async function ProductList({ productsSearchParams, categories }: Props) {
  const categoryById = keyBy(categories, 'id')

  const productsResponse = await productServerApi.getProductsFromServerToBackend<
    Pick<ProductType, ProductListFieldType>
  >({
    fields: PRODUCT_LIST_QUERY_FIELDS,
    limit: '60',
    ...productsSearchParams,
  })

  return productsResponse.payload.data.map((product) => {
    const category = categoryById[product.categories] as Category | undefined

    return <ProductCard key={product.id} product={product} category={category?.title} />
  })
}
