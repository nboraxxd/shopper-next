import { FieldUnion, Paginate } from '@/types'
import { productListQueryFields, productSortOptions } from '@/constants'

export type ProductSortOptionsKey = keyof typeof productSortOptions

export type ProductSortOptionsValue = (typeof productSortOptions)[ProductSortOptionsKey]

export type ProductListFieldType = FieldUnion<typeof productListQueryFields>

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

export type ImageUrl = {
  large_url: string
  medium_url: string
  small_url: string
}

type ConfigurableProduct = {
  images: ImageUrl[]
}

type Image = {
  base_url: string
  thumbnail_url: string
  is_gallery: boolean
} & ImageUrl

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

export type ProductType = {
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
  images: Image[]
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
  data: ProductType
}

export type Category = {
  _id: string
  id: number
  parent_id: number
  position: number
  status: number
  title: string
  slug: string
  parent: null
}

export type CategoriesResponse = {
  data: Category[]
}

export type CategoryResponse = {
  data: Category | null
}

export type ProductsSearchParams = {
  [key in keyof Omit<ProductParameters, 'fields' | 'limit' | 'sort' | 'id'>]: string
} & {
  sort?: ProductSortOptionsValue
}
