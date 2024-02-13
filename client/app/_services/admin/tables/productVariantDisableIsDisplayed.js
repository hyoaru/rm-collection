"use server"

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function productVariantDisableIsDisplayed(productVariantId) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('product_variants')
    .update({ is_displayed: false})
    .eq('id', productVariantId)
    .select()

  return { data, error: processErrorToCrossSideSafe(error) }
}