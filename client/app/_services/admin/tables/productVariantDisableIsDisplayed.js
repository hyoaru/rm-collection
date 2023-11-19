"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function productVariantDisableIsDisplayed(productVariantId) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .update({ is_displayed: false})
    .eq('id', productVariantId)
    .select()

  return { data, error }
}