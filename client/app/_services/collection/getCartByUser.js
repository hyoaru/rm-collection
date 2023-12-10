import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getCartByUser({ userId }) {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from('cart')
    .select(`*, product_variants(*, products(*))`)
    .eq('user_id', userId)

  return { data, error }
}