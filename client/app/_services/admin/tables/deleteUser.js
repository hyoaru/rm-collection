"use server"

// App imports
import processErrorToCrossSideSafe from "@/app/_lib/processErrorToCrossSideSafe"
import { getServerClient } from "@services/supabase/getServerClient"

export default async function deleteUser(userId) {
  const supabase = await getServerClient()
  const { data, error } = await supabase.auth.admin.deleteUser(userId)

  return { data, error: processErrorToCrossSideSafe(error) }
}