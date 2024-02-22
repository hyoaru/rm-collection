import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getAllProductVariants() {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .order('created_at', { ascending: true })

  return {data, error: processErrorToCrossSideSafe(error)}
}