"use server"

// App imports
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { createClient } from "@supabase/supabase-js"

export default async function deleteUser(userId) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { data, error } = await supabase.auth.admin.deleteUser(userId)

  return { data, error: processErrorToCrossSideSafe(error) }
}