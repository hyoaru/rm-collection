import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getCollectionByCategory({ category }) {
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_variants!inner(*)`)
    .eq('category', category)
    .eq('product_variants.is_displayed', true)
    .order('name', { ascending: true })

  return { data, error }
}