import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getAdminLogListCsv() {
  const supabase = getBrowserClient()

  const { data, error } = await supabase
    .from('admin_logs')
    .select('*, users(*)')
    .order('created_at', { ascending: true })
    .csv()

  return { data, error }
}