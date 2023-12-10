import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function updateCartItemQuantity({ userId, productVariantId, quantity }) {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from('cart')
    .update({ quantity: quantity })
    .eq('user_id', userId)
    .eq('product_variant_id', productVariantId)
    .select()

  return { data, error }
}