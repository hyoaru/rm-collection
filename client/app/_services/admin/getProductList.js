import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getProductList() {
  const supabase = getBrowserClient()
  let { data, error } = await supabase.from('products').select('*')
  return { data, error}
}