'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function deleteCartItem({ itemId }) {
  const supabase = await getServerClient()

  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', itemId)

  return { error: processErrorToCrossSideSafe(error) }
}