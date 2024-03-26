"use server"

import { getServerClient } from "@services/supabase/getServerClient"
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"

type AddProductParams = {
  name: string
  description: string
  category: string
  stockLocations: string[]
}

export default async function addProduct({ name, description, category, stockLocations }: AddProductParams) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: name,
      description: description,
      category: category,
      stock_locations: stockLocations,
    }])
    .select()
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}