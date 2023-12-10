import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function deleteCartItem({ itemId }) {
  const supabase = getBrowserClient()

  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', itemId)

  return { error }
}