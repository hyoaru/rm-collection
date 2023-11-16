import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getAdminList() {
  const supabase = getBrowserClient()
  let { data, error } = await supabase.from('users').select('*').neq('role', 'user')
  return { data, error}
}