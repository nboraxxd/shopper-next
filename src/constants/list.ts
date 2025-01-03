import { productSortOptions } from '@/constants'

export const GENDERS = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
] as const

export const PRODUCTS_SORT = [
  { name: 'Mới nhất', value: productSortOptions.NEWEST },
  { name: 'Bán chạy', value: productSortOptions.TOP_SELL },
  { name: 'Đánh giá tốt', value: productSortOptions.RATING_DESC },
  { name: 'Giảm nhiều nhất', value: productSortOptions.DISCOUNT_DESC },
  { name: 'Giá giảm dần', value: productSortOptions.PRICE_DESC },
  { name: 'Giá tăng dần', value: productSortOptions.PRICE_ASC },
] as const

export const CATEGORIES_IMAGE = [
  {
    id: 1789,
    image: '/images/categories/1789.png',
  },
  {
    id: 4221,
    image: '/images/categories/4221.png',
  },
  {
    id: 1815,
    image: '/images/categories/1815.png',
  },
  {
    id: 1846,
    image: '/images/categories/1846.png',
  },
  {
    id: 1801,
    image: '/images/categories/1801.png',
  },
  {
    id: 1882,
    image: '/images/categories/1882.png',
  },
  {
    id: 1883,
    image: '/images/categories/1883.png',
  },
  {
    id: 4384,
    image: '/images/categories/4384.png',
  },
  {
    id: 2549,
    image: '/images/categories/2549.png',
  },
  {
    id: 1520,
    image: '/images/categories/1520.png',
  },
  {
    id: 1975,
    image: '/images/categories/1975.png',
  },
  {
    id: 8594,
    image: '/images/categories/8594.png',
  },
  {
    id: 17166,
    image: '/images/categories/17166.png',
  },
  {
    id: 8322,
    image: '/images/categories/8322.png',
  },
  {
    id: 11312,
    image: '/images/categories/11312.png',
  },
] as const
