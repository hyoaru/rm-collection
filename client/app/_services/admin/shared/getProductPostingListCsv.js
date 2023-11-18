"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductPostingListCsv() {
  const supabase = getServerClient()
  const { data, error } = await supabase
    .from('product_variants')
    .select()
    .eq('is_displayed', true)
    .csv()

  return { data, error }
}