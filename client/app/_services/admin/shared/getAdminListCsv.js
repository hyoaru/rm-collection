"use server"

import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function getAdminListCsv() {
  const supabase = await getServerClient()
  const { data, error } = await supabase
    .from('users')
    .select()
    .neq('role', 'user')
    .csv()

  return { data, error: processErrorToCrossSideSafe(error) }
}