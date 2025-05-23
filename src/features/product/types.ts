import { Paginate } from '@/shared/types'

import {
  BEST_SELLER_PRODUCTS_FIELDS,
  PRODUCT_DETAIL_FIELDS,
  PRODUCT_SORT_OPTIONS,
  PRODUCT_STOCK_FIELDS,
  PRODUCTS_FIELDS,
  RELATED_PRODUCTS_FIELDS,
} from '@/features/product/constants'

export type FieldUnion<T extends string> = T extends `${infer U},${infer Rest}` ? U | FieldUnion<Rest> : T

export type ProductsField = FieldUnion<typeof PRODUCTS_FIELDS>

export type BestSellerProductsField = FieldUnion<typeof BEST_SELLER_PRODUCTS_FIELDS>

export type ProductDetailField = FieldUnion<typeof PRODUCT_DETAIL_FIELDS>

export type RelatedProductsField = FieldUnion<typeof RELATED_PRODUCTS_FIELDS>

export type ProductStockField = FieldUnion<typeof PRODUCT_STOCK_FIELDS>

export type ProductSortOptionsKey = keyof typeof PRODUCT_SORT_OPTIONS

export type ProductSortOptionsValue = (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS]

type Badge =
  | {
      code: 'tikinow' | 'only_ship_to'
      text: string
    }
  | {
      code: 'installment'
      price: number
      month: number
    }
  | {
      code: 'cross_border'
    }

type ConfigurableOption = {
  code: string
  name: string
  position: number
  values: {
    label: string
  }[]
}

export type ProductImageSizes = {
  large_url: string
  medium_url: string
  small_url: string
}

export type ConfigurableProduct = {
  images: ProductImageSizes[]
}

export type ProductImagedata = {
  base_url: string
  thumbnail_url: string
  is_gallery: boolean
} & ProductImageSizes

type Specification = {
  name: string
  attributes: {
    name: string
    value: string
  }[]
}

export type ProductParameters = {
  sort?: ProductSortOptionsValue
  id?: string
  name?: string
  fields?: string
  minPrice?: string
  maxPrice?: string
  limit?: string
  page?: string
  filterRating?: string
  categories?: string
}

export type ProductsSearchParams = {
  [key in keyof Omit<ProductParameters, 'fields' | 'limit' | 'sort' | 'id'>]: string
} & {
  sort?: ProductSortOptionsValue
}

export type ProductBase = {
  id: number
  name: string
  price: number
  rating_average: number
  real_price: number
  review_count: number
  slug: string
  thumbnail_url: string
  _id: string
}

export type Product = {
  _id: string
  id: number
  sku: string
  badges: Badge[]
  categories: number
  configurable_options: ConfigurableOption[] | null
  configurable_products: ConfigurableProduct[] | null
  description: string
  discount: number
  discount_rate: number
  images: ProductImagedata[]
  inventory_status: 'discontinued' | 'pre_order' | 'available'
  name: string
  price: number
  real_price: number
  price_usd: number
  rating_average: number
  review_count: number
  short_description: string
  specifications: Specification[]
  stock_item: {
    qty: number
    min_sale_qty: number
    max_sale_qty: number
    preorder_date: boolean
  }
  thumbnail_url: string
  top_features: string[]
  type: 'configurable' | 'simple'
  slug: string
}

export type ProductsResponse<P> = {
  data: P[]
  paginate: Paginate
}

export type ProductResponse = {
  data: [Pick<Product, ProductDetailField>]
  paginate: Paginate
}

export type RelatedProductsResponse = {
  data: Pick<Product, RelatedProductsField>[]
  paginate: Paginate
}

export type ProductStockResponse = {
  data: [Pick<Product, ProductStockField>]
  paginate: Paginate
}
