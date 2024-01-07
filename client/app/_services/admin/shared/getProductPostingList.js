'use server'

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductPostingList() {
  const supabase = await getServerClient()
  let { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('is_displayed', true)

  return { data, error: processErrorToCrossSideSafe(error) }
}