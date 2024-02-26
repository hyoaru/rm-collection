import { getBrowserClient } from "@services/supabase/getBrowserClient";

export default async function getAllOrderStatus() {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from('order_status')
    .select('*')
    .order('created_at', { ascending: true })

  return { data, error }
}