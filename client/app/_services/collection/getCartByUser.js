'use server'

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function getCartByUser({ userId }) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('cart')
    .select(`*, product_variants(*, products(*))`)
    .eq('user_id', userId)

  return { data, error: processErrorToCrossSideSafe(error) }
}