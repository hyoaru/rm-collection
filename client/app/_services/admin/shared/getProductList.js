'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductList() {
  const supabase = await getServerClient()
  let { data, error } = await supabase
    .from('products')
    .select('*')

  return { data, error: processErrorToCrossSideSafe(error) }
}