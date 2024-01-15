'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getOrdersCsv({ status }) {
  const supabase = await getServerClient()
  let response = { data: null, error: null }

  let query = supabase
    .from('orders')
    .select(`*, order_status(*), product_variants(*, products(*))`)
    .order('created_at')


  if (status) {
    response = await query.eq('order_status.label', status).csv()
  } else {
    response = await query.csv()
  }

  return { data: response.data, error: processErrorToCrossSideSafe(response.error) }
}