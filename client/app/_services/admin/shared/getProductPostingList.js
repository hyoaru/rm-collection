import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getProductPostingList() {
  const supabase = getBrowserClient()
  let { data, error } = await supabase.from('product_variants').select('*').eq('is_displayed', true)
  return { data, error}
}