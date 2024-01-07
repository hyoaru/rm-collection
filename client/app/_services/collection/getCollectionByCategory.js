'use server'

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function getCollectionByCategory({ category }) {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_variants!inner(*)`)
    .eq('category', category)
    .eq('product_variants.is_displayed', true)
    .order('name', { ascending: true })

  return { data, error: processErrorToCrossSideSafe(error) }
}