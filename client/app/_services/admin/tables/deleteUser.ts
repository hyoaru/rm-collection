"use server"

import { createClient } from "@supabase/supabase-js"

// App imports
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { Tables } from "@constants/base/database-types"

export default async function deleteUser(user: Tables<'users'>) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { data, error } = await supabase.auth.admin.deleteUser(user.id)
  return { data, error: processErrorToCrossSideSafe(error) }
}