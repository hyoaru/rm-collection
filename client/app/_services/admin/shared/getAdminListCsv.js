"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function getAdminListCsv() {
  const supabase = getServerClient()
  const { data, error } = await supabase
    .from('users')
    .select()
    .neq('role', 'user')
    .csv()

  return { data, error }
}