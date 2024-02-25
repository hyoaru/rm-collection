"use server"

import { getServerClient } from "@services/supabase/getServerClient";

export default async function deleteProductVariant(variantId: string) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', variantId)
    .select('id, product_id')
    .single()

  return { data, error }
}