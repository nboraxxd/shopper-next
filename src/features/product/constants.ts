export const PRODUCT_SORT_OPTIONS = {
  PRICE_DESC: 'real_price.desc',
  PRICE_ASC: 'real_price.asc',
  DISCOUNT_DESC: 'discount_rate.desc',
  RATING_DESC: 'rating_average.desc',
  TOP_SELL: 'top_sell',
  NEWEST: 'newest',
} as const

export const PRODUCTS_SORT = [
  { name: 'Mới nhất', value: PRODUCT_SORT_OPTIONS.NEWEST },
  { name: 'Bán chạy', value: PRODUCT_SORT_OPTIONS.TOP_SELL },
  { name: 'Đánh giá tốt', value: PRODUCT_SORT_OPTIONS.RATING_DESC },
  { name: 'Giảm nhiều nhất', value: PRODUCT_SORT_OPTIONS.DISCOUNT_DESC },
  { name: 'Giá giảm dần', value: PRODUCT_SORT_OPTIONS.PRICE_DESC },
  { name: 'Giá tăng dần', value: PRODUCT_SORT_OPTIONS.PRICE_ASC },
] as const

export const PRODUCTS_DATA_FIELDS =
  'name,real_price,categories,slug,id,images,rating_average,review_count,discount_rate,configurable_products'

export const PRODUCT_ERROR_IMAGE = 'https://salt.tikicdn.com/assets/img/image.svg'
