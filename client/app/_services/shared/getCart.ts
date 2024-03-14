import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getCart() {
  const supabase = getBrowserClient();

  const {
    data: { user: authenticatedUser },
  } = await supabase.auth.getUser();

  if (!authenticatedUser) {
    return {data: null, error: null}
  }

  const { data, error } = await supabase
    .from('cart')
    .select('*, product_variants(*, products(*))')
    .eq('user_id', authenticatedUser.id)

  const totalCost = data?.reduce((accumulator, cartItem) => {
    accumulator += (
      cartItem?.product_variants?.discounted_price! 
      * cartItem.quantity
    )
    
    return accumulator
  }, 0)

  return { data, error, totalCost }
}
