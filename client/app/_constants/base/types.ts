import { Tables } from "@constants/base/database-types"

export type ProductResponseType = {
  data: Tables<'products'>
  error: any
}

export type ProductsResponseType = {
  data: Tables<'products'>[]
  error: any
}

export type ProductVariantsResponseType = {
  data: Tables<'product_variants'>[]
  error: any
}
