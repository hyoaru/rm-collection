'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function deleteCartItem(cartItemId: string) {
  const supabase = getServerClient()

  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId)

  return { error: processErrorToCrossSideSafe(error) }
}