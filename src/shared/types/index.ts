export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

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
