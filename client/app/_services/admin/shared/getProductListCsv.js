"use server"

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductListCsv() {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('products')
    .select()
    .csv()

  return { data, error: processErrorToCrossSideSafe(error) }
}