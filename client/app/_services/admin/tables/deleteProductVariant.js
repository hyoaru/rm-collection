"use server"

// App imports
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteProductVariant(productVariantId) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', productVariantId)

  return { data, error }
}