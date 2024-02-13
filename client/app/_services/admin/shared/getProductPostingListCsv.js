"use server"

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductPostingListCsv() {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('product_variants')
    .select()
    .eq('is_displayed', true)
    .csv()

  return { data, error: processErrorToCrossSideSafe(error) }
}