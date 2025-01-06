export const PRODUCT_SORT_OPTIONS = {
  PRICE_DESC: 'real_price.desc',
  PRICE_ASC: 'real_price.asc',
  DISCOUNT_DESC: 'discount_rate.desc',
  RATING_DESC: 'rating_average.desc',
  TOP_SELL: 'top_sell',
  NEWEST: 'newest',
} as const

export type ProductSortOptions = (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS]

export const PRODUCT_LIST_QUERY_FIELDS =
  'name,real_price,categories,slug,id,images,rating_average,review_count,discount_rate,configurable_products'

export const PRODUCT_ERROR_IMAGE = 'https://salt.tikicdn.com/assets/img/image.svg'
