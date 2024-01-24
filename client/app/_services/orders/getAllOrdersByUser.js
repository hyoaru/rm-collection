'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe";
import { getServerClient } from "@services/supabase/getServerClient";

export default async function getAllOrdersByUser(userId) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`*, product_variants(*, products(*)), order_status(*), users(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .then(({ data: orders, error }) => {
      orders?.map((order) => {
        order.product_variants = (
          !order?.product_variants?.products
            ? { products: { name: "Deleted product" } }
            : order.product_variants
        )
      })

      return { data: orders, error }
    })

  return { data, error: processErrorToCrossSideSafe(error) }
}