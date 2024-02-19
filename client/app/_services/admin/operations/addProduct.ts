"use server"

import { getServerClient } from "@services/supabase/getServerClient"
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"

type AddProductParams = {
  name: string
  description: string
  category: string
}

export default async function addProduct({ name, description, category }: AddProductParams) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: name,
      description: description,
      category: category
    }])
    .select()
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}