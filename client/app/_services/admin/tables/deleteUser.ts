"use server"

import { createClient } from "@supabase/supabase-js"

// App imports
import processErrorToCrossSideSafe from "@lib/processErrorToCrossSideSafe"
import { Tables } from "@constants/base/database-types"
import logAdminAction from "@services/admin/shared/logAdminAction"

export default async function deleteUser(user: Tables<'users'>) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  const { data, error } = await supabase
    .auth
    .admin
    .deleteUser(user.id)
    .then(async ({data, error}) => {
      if (error || !data) {
        return {data, error}
      }

      await logAdminAction({
        action: "delete user",
        details: JSON.stringify(user)
      })

      return {data, error}
    })
  return { data, error: processErrorToCrossSideSafe(error) }
}