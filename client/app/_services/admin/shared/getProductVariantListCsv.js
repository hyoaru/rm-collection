"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductVariantListCsv() {
  const supabase = getServerClient()
  const { data, error } = await supabase
    .from('product_variants')
    .select()
    .csv()

  return { data, error }
}