import { PRODUCT_SORT_OPTIONS } from '@/constants'

export const GENDERS = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
] as const

export const PRODUCTS_SORT = [
  { name: 'Mới nhất', value: PRODUCT_SORT_OPTIONS.NEWEST },
  { name: 'Bán chạy', value: PRODUCT_SORT_OPTIONS.TOP_SELL },
  { name: 'Đánh giá tốt', value: PRODUCT_SORT_OPTIONS.RATING_DESC },
  { name: 'Giảm nhiều nhất', value: PRODUCT_SORT_OPTIONS.DISCOUNT_DESC },
  { name: 'Giá giảm dần', value: PRODUCT_SORT_OPTIONS.PRICE_DESC },
  { name: 'Giá tăng dần', value: PRODUCT_SORT_OPTIONS.PRICE_ASC },
] as const
