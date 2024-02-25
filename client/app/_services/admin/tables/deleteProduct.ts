"use server"

import { getServerClient } from "@services/supabase/getServerClient";

export default async function deleteProduct(productId: string) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .select('*, product_variants!inner(id)')
    .single()

  return { data, error }
}