import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getCollection() {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_variants(*)`)
    .eq('product_variants.is_displayed', true)
    .order('name', { ascending: true })

  return { data, error }
}