import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getProductVariantList() {
  const supabase = getBrowserClient()
  let { data, error } = await supabase.from('product_variants').select('*')
  return { data, error}
}