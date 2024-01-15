"use server"

import { getServerClient } from "@services/supabase/getServerClient"
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"

export default async function setOrderStatusById(orderId, statusId) {
  const supabase = await getServerClient()

  const { data, error } = await supabase
    .from('orders')
    .update({ status_id: statusId })
    .eq('id', orderId)
    .select()

  return { data, error: processErrorToCrossSideSafe(error) }
}