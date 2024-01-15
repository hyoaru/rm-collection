'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getAllOrderStatus() {
  const supabase = await getServerClient()
  let { data, error } = await supabase
    .from('order_status')
    .select(`*`)
    .order('id')

  return { data, error: processErrorToCrossSideSafe(error) }
}