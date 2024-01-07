"use server"

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getProductVariantListCsv() {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('product_variants')
    .select()
    .csv()

  return { data, error: processErrorToCrossSideSafe }
}