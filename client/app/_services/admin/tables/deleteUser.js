"use server"

// App imports
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteUser(userId) {
  const supabase = getServerClient()
  const { data, error } = await supabase.auth.admin.deleteUser(userId)

  return { data, error }
}