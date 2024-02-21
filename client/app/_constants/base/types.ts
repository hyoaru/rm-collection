import { Tables } from "@constants/base/database-types"

export type ProductsResponseType = {
  data: Tables<'products'>[]
  error: any
}