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

export const PRODUCTS_FIELDS =
  '_id,categories,configurable_products,discount_rate,id,images,name,rating_average,real_price,review_count,slug'

export const PRODUCT_DETAIL_FIELDS =
  '_id,configurable_products,description,discount,discount_rate,id,images,name,price,real_price,rating_average,review_count,short_description,stock_item,slug'

export const PRODUCT_ERROR_IMAGES = [
  'https://salt.tikicdn.com/assets/img/image.svg',
  'https://salt.tikicdn.com/cache/w300/media/catalog/producthttp://img11.joybuy.com/N0/s900x900_g10/M00/00/09/rBEQWFD-WsUIAAAAAADys29bRvUAAADlQC4eC8AAPLL793.jpg',
]

export const PRODUCT_KEY = {
  PRODUCT: 'product',
}
