import { LucideProps } from 'lucide-react'

import { SearchParams } from 'next/dist/server/request/search-params'

export type SearchParamsPromise = Promise<SearchParams>

export type TokenPayload = {
  _id: string
  username: string
  iat: number
  exp: number
}

export type MessageResponse = {
  message: string
}

export type Paginate = {
  currentPage: number
  totalPage: number
  count: number
  perPage: number
  previousPage?: number
  nextPage?: number
}

export type Icon =
  | React.FC<React.SVGProps<SVGElement>>
  | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
