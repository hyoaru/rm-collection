"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductListCsv() {
  const supabase = getServerClient()
  const { data, error } = await supabase
    .from('products')
    .select()
    .csv()

  return { data, error }
}