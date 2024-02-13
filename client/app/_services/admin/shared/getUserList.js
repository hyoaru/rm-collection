'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getUserList() {
  const supabase = await getServerClient()
  let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'user')

  return { data, error: processErrorToCrossSideSafe(error) }
}