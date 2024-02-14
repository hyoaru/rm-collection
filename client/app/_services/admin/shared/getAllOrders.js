'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getAllOrders() {
  const supabase = await getServerClient()
  let { data, error } = await supabase
    .from('orders')
    .select(`*, users(*), order_status(*), product_variants(*, products(*)), orders_shipping(*)`)

  return { data, error: processErrorToCrossSideSafe(error) }
}