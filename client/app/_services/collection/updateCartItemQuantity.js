'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function updateCartItemQuantity({ userId, productVariantId, quantity }) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('cart')
    .update({ quantity: quantity })
    .eq('user_id', userId)
    .eq('product_variant_id', productVariantId)
    .select()

  return { data, error: processErrorToCrossSideSafe(error) }
}