'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function getCollection() {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_variants!inner(*)`)
    .eq('product_variants.is_displayed', true)
    .order('name', { ascending: true })

  return { data, error: processErrorToCrossSideSafe(error) }
}