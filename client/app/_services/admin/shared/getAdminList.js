'use server'

import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getAdminList() {
  const supabase = await getServerClient()
  let { data, error } = await supabase
    .from('users')
    .select('*')
    .neq('role', 'user')

  return { data, error: processErrorToCrossSideSafe(error) }
}