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
