export type SearchParamsProps = {
  searchParams: { [key: string]: string | undefined }
}

export type FieldUnion<T extends string> = T extends `${infer U},${infer Rest}` ? U | FieldUnion<Rest> : T

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
}
