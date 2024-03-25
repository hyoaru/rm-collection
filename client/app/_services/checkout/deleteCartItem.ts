"use server"

import { getServerClient } from "@services/supabase/getServerClient";
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";

export default async function deleteCartItem(cartItemId: string) {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId)

  return { data, error: processErrorToCrossSideSafe(error) }
}