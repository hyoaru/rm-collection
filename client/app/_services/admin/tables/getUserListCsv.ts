"use server"

import { getServerClient } from "@services/supabase/getServerClient"

export default async function getUserListCsv() {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'user')
    .csv()

  return { data, error }
}