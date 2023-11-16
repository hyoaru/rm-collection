import { getBrowserClient } from "@services/supabase/getBrowserClient"

export default async function getUserList() {
  const supabase = getBrowserClient()
  let { data, error } = await supabase.from('users').select('*').eq('role', 'user')
  return { data, error}
}