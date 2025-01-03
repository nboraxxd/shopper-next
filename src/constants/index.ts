export const productSortOptions = {
  PRICE_DESC: 'real_price.desc',
  PRICE_ASC: 'real_price.asc',
  DISCOUNT_DESC: 'discount_rate.desc',
  RATING_DESC: 'rating_average.desc',
  TOP_SELL: 'top_sell',
  NEWEST: 'newest',
} as const

export const productListQueryFields =
  'name,real_price,categories,slug,id,images,rating_average,review_count,discount_rate,configurable_products'

export const productErrorImage = 'https://salt.tikicdn.com/assets/img/image.svg'
