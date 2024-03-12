'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

type UpdateCartItemQuantityParams = {
  cartItemId: string
  quantity: number
}

export default async function updateCartItemQuantity({ cartItemId, quantity }: UpdateCartItemQuantityParams) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('cart')
    .update({ quantity: quantity })
    .eq('id', cartItemId)
    .select()
    .single()

  return { data, error: processErrorToCrossSideSafe(error) }
}