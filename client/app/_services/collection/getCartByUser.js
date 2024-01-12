'use server'

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function getCartByUser({ userId }) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('cart')
    .select(`*, product_variants(*, products(*))`)
    .eq('user_id', userId)

  const totalCost = data
    ?.map((cartItem) => cartItem.product_variants)
    ?.reduce((accumulator, currentVariant) => accumulator + currentVariant.discounted_price, 0)

  return { data, error: processErrorToCrossSideSafe(error), totalCost }
}