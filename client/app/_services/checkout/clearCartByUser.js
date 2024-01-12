'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function clearCartByUser({ userId }) {
  const supabase = await getServerClient()

  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', userId)

  return { error: processErrorToCrossSideSafe(error) }
}